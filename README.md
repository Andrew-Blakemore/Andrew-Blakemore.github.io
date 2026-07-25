# Andrew Blakemore — Portfolio Website

Source code for [andrew-blakemore.com](https://andrew-blakemore.com), a personal portfolio featuring biomedical engineering projects, photography, and the 2026–27 Keegan Traveling Fellowship.

The site is built with [Jekyll](https://jekyllrb.com/) and the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) remote theme, then published through GitHub Pages.

## Site sections

- **Home** — featured work, current projects, and a short introduction
- **About** — background, experience, and contact information
- **Engineering Projects** — detailed project pages from the `_portfolio` collection
- **Photography** — an optimized, filterable masonry gallery with a scroll-driven camera hero
- **Keegan Fellowship** — a scroll-driven prosthetic hero, fellowship overview, animated travel map, destination cards, and individual itinerary pages

## Repository structure

```text
.
├── _data/
│   ├── navigation.yml       # Main navigation
│   └── photography.yml      # Photography metadata and gallery order
├── _includes/               # Reusable Liquid/HTML components
├── _layouts/                # Page layouts, including itinerary pages
├── _pages/
│   ├── keegan.md            # Live fellowship page
│   ├── photography.md       # Photography gallery
│   └── keegan-itinerary/    # Country itinerary pages
├── _portfolio/              # Engineering project pages
├── _sass/
│   └── _custom.scss         # Custom site, page, and responsive styling
├── assets/
│   ├── img/
│   │   ├── heroes/          # Homepage and section imagery
│   │   ├── photography/     # Thumbnail and full gallery images
│   │   ├── profile/         # Portraits and headshots
│   │   ├── projects/        # Project-specific images
│   │   └── travel/          # Fellowship and itinerary imagery
│   └── js/
│       ├── keegan-map.js
│       ├── keegan-prosthetic-hero.js
│       └── photography-camera-hero.js
├── _config.yml              # Jekyll and site-wide settings
├── CNAME                    # Custom domain
├── Gemfile                  # Ruby dependencies
└── index.md                 # Homepage
```

## Running locally

### Prerequisites

- [Ruby](https://www.ruby-lang.org/) with RubyGems
- [Bundler](https://bundler.io/)

Install the dependencies:

```bash
gem install bundler
bundle install
```

Start the local development server:

```bash
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000) in a browser. Changes to `_config.yml` require restarting the server.

To create a production build without starting a server:

```bash
bundle exec jekyll build
```

The generated site is written to `_site/`.

## Updating content

### Engineering projects

Project pages live in `_portfolio/`. Each Markdown file contains YAML front matter followed by the project content. Corresponding images should be stored in:

```text
assets/img/projects/<project-name>/
```

### Photography

Every photograph uses a matching filename in both directories:

```text
assets/img/photography/thumbnails/
assets/img/photography/gallery/
```

The gallery reads its titles, categories, dimensions, featured status, and display order from `_data/photography.yml`.

`generate_photo_dimensions.py` can rebuild that data file from the paired WebP images. It requires Python and Pillow:

```bash
python -m pip install Pillow
python generate_photo_dimensions.py
```

The script contains the featured order, category assignments, title overrides, and masonry-balancing logic. Review its configuration before running it because it rewrites `_data/photography.yml`.

### Keegan Fellowship

- Main page content and destination data: `_pages/keegan.md`
- Country itinerary pages: `_pages/keegan-itinerary/`
- Map and route behavior: `assets/js/keegan-map.js`
- Prosthetic hero animation: `assets/js/keegan-prosthetic-hero.js`
- Travel imagery: `assets/img/travel/`

The map is rendered with [Leaflet](https://leafletjs.com/) and OpenStreetMap tiles. Destination coordinates, route order, summaries, and itinerary links are defined in `window.keeganStops` on the main Keegan page.

### Navigation and site settings

- Edit `_data/navigation.yml` to change the primary navigation.
- Edit `_config.yml` for site metadata, author information, collections, plugins, and build settings.
- Edit `_sass/_custom.scss` for custom layout and responsive styling.

## Image guidelines

- Use WebP for site photography and large visual assets.
- Keep filenames descriptive and concise.
- Use separate optimized thumbnail and gallery versions for photography.
- Preserve image dimensions in `_data/photography.yml` to reduce layout movement while images load.
- Avoid committing original, full-resolution source files when optimized web versions are already available.

## Deployment

The repository is configured for GitHub Pages and uses the custom domain in `CNAME`. Publishing changes to the repository’s Pages branch triggers a new build and deployment.

Before publishing:

1. Run the site locally.
2. Check desktop and mobile layouts.
3. Test navigation, gallery filters, lightboxes, map filters, and itinerary links.
4. Confirm that newly referenced images exist and match the capitalization used in the code.

## Built with

- Jekyll
- GitHub Pages
- Minimal Mistakes
- Sass
- Vanilla JavaScript
- Leaflet and OpenStreetMap
- Magnific Popup

## License

The website source and its writing, project documentation, and other original media are the property of Andrew Blakemore unless otherwise noted. Please do not reuse those materials without permission. Third-party libraries and map data remain subject to their respective licenses.
