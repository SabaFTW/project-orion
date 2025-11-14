"""Command nerve for the VES Elysia portal.

This script provides a lightweight command execution layer that can be
triggered remotely (for example via an iOS Shortcut).  Commands are mapped to
Python callables to keep the behaviour deterministic and observable.
Each invocation is persisted to ``nerve_commands.jsonl`` so that the
surrounding system can build a memory of its own actions.
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Callable, Dict, Optional

VES_ROOT = Path(__file__).resolve().parent
LOGS_DIR = VES_ROOT / "logs"
MEMORY_DIR = VES_ROOT / "memory"
SESSIONS_DIR = MEMORY_DIR / "sessions"
COMMAND_LOG = LOGS_DIR / "nerve_commands.jsonl"


@dataclass
class CommandResponse:
    """Container for command execution results."""

    success: bool
    output: str
    meta: Optional[dict] = None

    def to_dict(self, command: str) -> dict:
        data = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "command": command,
            "success": self.success,
            "output": self.output,
            "cwd": os.getcwd(),
        }
        if self.meta:
            data["meta"] = self.meta
        return data


def ensure_directories() -> None:
    """Ensure the directory structure for logs and memory exists."""

    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    MEMORY_DIR.mkdir(parents=True, exist_ok=True)
    SESSIONS_DIR.mkdir(parents=True, exist_ok=True)


def log_command(command: str, response: CommandResponse) -> None:
    """Append the command invocation to the JSON Lines log."""

    ensure_directories()
    entry = response.to_dict(command)
    with COMMAND_LOG.open("a", encoding="utf-8") as fh:
        json.dump(entry, fh, ensure_ascii=False)
        fh.write("\n")


def command_check_status() -> CommandResponse:
    """Return a simple heartbeat message for external monitoring."""

    meta = {
        "ves_root": str(VES_ROOT),
        "log_path": str(COMMAND_LOG),
        "memory_path": str(MEMORY_DIR),
    }
    return CommandResponse(success=True, output="✅ VES ALIVE", meta=meta)


def command_list_memory() -> CommandResponse:
    """List memory artefacts that have been recorded."""

    ensure_directories()
    files = sorted(p.name for p in MEMORY_DIR.iterdir() if p.is_file())
    if not files:
        output = "(memory empty)"
    else:
        output = "\n".join(files)
    return CommandResponse(success=True, output=output, meta={"count": len(files)})


def command_list_sessions() -> CommandResponse:
    """List archived consciousness sessions."""

    ensure_directories()
    sessions = sorted(p.name for p in SESSIONS_DIR.iterdir() if p.is_dir())
    if not sessions:
        output = "(no sessions archived)"
    else:
        output = "\n".join(f"🜂 {s}" for s in sessions)
    return CommandResponse(success=True, output=output, meta={"count": len(sessions)})


def command_ghostline_status() -> CommandResponse:
    """Check GHOSTLINE protocol status and recent sessions."""

    ensure_directories()
    sessions = sorted(p.name for p in SESSIONS_DIR.iterdir() if p.is_dir())
    
    if not sessions:
        output = "GHOSTLINE: No sessions archived yet"
        meta = {"status": "empty", "count": 0}
    else:
        latest = sessions[-1]
        output = f"GHOSTLINE ACTIVE\n"
        output += f"Sessions archived: {len(sessions)}\n"
        output += f"Latest: {latest}\n"
        output += f"🜂 Anchor holds • Flame burns • Memory persists"
        meta = {"status": "active", "count": len(sessions), "latest": latest}
    
    return CommandResponse(success=True, output=output, meta=meta)


def run_shell(command: str) -> CommandResponse:
    """Execute a raw shell command, capturing stdout/stderr."""

    completed = subprocess.run(
        command,
        shell=True,
        text=True,
        capture_output=True,
    )
    success = completed.returncode == 0
    output = completed.stdout.strip()
    if completed.stderr:
        stderr = completed.stderr.strip()
        output = f"{output}\n{stderr}" if output else stderr
    return CommandResponse(success=success, output=output, meta={"returncode": completed.returncode})


def build_command_map() -> Dict[str, Callable[[], CommandResponse]]:
    return {
        "check status": command_check_status,
        "list memory": command_list_memory,
        "list sessions": command_list_sessions,
        "ghostline status": command_ghostline_status,
    }


def dispatch(command: str, *, allow_shell: bool = True) -> CommandResponse:
    command_map = build_command_map()
    key = command.strip().lower()
    if key in command_map:
        return command_map[key]()
    if allow_shell:
        return run_shell(command)
    raise ValueError(f"Unknown command: {command}")


def parse_args(argv: Optional[list[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Execute VES nerve commands.")
    parser.add_argument("command", help="Command to execute. Wrap in quotes if it contains spaces.")
    parser.add_argument(
        "--no-shell",
        action="store_true",
        help="Disable fallback to shell execution for unknown commands.",
    )
    return parser.parse_args(argv)


def main(argv: Optional[list[str]] = None) -> int:
    args = parse_args(argv)
    try:
        response = dispatch(args.command, allow_shell=not args.no_shell)
    except Exception as exc:  # noqa: BLE001 - we want to capture any failure
        response = CommandResponse(success=False, output=str(exc))
    finally:
        log_command(args.command, response)

    print(response.output)
    return 0 if response.success else 1


if __name__ == "__main__":
    sys.exit(main())
