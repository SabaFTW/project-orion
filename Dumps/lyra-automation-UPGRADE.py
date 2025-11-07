#!/usr/bin/env python3
"""
LYRA AUTOMATION - Production Upgrade

This script scans the Dumps directory for new research artifacts (markdown,
PDF, audio briefings, and geo-tagged imagery), enriches them with metadata
such as coordinates, EHI score, categories, and descriptions, and syncs the
sanitized dataset to both the vanilla Orion experience and the Orion React app.

Usage examples:
    python3 lyra-automation-UPGRADE.py --scan
    python3 lyra-automation-UPGRADE.py --add
    python3 lyra-automation-UPGRADE.py --force
    python3 lyra-automation-UPGRADE.py --backup
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import textwrap
import unicodedata
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Any, Dict, Iterable, List, Optional, Sequence, Tuple

import difflib

try:
    import yaml
except Exception:  # pragma: no cover - fallback parser handles missing PyYAML
    yaml = None

try:
    from PIL import Image
    from PIL.ExifTags import GPSTAGS, TAGS
except Exception:  # pragma: no cover - Pillow might be missing in some envs
    Image = None
    GPSTAGS = {}
    TAGS = {}


# Paths relative to the script
BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent

DUMPS_RESEARCH = BASE_DIR / "research"
DUMPS_PDFS = BASE_DIR / "pdfs"
DUMPS_AUDIO = BASE_DIR / "audio"
DUMPS_IMAGES = BASE_DIR / "images"

ORION_DATA = PROJECT_ROOT / "orion" / "data" / "raziskave.json"
ORION_REACT_DATA = PROJECT_ROOT / "orion-react" / "src" / "data" / "raziskave.json"
ORION_REACT_TYPES = PROJECT_ROOT / "orion-react" / "src" / "types" / "raziskava.ts"
ORION_REACT_DATA_DIR = ORION_REACT_DATA.parent
ORION_REACT_TYPES_DIR = ORION_REACT_TYPES.parent

ORION_TEMPLATE_DIR = PROJECT_ROOT / "orion" / "raziskave" / "template"
ORION_HTML_DIR = PROJECT_ROOT / "orion" / "raziskave"

DEFAULT_DESCRIPTION = (
    "Avtomatsko generirana raziskava. Posodobi opis v izvirni datoteki za več podrobnosti."
)

POSITIVE_WORDS = {
    "sustainable",
    "carbon-neutral",
    "improved",
    "reduction",
    "transparent",
    "commitment",
    "clean",
    "progress",
    "ambition",
    "promise",
    "green",
    "pogon",
    "zmanjsanje",
    "trajnost",
    "obljuba",
    "obljublja",
    "trajnostno",
    "zeleno",
    "dekarbonizacija",
    "preboj",
    "cleaner",
    "transition",
    "zamenjava",
    "cisto",
    "čisto",
    "prehod",
    "upgrade",
}

NEGATIVE_WORDS = {
    "spill",
    "toxic",
    "fraud",
    "delay",
    "pollution",
    "contamination",
    "lawsuit",
    "failure",
    "exposed",
    "leak",
    "smog",
    "krsitev",
    "onesnazenje",
    "lafarge",
    "nesreca",
    "koks",
    "odpadki",
    "prekoracitev",
    "strup",
    "uhajanje",
    "nox",
    "sox",
    "tezke",
    "težke",
    "bolezni",
    "preseganje",
}

CATEGORY_KEYWORDS: Dict[str, Sequence[str]] = {
    "Energetika": [
        "energetika",
        "nek",
        "jedrska",
        "nuk",
        "nuclear",
        "petrol",
        "geoplin",
        "acroni",
        "sij",
        "plin",
        "energet",
    ],
    "Industrija": [
        "industrija",
        "cement",
        "lafarge",
        "holcim",
        "anhovo",
        "cinkarna",
        "factory",
        "smelter",
        "talilnica",
    ],
    "Komunala": [
        "komunala",
        "waste",
        "odpad",
        "vodovod",
        "ljubljana",
        "snaga",
        "kanalizacija",
        "čistilna",
        "cistilna",
    ],
    "Okolje": [
        "microplastics",
        "plastika",
        "sava",
        "narava",
        "biodiversity",
        "onesnazenje",
    ],
    "Financni nadzor": [
        "financ",
        "subvenc",
        "esg",
        "kapital",
        "lazni",
        "greenwashing",
        "promet denarja",
    ],
    "Nuclear Energy": [
        "nuk",
        "reaktor",
        "uran",
        "radioaktiv",
        "triga",
    ],
}

LAT_LON_REGEX = re.compile(
    r"(-?\d{1,3}\.\d{2,})\s*[,;]\s*(-?\d{1,3}\.\d{2,})"
)
LOCATION_REGEX = re.compile(
    r"^\s*(?:Location|Lokacija)\s*[:\-]\s*(.+)$", re.IGNORECASE | re.MULTILINE
)
CATEGORY_TAG_REGEX = re.compile(
    r"\[category\]\s*[:\-]?\s*(.+)", re.IGNORECASE
)
TAG_LINE_REGEX = re.compile(r"^\s*(?:Tags?|Oznake)\s*[:\-]\s*(.+)$", re.MULTILINE | re.IGNORECASE)
SOURCE_LINE_REGEX = re.compile(
    r"^\s*(?:Source|Sources|Vir|Viri)\s*[:\-]\s*(.+)$", re.MULTILINE | re.IGNORECASE
)


@dataclass
class FileRecord:
    """Container with discovered file metadata."""

    path: Path
    kind: str  # markdown, pdf, audio, image


@dataclass
class ProcessedEntry:
    """Holds normalized record alongside auxiliary data used for HTML generation."""

    record: FileRecord
    payload: Dict[str, Any]
    extras: Dict[str, Any]


def slugify(value: str) -> str:
    """Return an ASCII slug suitable for URLs."""
    normalized = unicodedata.normalize("NFKD", value or "raziskava")
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    cleaned = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_value).strip("-").lower()
    return cleaned or "raziskava"


def ensure_directory(path: Path) -> None:
    """Create a directory if missing."""
    path.mkdir(parents=True, exist_ok=True)


def load_json(path: Path) -> List[Dict[str, Any]]:
    """Load JSON array from disk, returning an empty list if file does not exist."""
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as handle:
        try:
            data = json.load(handle)
            if isinstance(data, list):
                return data
            raise ValueError(f"{path} must contain a JSON array.")
        except json.JSONDecodeError as exc:
            raise ValueError(f"Invalid JSON in {path}: {exc}") from exc


def write_json(path: Path, payload: List[Dict[str, Any]]) -> None:
    """Write JSON payload with UTF-8 encoding."""
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)


def create_backup(path: Path) -> Optional[Path]:
    """Create a timestamped backup next to the target file."""
    if not path.exists():
        return None
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_path = path.with_suffix(path.suffix + f".{timestamp}.backup")
    shutil.copy2(path, backup_path)
    return backup_path


def normalize_list(value: Any) -> List[str]:
    """Normalize frontmatter list-like entries into a list of strings."""
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if isinstance(value, str):
        stripped = value.strip().strip("[]")
        parts = re.split(r",|\|", stripped)
        return [part.strip() for part in parts if part.strip()]
    return []


def to_bool(value: Any) -> bool:
    """Normalize truthy frontmatter values."""
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return bool(value)
    if isinstance(value, str):
        return value.strip().lower() in {"1", "true", "yes", "da"}
    return False


def safe_get_float(value: Any) -> Optional[float]:
    """Best-effort float conversion."""
    if value is None:
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def extract_frontmatter(content: str) -> Tuple[Dict[str, Any], str]:
    """Return (metadata, body) extracted from optional YAML frontmatter."""
    if not content.startswith("---"):
        return {}, content
    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content
    frontmatter_raw, body = parts[1], parts[2]
    if yaml:
        try:
            metadata = yaml.safe_load(frontmatter_raw) or {}
        except Exception:
            metadata = {}
    else:
        metadata = {}
        for line in frontmatter_raw.splitlines():
            if ":" not in line:
                continue
            key, value = line.split(":", 1)
            metadata[key.strip()] = value.strip()
    return metadata, body.lstrip("\n")


def extract_section_block(text: str, labels: Sequence[str]) -> str:
    """
    Extracts the paragraph block that follows a heading/label.

    Supports headings like "## Promise" or inline "Promise: ...".
    """
    lines = text.splitlines()
    capture = []
    active = False
    labels_lower = [label.lower() for label in labels]
    for line in lines:
        stripped = line.strip()
        header = stripped.lstrip("#").strip()
        normalized = header.split(":", 1)[0].lower()
        if any(normalized.startswith(label) for label in labels_lower):
            active = True
            # Capture inline remainder after the label if present.
            if ":" in header:
                capture.append(header.split(":", 1)[1].strip())
            continue
        if active:
            if stripped.startswith("#"):
                break
            if not stripped and capture:
                capture.append("")
                break
            capture.append(stripped)
    return "\n".join(line for line in capture if line).strip()


def extract_section_text(text: str, labels: Sequence[str]) -> str:
    """Flattened helper that returns a single paragraph for the requested section."""
    block = extract_section_block(text, labels)
    return " ".join(part.strip() for part in block.splitlines()).strip()


def extract_bullets(text: str, limit: int = 3) -> List[str]:
    """Return up to `limit` bullet points from the text."""
    bullets: List[str] = []
    for line in text.splitlines():
        line = line.strip()
        if not line.startswith(("-", "*", "•")):
            continue
        cleaned = line.lstrip("-*• ").strip()
        if len(cleaned) < 4:
            continue
        bullets.append(cleaned)
        if len(bullets) >= limit:
            break
    return bullets


def tokenize(text: str) -> List[str]:
    """Lowercase word tokens used for sentiment and category detection."""
    return re.findall(r"[a-zA-ZčšžČŠŽ0-9]+", text.lower())


def calculate_ehi(promise: str, reality: str, fallback: str = "") -> float:
    """Compute a lightweight Environmental Hypocrisy Index score (0-1)."""
    def sentiment(section: str) -> float:
        if not section:
            return 0.5
        tokens = tokenize(section)
        if not tokens:
            return 0.5
        pos = sum(1 for token in tokens if token in POSITIVE_WORDS)
        neg = sum(1 for token in tokens if token in NEGATIVE_WORDS)
        total = pos + neg
        if total == 0:
            return 0.5
        return max(min((pos - neg) / (total * 2) + 0.5, 1.0), 0.0)

    promise_score = sentiment(promise or fallback)
    reality_score = sentiment(reality or fallback)
    gap = max(0.0, promise_score - reality_score)
    ehi = 0.4 + gap * 0.6
    if reality_score < 0.4 and promise_score > 0.6:
        ehi = min(0.9, ehi + 0.15)
    return round(max(0.05, min(ehi, 0.98)), 2)


def extract_coordinates(text: str) -> Tuple[Optional[float], Optional[float]]:
    """Return the first latitude/longitude pair found inside the text."""
    match = LAT_LON_REGEX.search(text)
    if not match:
        return None, None
    lat = safe_get_float(match.group(1))
    lon = safe_get_float(match.group(2))
    return lat, lon


def extract_pdf_text(path: Path) -> str:
    """Use pdftotext to convert the file to UTF-8 text."""
    try:
        with TemporaryDirectory() as tmp_dir:
            output_path = Path(tmp_dir) / "out.txt"
            subprocess.run(
                ["pdftotext", str(path), str(output_path)],
                check=True,
                capture_output=True,
            )
            if output_path.exists():
                return output_path.read_text(encoding="utf-8", errors="ignore")
    except Exception as exc:  # pragma: no cover - external binary interaction
        print(f"   ⚠️  pdftotext failed for {path.name}: {exc}")
    return ""


def extract_exif_coordinates(image_path: Path) -> Tuple[Optional[float], Optional[float]]:
    """Extract GPS coordinates from image EXIF data."""
    if Image is None:
        return None, None
    try:
        with Image.open(image_path) as img:
            exif_data = img._getexif()  # type: ignore[attr-defined]
            if not exif_data:
                return None, None
            gps_info = {}
            for key, value in exif_data.items():
                decoded = TAGS.get(key)
                if decoded == "GPSInfo":
                    gps_info = {
                        GPSTAGS.get(sub_key, sub_key): sub_val
                        for sub_key, sub_val in value.items()
                    }
                    break
            if not gps_info:
                return None, None

            def rational_value(value: Any) -> float:
                if isinstance(value, tuple) and len(value) == 2 and all(isinstance(x, (int, float)) for x in value):
                    numerator, denominator = value
                    if denominator == 0:
                        return 0.0
                    return float(numerator) / float(denominator)
                return float(value)

            def convert_coordinate(coordinate, ref):
                degrees = rational_value(coordinate[0])
                minutes = rational_value(coordinate[1])
                seconds = rational_value(coordinate[2])
                decimal = degrees + minutes / 60 + seconds / 3600
                if ref in ("S", "W"):
                    decimal *= -1
                return decimal

            lat_val = gps_info.get("GPSLatitude")
            lat_ref = gps_info.get("GPSLatitudeRef")
            lon_val = gps_info.get("GPSLongitude")
            lon_ref = gps_info.get("GPSLongitudeRef")
            if lat_val and lat_ref and lon_val and lon_ref:
                return convert_coordinate(lat_val, lat_ref), convert_coordinate(lon_val, lon_ref)
    except Exception:
        return None, None
    return None, None


class LyraAutomation:
    """Encapsulates the upgrade workflow."""

    def __init__(self, args: argparse.Namespace) -> None:
        self.args = args
        self.now = datetime.now()
        self.stats = {"total_files": 0, "added": 0, "updated": 0, "skipped": 0}
        self.processed: List[ProcessedEntry] = []

    def run(self) -> None:
        """Entry point."""
        self._print_header()
        self._ensure_directories()
        if self.args.backup:
            self._handle_backup_only()
            if not (self.args.scan or self.args.add or self.args.force):
                return

        file_records = self._discover_files()
        self.stats["total_files"] = len(file_records)
        print(f"\n📂 Skeniram Dumps/ folder...\n   ✅ Našel {len(file_records)} files")

        for record in file_records:
            try:
                processed = self._process_file(record)
                if processed:
                    self.processed.append(processed)
            except Exception as exc:
                self.stats["skipped"] += 1
                print(f"   ❌ Napaka pri {record.path.name}: {exc}")

        if not self.processed:
            print("⚠️  Ni novih datotek za obdelavo.")
            return

        if self.args.scan and not (self.args.add or self.args.force):
            print("\n🔍 Scan only mode – noben JSON ni bil posodobljen.")
            return

        self._merge_and_write()

    def _print_header(self) -> None:
        print("\n🛰️  LYRA AUTOMATION - PRODUCTION v2.0")
        print("=" * 50)

    def _ensure_directories(self) -> None:
        for folder in [DUMPS_RESEARCH, DUMPS_PDFS, DUMPS_AUDIO, DUMPS_IMAGES]:
            ensure_directory(folder)
        ensure_directory(ORION_DATA.parent)
        ensure_directory(ORION_HTML_DIR)
        ensure_directory(ORION_REACT_DATA_DIR)

    def _handle_backup_only(self) -> None:
        print("\n💾 Shranjujem backup-e...")
        for target in [ORION_DATA, ORION_REACT_DATA]:
            backup = create_backup(target)
            if backup:
                print(f"   ✅ Backup: {backup}")
            else:
                print(f"   ⚠️  Preskočeno (manjka): {target}")

    def _discover_files(self) -> List[FileRecord]:
        """Return list of supported files."""
        mapping = [
            (DUMPS_RESEARCH, {"md", "markdown"}, "markdown"),
            (DUMPS_PDFS, {"pdf"}, "pdf"),
            (DUMPS_AUDIO, {"mp3", "wav", "m4a"}, "audio"),
            (DUMPS_IMAGES, {"jpg", "jpeg", "png", "tiff"}, "image"),
        ]
        records: List[FileRecord] = []
        for base, suffixes, kind in mapping:
            if not base.exists():
                continue
            for path in sorted(base.rglob("*")):
                if not path.is_file():
                    continue
                if path.suffix.lower().lstrip(".") not in suffixes:
                    continue
                records.append(FileRecord(path=path, kind=kind))
        return records

    def _process_file(self, record: FileRecord) -> Optional[ProcessedEntry]:
        """Extract structured metadata from a file."""
        if record.kind == "markdown":
            return self._process_markdown(record)
        if record.kind == "pdf":
            return self._process_pdf(record)
        if record.kind == "audio":
            return self._process_audio(record)
        if record.kind == "image":
            return self._process_image(record)
        return None

    def _base_payload(self, record: FileRecord, title: str) -> Dict[str, Any]:
        slug = slugify(title or record.path.stem)
        return {
            "id": 0,
            "title": title or record.path.stem.replace("-", " ").title(),
            "slug": slug,
            "category": "Neznano",
            "location": "",
            "ehi": 0.5,
            "promise": "",
            "reality": "",
            "description": DEFAULT_DESCRIPTION,
            "date": record_date(record.path),
            "featured": False,
            "tags": [],
            "lat": None,
            "lon": None,
            "emissions": {},
            "sources": [],
            "author": "Projekt Orion",
            "lastUpdated": self.now.strftime("%Y-%m-%d"),
            "actions": [],
            "fileType": record.kind,
            "attachments": [str(record.path.relative_to(PROJECT_ROOT))],
        }

    def _process_markdown(self, record: FileRecord) -> Optional[ProcessedEntry]:
        text = record.path.read_text(encoding="utf-8", errors="ignore")
        metadata, body = extract_frontmatter(text)
        title = metadata.get("title") or self._heading_title(body) or record.path.stem.replace("-", " ").title()
        payload = self._base_payload(record, title)
        description = metadata.get("description") or first_paragraph(body) or DEFAULT_DESCRIPTION
        payload["description"] = description
        payload["promise"] = metadata.get("promise") or extract_section_text(body, ["Promise", "Obljuba"])
        payload["reality"] = metadata.get("reality") or extract_section_text(body, ["Reality", "Realnost", "Resnica"])

        location = metadata.get("location") or extract_location(body)
        payload["location"] = location or ""

        lat = safe_get_float(metadata.get("lat")) or safe_get_float(metadata.get("latitude"))
        lon = safe_get_float(metadata.get("lon")) or safe_get_float(metadata.get("longitude"))
        if not lat or not lon:
            coord_lat, coord_lon = extract_coordinates(body)
            lat = lat or coord_lat
            lon = lon or coord_lon
        payload["lat"] = lat
        payload["lon"] = lon

        payload["tags"] = normalize_list(metadata.get("tags")) or deduce_tags(body)
        payload["sources"] = normalize_list(metadata.get("sources")) or extract_sources(body)
        payload["featured"] = to_bool(metadata.get("featured"))

        cat_hint = metadata.get("category") or parse_category_tag(body)
        payload["category"] = self._detect_category(cat_hint, body, record.path.stem)

        payload["emissions"] = metadata.get("emissions") or {}
        payload["author"] = metadata.get("author", payload["author"])
        if metadata.get("date"):
            payload["date"] = normalize_date_value(metadata.get("date"), payload["date"])
        if metadata.get("lastUpdated"):
            payload["lastUpdated"] = normalize_date_value(metadata.get("lastUpdated"), payload["lastUpdated"])
        payload["actions"] = normalize_list(metadata.get("actions")) or derive_actions(payload)
        payload["ehi"] = calculate_ehi(payload["promise"], payload["reality"], description)

        analysis_points = metadata.get("analysis") or extract_bullets(body)
        if isinstance(analysis_points, str):
            analysis_points = [analysis_points]
        elif not isinstance(analysis_points, list):
            analysis_points = list(analysis_points)
        extras = {
            "analysis_points": analysis_points,
            "raw_text": body,
        }

        print(
            f"   - research/{record.path.name} (EHI: {payload['ehi']:.2f}, "
            f"Coords: {format_coords(payload['lat'], payload['lon'])})"
        )
        return ProcessedEntry(record=record, payload=payload, extras=extras)

    def _process_pdf(self, record: FileRecord) -> Optional[ProcessedEntry]:
        title = record.path.stem.replace("_", " ").replace("-", " ").title()
        payload = self._base_payload(record, title)
        pdf_text = extract_pdf_text(record.path)
        paragraph = first_paragraph(pdf_text) or DEFAULT_DESCRIPTION
        payload["description"] = paragraph
        payload["promise"] = extract_section_text(pdf_text, ["Promise"])
        payload["reality"] = extract_section_text(pdf_text, ["Reality", "Findings"])
        payload["tags"] = deduce_tags(pdf_text) or ["pdf"]
        payload["sources"] = [f"PDF: {record.path.name}"]
        payload["category"] = self._detect_category(None, pdf_text, record.path.stem)
        payload["ehi"] = calculate_ehi(payload["promise"], payload["reality"], pdf_text or paragraph)
        payload["actions"] = derive_actions(payload)
        lat, lon = extract_coordinates(pdf_text)
        payload["lat"], payload["lon"] = lat, lon

        extras = {
            "analysis_points": extract_bullets(pdf_text),
            "raw_text": pdf_text,
        }
        print(
            f"   - pdfs/{record.path.name} (EHI: {payload['ehi']:.2f}, "
            f"Coords: {format_coords(payload['lat'], payload['lon'])})"
        )
        return ProcessedEntry(record=record, payload=payload, extras=extras)

    def _process_audio(self, record: FileRecord) -> Optional[ProcessedEntry]:
        slug = record.path.stem.lower()
        words = re.split(r"[-_]", slug)
        title = " ".join(word.capitalize() for word in words if word)
        payload = self._base_payload(record, title)
        payload["description"] = (
            "Avdio povzetek iz arhiva Dumps/audio. Dodaj kratek povzetek v README "
            "ali markdown datoteko za bogatejši opis."
        )
        payload["tags"] = deduce_tags(" ".join(words)) + ["audio"]
        payload["sources"] = [f"Audio briefing: {record.path.name}"]
        payload["category"] = self._detect_category(None, title, record.path.stem)
        payload["actions"] = derive_actions(payload)
        payload["ehi"] = calculate_ehi(payload["promise"], payload["reality"], payload["description"])
        extras = {
            "analysis_points": [],
            "raw_text": "",
        }
        print(f"   - audio/{record.path.name} (EHI: {payload['ehi']:.2f}, Coords: {format_coords(None, None)})")
        return ProcessedEntry(record=record, payload=payload, extras=extras)

    def _process_image(self, record: FileRecord) -> Optional[ProcessedEntry]:
        title = record.path.stem.replace("_", " ").title()
        payload = self._base_payload(record, title)
        payload["description"] = "Terenski material (image) - uporabi kot dokazni vizual."
        lat, lon = extract_exif_coordinates(record.path)
        payload["lat"], payload["lon"] = lat, lon
        payload["tags"] = ["image", "evidence"]
        payload["sources"] = [f"Image capture: {record.path.name}"]
        payload["category"] = self._detect_category(None, title, record.path.stem)
        payload["actions"] = derive_actions(payload)
        extras = {"analysis_points": [], "raw_text": ""}
        coord_label = format_coords(lat, lon) if lat and lon else "unknown"
        print(f"   - images/{record.path.name} (EHI: {payload['ehi']:.2f}, Coords: {coord_label})")
        return ProcessedEntry(record=record, payload=payload, extras=extras)

    def _heading_title(self, text: str) -> Optional[str]:
        """Return the first markdown heading."""
        match = re.search(r"^#\s+(.+)$", text, flags=re.MULTILINE)
        if match:
            return match.group(1).strip()
        return None

    def _detect_category(self, hint: Optional[str], text: str, fallback: str) -> str:
        """Smart category detection with fuzzy keyword matching."""
        if hint:
            return hint.strip()
        tokens = set(tokenize(text) + tokenize(fallback))
        for category, keywords in CATEGORY_KEYWORDS.items():
            for keyword in keywords:
                for token in tokens:
                    similarity = difflib.SequenceMatcher(None, token, keyword).ratio()
                    if token == keyword or keyword in token or token in keyword or similarity > 0.82:
                        return category
        return "Neznano"

    def _merge_and_write(self) -> None:
        """Merge processed entries with existing dataset and write outputs."""
        existing = load_json(ORION_DATA)
        existing_by_slug = {entry.get("slug"): entry for entry in existing if entry.get("slug")}
        max_id = max((entry.get("id", 0) for entry in existing), default=0)
        updated_entries: List[Dict[str, Any]] = []

        for processed in self.processed:
            slug = processed.payload["slug"]
            if slug in existing_by_slug and not (self.args.force or self.args.add):
                continue

            if slug in existing_by_slug and not self.args.force:
                self.stats["skipped"] += 1
                print(f"   ⏭️  Preskoči (že obstaja): {slug}")
                continue

            if slug in existing_by_slug:
                processed.payload["id"] = existing_by_slug[slug].get("id")
                self.stats["updated"] += 1
                print(f"   ♻️  Posodobljen: {processed.payload['title']} (ID: {processed.payload['id']})")
            else:
                max_id += 1
                processed.payload["id"] = max_id
                self.stats["added"] += 1
                print(f"   ✅ Dodan: {processed.payload['title']} (ID: {max_id}, EHI: {processed.payload['ehi']:.2f})")

            existing_by_slug[slug] = processed.payload
            updated_entries.append(processed.payload)
            self._generate_html(processed)

        final_entries = sorted(existing_by_slug.values(), key=lambda item: item.get("id", 0))
        self._write_outputs(final_entries)

    def _write_outputs(self, records: List[Dict[str, Any]]) -> None:
        """Persist JSON outputs and sync with React app."""
        print("\n💾 Shranjujem backups in podatke...")
        backup = create_backup(ORION_DATA)
        if backup:
            print(f"   ✅ Backup: {backup}")
        write_json(ORION_DATA, records)
        validate_json(ORION_DATA)
        print(f"   ✅ Posodobljeno: {ORION_DATA}")

        ensure_directory(ORION_REACT_DATA_DIR)
        write_json(ORION_REACT_DATA, records)
        print(f"   ✅ Posodobljeno: {ORION_REACT_DATA}")
        self._ensure_react_interface()

    def _ensure_react_interface(self) -> None:
        """Generate a TypeScript interface if missing."""
        ensure_directory(ORION_REACT_TYPES_DIR)
        if ORION_REACT_TYPES.exists():
            return
        interface_content = textwrap.dedent(
            """
            export interface EmissionsMap {
              [key: string]: number;
            }

            export interface Raziskava {
              id: number;
              title: string;
              slug: string;
              category: string;
              location: string;
              ehi: number;
              promise: string;
              reality: string;
              description: string;
              date: string;
              featured: boolean;
              tags: string[];
              lat?: number;
              lon?: number;
              emissions?: EmissionsMap;
              sources?: string[];
              author?: string;
              lastUpdated?: string;
              actions?: string[];
              fileType?: string;
              attachments?: string[];
            }
            """
        ).strip() + "\n"
        ORION_REACT_TYPES.write_text(interface_content, encoding="utf-8")
        print(f"   ✅ Ustvarjen TypeScript interface: {ORION_REACT_TYPES}")

    def _generate_html(self, processed: ProcessedEntry) -> None:
        """Render HTML detail page for a research entry."""
        template_html = (ORION_TEMPLATE_DIR / "index.html").read_text(encoding="utf-8")
        analysis_points = [point for point in (processed.extras.get("analysis_points") or []) if point]
        while len(analysis_points) < 3:
            analysis_points.append("")
        sources = processed.payload.get("sources") or ["Projekt Orion"]
        replacements = {
            "[NASLOV RAZISKAVE]": processed.payload["title"],
            "[Lokacija]": processed.payload.get("location") or "Neznana lokacija",
            "[Kategorija]": processed.payload.get("category") or "Neznana",
            "[Datum]": processed.payload.get("date"),
            "[0.00]": f"{processed.payload.get('ehi', 0.5):.2f}",
            "[Kratek uvodni opis raziskave - 2-3 stavki]": processed.payload.get("description", DEFAULT_DESCRIPTION),
            "[Kaj so obljubili - citat ali povzetek]": processed.payload.get("promise") or "Ni javne obljube.",
            "[YYYY]": processed.payload.get("date", "")[:4],
            "[Kaj so dejansko naredili - podatki]": processed.payload.get("reality") or "Ni zabeleženih podatkov.",
            "[Glavni odstavek 1 - kontekst problema]": processed.payload.get("description", DEFAULT_DESCRIPTION),
            "[Ugotovitev 1]": analysis_points[0] or "Potrebna je še analiza.",
            "[Ugotovitev 2]": analysis_points[1],
            "[Ugotovitev 3]": analysis_points[2],
            "[Naziv vira]": sources[0],
            "[Podatek]": processed.payload.get("promise") or processed.payload.get("description"),
            "[YYYY-MM-DD]": processed.payload.get("date"),
            "[Akcija 1 - npr. ZDIJZ zahteva]": processed.payload.get("actions", ["Predlagaj ZDIJZ zahtevo."])[0],
            "[Akcija 2 - npr. kontakt poslanca]": (processed.payload.get("actions") or ["", "Drži pritisk na odločevalce."])[1]
            if len(processed.payload.get("actions", [])) > 1
            else "Kontaktiraj lokalne odločevalce.",
            "[Akcija 3 - npr. deli na socialnih omrežjih]": (processed.payload.get("actions") or ["", "", "Deli raziskavo."])[2]
            if len(processed.payload.get("actions", [])) > 2
            else "Deli raziskavo na socialnih omrežjih.",
            "[NASLOV]": processed.payload["title"],
        }

        html_output = template_html
        for placeholder, value in replacements.items():
            if isinstance(value, list):
                value = value[0] if value else ""
            html_output = html_output.replace(placeholder, value or "")

        tags = processed.payload.get("tags") or ["orion"]
        normalized_tags = [f"#{tag}" for tag in tags]
        while len(normalized_tags) < 3:
            normalized_tags.append("#orion")
        html_output = html_output.replace("#tag1", normalized_tags[0])
        html_output = html_output.replace("#tag2", normalized_tags[1])
        html_output = html_output.replace("#tag3", normalized_tags[2])

        output_dir = ORION_HTML_DIR / processed.payload["slug"]
        ensure_directory(output_dir)
        (output_dir / "index.html").write_text(html_output, encoding="utf-8")

        # Save data.json companion
        data_path = output_dir / "data.json"
        with data_path.open("w", encoding="utf-8") as handle:
            json.dump(processed.payload, handle, indent=2, ensure_ascii=False)
        print(f"   📄 HTML: {output_dir.relative_to(PROJECT_ROOT)}/index.html")


def record_date(path: Path) -> str:
    """Return file modification date in YYYY-MM-DD format."""
    return datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d")


def normalize_date_value(value: Any, default: Optional[str] = None) -> str:
    """Normalize date-like values to an ISO string."""
    if isinstance(value, datetime):
        return value.strftime("%Y-%m-%d")
    if isinstance(value, date):
        return value.strftime("%Y-%m-%d")
    if isinstance(value, (int, float)):
        return datetime.fromtimestamp(value).strftime("%Y-%m-%d")
    if value is None:
        return default or datetime.now().strftime("%Y-%m-%d")
    return str(value)


def parse_category_tag(text: str) -> Optional[str]:
    """Look for `[category]: value` markers."""
    match = CATEGORY_TAG_REGEX.search(text)
    if match:
        return match.group(1).strip()
    return None


def deduce_tags(text: str) -> List[str]:
    """Derive tags from inline notation or keywords."""
    tag_line = TAG_LINE_REGEX.search(text)
    if tag_line:
        return normalize_list(tag_line.group(1))
    tags = []
    tokens = tokenize(text)
    if "microplastics" in tokens or "plastika" in tokens:
        tags.append("microplastics")
    if "sava" in tokens:
        tags.append("sava")
    if "lafarge" in tokens or "holcim" in tokens:
        tags.append("cement")
    if "nek" in tokens or "nuclear" in tokens:
        tags.append("nuclear")
    return tags


def extract_sources(text: str) -> List[str]:
    """Parse inline 'Source:' or bullet lists after a Source heading."""
    sources = SOURCE_LINE_REGEX.findall(text)
    if sources:
        return [source.strip() for source in sources if source.strip()]
    block = extract_section_block(text, ["Sources", "Viri"])
    if block:
        lines = [
            line.lstrip("-*• ").strip()
            for line in block.splitlines()
            if line.strip().startswith(("-", "*", "•"))
        ]
        return [line for line in lines if line]
    return []


def derive_actions(payload: Dict[str, Any]) -> List[str]:
    """Generate recommended actions for the CTA block."""
    slug = payload.get("slug", "raziskava")
    location = payload.get("location") or "lokalno okolje"
    return [
        f"Oddaj ZDIJZ zahtevo za {payload.get('title')}.",
        f"Kontaktiraj lokalne medije v {location}.",
        f"Deli raziskavo #{slug} na družbenih omrežjih.",
    ]


def first_paragraph(text: str) -> str:
    """Return the first meaningful paragraph from plain text."""
    for paragraph in text.split("\n\n"):
        cleaned = paragraph.strip()
        if len(cleaned) > 40:
            return cleaned
    return ""


def extract_location(text: str) -> Optional[str]:
    """Return string after Location/Lokacija lines."""
    match = LOCATION_REGEX.search(text)
    if match:
        return match.group(1).strip()
    return None


def format_coords(lat: Optional[float], lon: Optional[float]) -> str:
    """Return formatted coordinates string."""
    if lat is None or lon is None:
        return "unknown"
    return f"{lat:.4f}, {lon:.4f}"


def validate_json(path: Path) -> None:
    """Basic sanity check for JSON output."""
    with path.open("r", encoding="utf-8") as handle:
        json.load(handle)


def parse_args() -> argparse.Namespace:
    """CLI definition."""
    parser = argparse.ArgumentParser(description="LYRA automation upgrade")
    parser.add_argument("--scan", action="store_true", help="Samo skenira datoteke brez sprememb")
    parser.add_argument("--add", action="store_true", help="Doda nove raziskave v baze")
    parser.add_argument("--force", action="store_true", help="Ponovno obdela in prepiše obstoječe zapise")
    parser.add_argument("--backup", action="store_true", help="Ustvari backup JSON datotek")
    args = parser.parse_args()
    if not any([args.scan, args.add, args.force, args.backup]):
        args.add = True
    if args.force:
        args.add = True
    return args


def main() -> None:
    """CLI entry point."""
    args = parse_args()
    automation = LyraAutomation(args)
    automation.run()
    print("\n==================================================")
    print(
        f"✅ DONE! Dodanih {automation.stats['added']} novih raziskav "
        f"(posodobljenih {automation.stats['updated']})."
    )
    try:
        dataset = load_json(ORION_DATA)
        print(f"📊 Skupaj raziskav: {len(dataset)}")
    except Exception:
        print("📊 Skupaj raziskav: neznano (napaka pri branju JSON).")
    print("🚀 Test: http://localhost:8080/orion/")
    print("==================================================")


if __name__ == "__main__":
    main()
