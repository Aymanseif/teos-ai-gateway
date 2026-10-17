"""Render a stylised golden Eye of Horus (Wedjat) app icon.

Outputs a 1024x1024 PNG (RGBA) suitable for `tauri icon`.
Drawn at 4x and downscaled (LANCZOS) for smooth anti-aliased edges.
"""

from __future__ import annotations

from PIL import Image, ImageDraw

SIZE = 1024
SS = 4  # supersample factor
W = SIZE * SS

GOLD = (212, 175, 55, 255)
GOLD_HI = (238, 208, 122, 255)
PLATE = (10, 10, 10, 255)

img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
d = ImageDraw.Draw(img)


def sx(v: float) -> float:
    return v * SS


def stroke(pts, width, fill):
    scaled = [(sx(x), sx(y)) for (x, y) in pts]
    d.line(scaled, width=max(1, int(width * SS)), fill=fill, joint="curve")
    r = width * SS / 2.0
    for (x, y) in (pts[0], pts[-1]):
        d.ellipse([sx(x) - r, sx(y) - r, sx(x) + r, sx(y) + r], fill=fill)


def bezier(p0, p1, p2, n=140):
    pts = []
    for i in range(n + 1):
        t = i / n
        x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0]
        y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]
        pts.append((x, y))
    return pts


# --- dark rounded plate with a thin gold rim -------------------------------
d.rounded_rectangle(
    [sx(48), sx(48), sx(SIZE - 48), sx(SIZE - 48)],
    radius=int(190 * SS),
    fill=PLATE,
    outline=GOLD,
    width=int(14 * SS),
)

# --- eyebrow ---------------------------------------------------------------
stroke(bezier((250, 402), (512, 236), (792, 384)), 40, GOLD)

# --- eye outline (almond) --------------------------------------------------
stroke(bezier((238, 556), (512, 392), (788, 540)), 40, GOLD_HI)
stroke(bezier((238, 556), (512, 692), (788, 540)), 40, GOLD_HI)

# --- pupil -----------------------------------------------------------------
pr = 96
d.ellipse(
    [sx(516) - pr * SS, sx(528) - pr * SS, sx(516) + pr * SS, sx(528) + pr * SS],
    fill=GOLD,
)

# --- tear (straight drop under the outer/left corner) ----------------------
stroke([(322, 676), (322, 812)], 38, GOLD_HI)

# --- tail / curl descending from the inner corner and hooking --------------
stroke(bezier((722, 652), (896, 800), (664, 894)), 38, GOLD_HI)
stroke(bezier((664, 894), (596, 928), (612, 852)), 30, GOLD_HI)

img = img.resize((SIZE, SIZE), Image.LANCZOS)
img.save("assets/eye-of-horus-1024.png")
print("wrote assets/eye-of-horus-1024.png", img.size, img.mode)
