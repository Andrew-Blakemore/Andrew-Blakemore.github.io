---
title: "3D Printed Pickleball Paddle"
excerpt: "A multi-material, 3D printed pickleball paddle that meets USA Pickleball guidelines for official play."
header:
  image: /assets/img/pickle-ban.jpg
  teaser: assets/img/tease.JPG

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars

---

## Overview
{: .visually-hidden }

This project explored the design and fabrication of a multi-material, 3D printed pickleball paddle. The paddle was designed as an assembly consisting of four components:

- Paddle body
- Edge guard
- Handle core
- Handle sleeve

All components were fabricated via FFF printing on a Voron printer.

---

## Design Overview

The main paddle body was printed in ABS to provide rigidity while maintaining manageable weight. A removable PETG edge guard was added to protect the perimeter of the paddle from wear. The handle system was composed of a rigid PLA core for structural support and a flexible TPU sleeve for grip and comfort.

---

## Interactive CAD Model

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b6028116f2e7aea73086291?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

---

## Assembly

<p align="center">
  <img src="/assets/img/full-paddle.jpg" alt="Complete Paddle">
</p>

The assembly was designed to be mechanically fastened and modular:

- Heat-set inserts (M5) were embedded into the bottom edge of the paddle body
- The edge guard was designed with aligned through-holes
- The handle also included matching holes

Bolts were inserted through the handle, passed through the edge guard, and threaded into the paddle inserts. This configuration served two purposes:
1. Securely attached the handle to the paddle  
2. Clamped the edge guard in place around the paddle perimeter  

The TPU handle sleeve was then installed via an interference fit over the handle, eliminating the need for adhesives while providing a compliant grip.

---

## Component Design Details
### Paddle Body

The paddle body was printed in ABS to provide a rigid, impact-resistant structure. A 20% infill was selected to balance stiffness and weight. ABS was chosen over PLA due to its improved toughness and resistance to cracking under repeated ball impacts.

---

### Edge Guard

The edge guard served as a protective layer around the paddle perimeter, shielding the paddle body from collisions with the ground and other paddles. PETG was selected for this component due to its balance of toughness, ductility, and impact resistance, allowing it to deform slightly under load rather than crack. Compared to more brittle materials like PLA, PETG is better suited for absorbing edge impacts without propagating damage into the main paddle body.

The edge guard included through-holes that aligned with the heat-set inserts in the paddle body, allowing it to be mechanically fastened using the same bolts that secured the handle. This created a clamped assembly that held the guard firmly in place while allowing it to be removed or replaced independently.

From a design perspective, this modularity opens the door for future improvements. Potential refinements include reinforced edge profiles in high-impact regions and a more streamlined outer geometry to reduce drag. Additionally, other materials or hybrid constructions could be explored to further optimize durability and performance.

---

### Handle Core

The handle core was printed in PLA for improved stiffness and dimensional accuracy. Since the handle of a pickleball paddle primarily experiences compressive and bending loads rather than impact forces, PLA provides sufficient structural performance while keeping the piece lightweight. Its low mass also contributes to the paddle’s head-heavy balance, which enhances power during swings.

Future improvements could include internal reinforcement features or slight geometric adjustments to improve ergonomics and durability without significantly increasing weight.

---

### Handle Sleeve

The handle sleeve was printed in TPU 95A to provide a compliant, high-friction grip surface. An interference fit secured the sleeve without adhesives while preventing rotation or loosening during use. TPU’s elastomeric behavior allows it to deform slightly under hand pressure, increasing contact area and friction while also reducing the transmission of impact vibrations to the player’s hand.

This required balancing dimensional tolerances, as TPU can stretch during installation but will relax to maintain a secure grip on the underlying handle.

Future iterations could explore contoured grip shapes, indexed features for consistent hand placement, or slight variations in TPU hardness to further improve ergonomics and feel.

---

## Weight

The final paddle mass exceeded 8.3 oz, making it heavier than most commercial paddles and enabling increased power and momentum transfer on each swing. This allowed for stronger drives and more forceful returns at the expense of quick hand adjustments and heightened reaction time at the net.

Weight can be tuned through internal structure and material selection. Increasing or decreasing infill density directly adjusts overall mass without changing external geometry. Alternative materials such as carbon fiber filaments or higher-density polymers can further increase rigidity and mass, while lighter materials can shift the paddle toward a more control-oriented weight class.

---

## Mass Distribution

The paddle exhibited a head-heavy balance due to the ABS body (higher mass) and PLA handle (lower mass). This mass distribution shifted the center of mass toward the paddle face, resulting in increased swing momentum, greater power on drives and smashes, and slightly reduced control for quick, reactive shots. This configuration aligned with a play style focused on power over finesse.

---

## Compliance with 2026 USA Pickleball Rules

The design was evaluated against relevant paddle specifications:

### Material (2.E.1)

The paddle is constructed from rigid, non-compressible materials (ABS, PETG, PLA) with a compliant TPU grip.

---

### Surface (2.E.2)

The paddle surface was printed to avoid:

- Rough textures
- Surface discontinuities
- Features that could impart excessive spin

Care was taken to maintain a smooth outer surface within acceptable roughness limits.

---

### Size (2.E.3)

The paddle dimensions were designed to comply with:

- Maximum combined length + width ≤ **24 in (60.96 cm)**
- Maximum length ≤ **17 in (43.18 cm)**

No restrictions were imposed on thickness, allowing flexibility in structural design.
