# CODEX Status Log — 2025‑11‑07

## Zadnje stanje
- `Dumps/lyra-automation-UPGRADE.py` končano (v2.0). Podpira `--scan`, `--add`, `--force`, `--backup`, avtomatski backup JSON-ov, React sync in HTML generacijo.
- Že obdelani primeri: `holcim-emissions.md`, `nek-upgrade.md`, `sij-greenwashing.md`, `holcim-emissions.pdf`, `microplastics-briefing.mp3`, `sava-dump.jpg`.
- Glavni dataset (`orion/data/raziskave.json`) in React kopija (`orion-react/src/data/raziskave.json`) vsebujeta 9 raziskav. TypeScript interface ustvarjen v `orion-react/src/types/raziskava.ts`.
- HTML strani za nove vnose v `orion/raziskave/<slug>/index.html` + `data.json`.

## Naslednji koraki
1. Za nove raziskave spusti datoteke v `Dumps/research|pdfs|audio|images`.
2. Za predogled: `python3 lyra-automation-UPGRADE.py --scan`.
3. Za objavo: `python3 lyra-automation-UPGRADE.py --add` (ali `--force` za reprocess).
4. Po potrebi prilagodi generirane HTML strani (lokacija: `orion/raziskave/<slug>/index.html`).

## Meta
- Zadnji zagon: 2025‑11‑07 05:06 ( `--force` ).
- Backupi: `orion/data/raziskave.json.20251107-050627.backup` (enako ime v React kopiji).
- Če potrebuješ hitro refresher, preberi ta log pred zagonom Codex-a. 😄
