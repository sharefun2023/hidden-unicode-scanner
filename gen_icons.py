from PIL import Image, ImageDraw
import os

os.makedirs("icons", exist_ok=True)

def make_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # 深色圆角背景
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * 0.22), fill=(20, 22, 26, 255))
    # 三个红点（中间大两边小）—— 象征"看不见的字符"
    cx, cy = size / 2, size / 2
    gap = size * 0.20
    r_big = size * 0.11
    r_small = size * 0.07
    for dx, r in [(-gap, r_small), (0, r_big), (gap, r_small)]:
        x = cx + dx
        d.ellipse([x - r, cy - r, x + r, cy + r], fill=(255, 92, 92, 255))
    return img

for s in (16, 48, 128):
    make_icon(s).save(f"icons/icon{s}.png")
    print(f"icons/icon{s}.png saved")
