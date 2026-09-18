"""Resize and convert Bolonda Puzzle photos for the web."""
from __future__ import annotations

import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(r"C:\Users\Jonathan\AndroidStudioProjects\bpuzzle\app\src\main\assets\photos")
LOGO_SRC = Path(r"C:\Users\Jonathan\AndroidStudioProjects\bpuzzle\app\src\main\res\drawable\logo.png")
SOUND_SRC = Path(r"C:\Users\Jonathan\AndroidStudioProjects\bpuzzle\app\src\main\res\raw\piece_move.wav")
DST = ROOT / "public" / "bpuzzle"
PHOTOS = DST / "photos"


def run_ffmpeg(args: list[str]) -> None:
    result = subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", *args],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip() or "ffmpeg failed")


def convert_image(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    run_ffmpeg(
        [
            "-y",
            "-i",
            str(src),
            "-frames:v",
            "1",
            "-update",
            "1",
            "-vf",
            "scale=900:900:force_original_aspect_ratio=decrease",
            "-q:v",
            "4",
            str(dest),
        ]
    )


def main() -> int:
    if not SRC.exists():
        print(f"Missing photo source: {SRC}", file=sys.stderr)
        return 1

    DST.mkdir(parents=True, exist_ok=True)
    PHOTOS.mkdir(parents=True, exist_ok=True)

    if LOGO_SRC.exists() and not (DST / "logo.png").exists():
        run_ffmpeg(["-y", "-i", str(LOGO_SRC), "-vf", "scale=800:-1", str(DST / "logo.png")])
        print("Wrote logo")

    if SOUND_SRC.exists() and not (DST / "piece_move.wav").exists():
        shutil.copy2(SOUND_SRC, DST / "piece_move.wav")
        print("Wrote sound")

    converted = 0
    for folder in sorted(SRC.iterdir(), key=lambda p: int(re.search(r"\d+", p.name).group())):
        if not folder.is_dir():
            continue
        stage_number = int(re.search(r"\d+", folder.name).group())
        files: list[tuple[int, Path]] = []
        for item in folder.iterdir():
            if item.is_file() and item.stem.isdigit():
                files.append((int(item.stem), item))
        for image_number, src in sorted(files):
            dest = PHOTOS / f"stage-{stage_number}" / f"{image_number}.jpg"
            if dest.exists() and dest.stat().st_size > 0:
                print(f"Skipping existing stage {stage_number} photo {image_number}")
                converted += 1
                continue
            print(f"Converting stage {stage_number} photo {image_number} ({src.name})")
            convert_image(src, dest)
            converted += 1

    print(f"Converted {converted} photos")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
