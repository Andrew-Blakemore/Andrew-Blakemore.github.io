"""Rebuild photography.yml from matching optimized WebP asset pairs."""

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
THUMBNAILS = ROOT / "assets/img/photography/thumbnails"
GALLERY = ROOT / "assets/img/photography/gallery"
YAML_PATH = ROOT / "_data/photography.yml"

CARS = {
    "Batman_Building", "Chevrolet_Camaro", "Chevrolet_Corvette_C7",
    "Chevrolet_Corvette_C8", "Chrysler_200", "Downtown",
    "Driving_Through_the_615", "Garage_Lighting", "Hyundai_Genesis_Coupe",
    "Lexus_GS", "Mustang_at_Night", "Nashville_Car_Meet",
    "Veteran's_Bridge",
}

MISCELLANEOUS = {
    "Appetizer", "Bluegrass_Dog", "Derby", "Dichotomy_Dog",
    "Fish_Out_of_Water", "Forest_Friend", "Gone_in_the_Night",
    "Home_Stretch", "Hot_Blooded", "Lamb_Chop", "Max", "Nucleus",
    "Pillars_of_Light", "Plating", "Seeing_Double", "Shrouded_by_Light",
    "The_Dragon's_Hoard",
}

TITLE_OVERRIDES = {
    "CHTKMY": "CHTKMY",
    "HAND_ON_FIRE": "Hand on Fire",
    "NOCTA_1": "NOCTA, Rose Street Garage, Part 1",
    "NOCTA_2": "NOCTA, Rose Street Garage, Part 2",
    "NOCTA_3": "NOCTA, Rose Street Garage, Part 3",
    "NYC": "NYC",
    "Y2K": "Y2K",
}

FEATURED = {
    "Red_Cap", "The_Dragon's_Hoard", "Mustang_at_Night",
    "Fish_Out_of_Water", "Seeing_Double", "Y2K", "Gone_in_the_Night",
    "Batman_Building", "Derby", "Lamb_Chop", "NYC", "Nucleus", "Downtown",
    "Home_Stretch", "Plating", "CHTKMY", "Pillars_of_Light",
    "Driving_Through_the_615", "HAND_ON_FIRE", "Appetizer",
}


def is_graduation(stem: str) -> bool:
    """Graduation-session filenames begin with CH_, EH_, or MT_."""
    return stem.startswith(("CH_", "EH_", "MT_"))


def category_for(stem: str) -> str:
    if is_graduation(stem):
        return "graduation"
    if stem in CARS:
        return "cars"
    if stem in MISCELLANEOUS:
        return "miscellaneous"
    return "portraits"


def title_for(stem: str) -> str:
    return TITLE_OVERRIDES.get(stem, stem.replace("_", " "))


def yaml_string(value: str) -> str:
    # JSON quoted strings are valid YAML and safely handle apostrophes.
    return json.dumps(value, ensure_ascii=False)


def main() -> None:
    thumbnails = sorted(THUMBNAILS.glob("*.webp"), key=lambda p: p.name.lower())
    thumbnail_names = {path.name for path in thumbnails}
    gallery_names = {path.name for path in GALLERY.glob("*.webp")}

    if thumbnail_names != gallery_names:
        missing_gallery = sorted(thumbnail_names - gallery_names)
        missing_thumbnails = sorted(gallery_names - thumbnail_names)
        raise FileNotFoundError(
            f"Missing gallery images: {missing_gallery}; "
            f"missing thumbnails: {missing_thumbnails}"
        )

    lines = []
    for thumbnail in thumbnails:
        with Image.open(thumbnail) as image:
            width, height = image.size

        stem = thumbnail.stem
        lines.extend([
            f"- thumbnail: {yaml_string('/assets/img/photography/thumbnails/' + thumbnail.name)}",
            f"  gallery: {yaml_string('/assets/img/photography/gallery/' + thumbnail.name)}",
            f"  title: {yaml_string(title_for(stem))}",
            f"  category: {category_for(stem)}",
            f"  featured: {str(stem in FEATURED).lower()}",
            f"  width: {width}",
            f"  height: {height}",
        ])

    YAML_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Updated {YAML_PATH} with {len(thumbnails)} photos.")


if __name__ == "__main__":
    main()
