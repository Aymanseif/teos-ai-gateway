"""Print an ASCII silhouette of an image so the shape can be checked in text."""

from __future__ import annotations

import sys

from PIL import Image

path = sys.argv[1] if len(sys.argv) > 1 else "assets/eye-of-horus-1024.png"
cols = int(sys.argv[2]) if len(sys.argv) > 2 else 64
rows = max(1, cols // 2)

img = Image.open(path).convert("RGBA")
bg = Image.new("RGBA", img.size, (0, 0, 0, 255))
img = Image.alpha_composite(bg, img).convert("L")
img = img.resize((cols, rows), Image.LANCZOS)

ramp = " .:-=+*#%@"
px = img.load()
for y in range(rows):
    line = "".join(ramp[min(9, px[x, y] * 10 // 256)] for x in range(cols))
    print(line)
