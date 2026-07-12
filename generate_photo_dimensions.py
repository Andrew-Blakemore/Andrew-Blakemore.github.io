"""Rebuild photography.yml from matching optimized WebP asset pairs."""

import json
import colorsys
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

# The featured gallery uses CSS columns, so each group below is a contiguous
# visual column on wide screens. The groups have similar total aspect-ratio
# heights, while their internal image boundaries are intentionally staggered.
# Color and subject matter are also alternated to avoid repetitive clusters.
FEATURED_ORDER = [
    # Column 1: warm red into pale neutrals, then cyan/green.
    "Butterfly",
    "Lost_in_the_Desert",
    "CH_EH_Kirkland_2",
    "Forest_Friend",
    "Cyan_Fever",
    "Veteran's_Bridge",
    "Keeneland_Girl",
    "Lamb_Chop",
    "Y2K",

    # Column 2: red light trails into monochrome and earth tones.
    "Gone_in_the_Night",
    "Hot_Blooded",
    "MT_EndSchoolZone_BW",
    "HAND_ON_FIRE",
    "Max",
    "Nucleus",
    "Garage_Lighting",
    "The_Dragon's_Hoard",

    # Column 3: dark portraits and cars balanced with monochrome work.
    "NOCTA_2",
    "Mustang_at_Night",
    "Red_Cap",
    "CH_Wyatt_9",
    "Fish_Out_of_Water",
    "Seeing_Double",
    "CHTKMY",
]

FEATURED = set(FEATURED_ORDER)

CATEGORY_SEQUENCE = ("portraits", "cars", "graduation", "miscellaneous")


def image_features(path: Path) -> dict:
    """Return layout and color features from a small image sample."""
    with Image.open(path) as image:
        sample = image.convert("RGB")
        sample.thumbnail((64, 64))
        pixels = list(sample.get_flattened_data())
        width, height = image.size

    red = sum(pixel[0] for pixel in pixels) / len(pixels) / 255
    green = sum(pixel[1] for pixel in pixels) / len(pixels) / 255
    blue = sum(pixel[2] for pixel in pixels) / len(pixels) / 255
    hue, saturation, value = colorsys.rgb_to_hsv(red, green, blue)

    return {
        "ratio": height / width,
        "hue": hue,
        "saturation": saturation,
        "value": value,
        "monochrome": saturation < 0.09,
    }


def masonry_order(paths: list[Path], column_count: int = 3) -> list[Path]:
    """Create balanced column runs with staggered seams and varied color.

    CSS multi-column layout consumes each returned column as one contiguous
    sequence. Images are assigned to projected columns first, then sequenced
    within each column to avoid repeated aspect ratios and color clusters.
    """
    if not paths:
        return []

    features = {path.stem: image_features(path) for path in paths}
    columns = [[] for _ in range(column_count)]
    heights = [0.0] * column_count

    # Tall images establish the column balance. Monochrome images receive a
    # strong penalty when one projected column already contains more of them.
    for path in sorted(
        paths,
        key=lambda item: (
            not features[item.stem]["monochrome"],
            -features[item.stem]["ratio"],
            item.name.lower(),
        ),
    ):
        feature = features[path.stem]
        monochrome_counts = [
            sum(features[item.stem]["monochrome"] for item in column)
            for column in columns
        ]
        column_index = min(
            range(column_count),
            key=lambda index: (
                heights[index]
                + (monochrome_counts[index] * 1.6 if feature["monochrome"] else 0),
                len(columns[index]),
                index,
            ),
        )
        columns[column_index].append(path)
        heights[column_index] += feature["ratio"]

    def sequence_column(column: list[Path], column_index: int) -> list[Path]:
        remaining = column[:]
        ordered = []
        cumulative_height = 0.0

        while remaining:
            if not ordered:
                # Give adjacent columns different opening proportions/colors.
                target_hue = (0.08 + column_index * 0.31) % 1
                chosen = max(
                    remaining,
                    key=lambda item: (
                        features[item.stem]["saturation"]
                        - abs(features[item.stem]["hue"] - target_hue) * 0.2,
                        features[item.stem]["ratio"],
                    ),
                )
            else:
                previous = features[ordered[-1].stem]

                def variation_score(item: Path) -> float:
                    current = features[item.stem]
                    hue_distance = abs(current["hue"] - previous["hue"])
                    hue_distance = min(hue_distance, 1 - hue_distance)
                    ratio_difference = abs(current["ratio"] - previous["ratio"])
                    tone_difference = abs(current["value"] - previous["value"])
                    monochrome_change = current["monochrome"] != previous["monochrome"]

                    # Avoid boundaries close to boundaries already built in
                    # earlier columns. Ratios are normalized to column width.
                    next_boundary = cumulative_height + current["ratio"]
                    earlier_boundaries = []
                    for earlier_column in columns[:column_index]:
                        height = 0.0
                        for earlier_item in earlier_column:
                            height += features[earlier_item.stem]["ratio"]
                            earlier_boundaries.append(height)
                    seam_distance = min(
                        (abs(next_boundary - boundary) for boundary in earlier_boundaries),
                        default=1.0,
                    )

                    return (
                        hue_distance * 1.2
                        + ratio_difference * 0.8
                        + tone_difference * 0.6
                        + (0.7 if monochrome_change else 0)
                        + min(seam_distance, 0.5) * 1.8
                    )

                chosen = max(remaining, key=variation_score)

            ordered.append(chosen)
            cumulative_height += features[chosen.stem]["ratio"]
            remaining.remove(chosen)

        return ordered

    sequenced_columns = [
        sequence_column(column, index) for index, column in enumerate(columns)
    ]
    return [item for column in sequenced_columns for item in column]


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

    featured_order = {stem: index for index, stem in enumerate(FEATURED_ORDER)}
    nonfeatured_order = {}
    next_index = 0
    for category in CATEGORY_SEQUENCE:
        category_paths = [
            path for path in thumbnails
            if path.stem not in FEATURED and category_for(path.stem) == category
        ]
        for path in masonry_order(category_paths):
            nonfeatured_order[path.stem] = next_index
            next_index += 1

    thumbnails.sort(
        key=lambda path: (
            0 if path.stem in featured_order else 1,
            featured_order.get(path.stem, nonfeatured_order.get(path.stem, 0)),
            path.name.lower(),
        )
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
