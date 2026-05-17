from PIL import Image
import yaml
from pathlib import Path

YAML_PATH = "_data/photography.yml"
ROOT = Path(".")

with open(YAML_PATH, "r") as f:
    photos = yaml.safe_load(f)

for photo in photos:
    src = photo.get("src", "").lstrip("/")
    image_path = ROOT / src

    if image_path.exists():
        with Image.open(image_path) as img:
            width, height = img.size
            photo["width"] = width
            photo["height"] = height
            print(f"{photo['title']}: {width}x{height}")
    else:
        print(f"Missing: {image_path}")

with open(YAML_PATH, "w") as f:
    yaml.dump(photos, f, sort_keys=False, allow_unicode=True)

print("\nUpdated photography.yml successfully.")
