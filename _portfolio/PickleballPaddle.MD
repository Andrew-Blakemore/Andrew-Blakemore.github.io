---
title: "3D Printed Pickleball Paddle"
excerpt: "A multi-material, fully 3D printed pickleball paddle that meets requirements for USA Pickleball approval."
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

This project explores the design and fabrication of a fully 3D printed pickleball paddle using a multi-material approach. The paddle was designed as a modular assembly consisting of four primary components:

- **Paddle body (ABS)**
- **Edge guard (PETG)**
- **Handle core (PLA)**
- **Handle sleeve (TPU 95A)**

All components were fabricated using FFF printing on Voron printers. The design emphasizes durability, modularity, and tunable performance characteristics such as weight distribution and grip feel.

---

## Design Overview

The paddle was designed with a focus on structural integrity and ease of assembly. The main paddle body was printed in ABS with moderate infill to provide rigidity while maintaining manageable weight. A removable PETG edge guard was added to protect the perimeter from impacts and wear.

The handle system was designed as a two-part solution:
- A rigid PLA core for structural support
- A flexible TPU sleeve for grip and comfort

This separation allows the functional and ergonomic requirements to be addressed independently.

---

## CAD Model

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b6028116f2e7aea73086291?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

---

## Assembly Method

<p align="center">
  <img src="/mnt/data/cdd52cf0-89be-4bb9-b95a-46c810902701.png" alt="Paddle CAD">
</p>

The assembly was designed to be mechanically fastened and modular:

- **Heat-set inserts (M5)** were embedded into the bottom edge of the paddle body
- The **edge guard** was designed with aligned through-holes
- The **handle** also included matching holes

Bolts were inserted through the handle, passed through the edge guard, and threaded into the paddle inserts. This configuration serves two purposes:
1. Securely attaches the handle to the paddle
2. Clamps the edge guard in place around the paddle perimeter

The **TPU handle sleeve** was then installed as an interference fit over the handle, eliminating the need for adhesives while providing a compliant grip.

---

## Component Design Details

### Paddle Body (ABS)

The paddle body was printed in ABS to provide a rigid, impact-resistant structure. A 20% infill was selected to balance stiffness and weight. ABS was chosen over PLA due to its improved toughness and resistance to cracking under repeated ball impacts.

---

### Edge Guard (PETG)

The edge guard serves as a sacrificial protective layer around the paddle perimeter. PETG was selected for its combination of toughness and flexibility, allowing it to absorb impacts without fracturing.

The removable design allows:
- Easy replacement after wear
- Iteration on geometry without reprinting the entire paddle

---

### Handle Core (PLA)

The handle core was printed in PLA due to its stiffness and dimensional accuracy. Since the handle is primarily loaded in compression and bending (rather than impact), PLA provides sufficient strength while remaining lightweight.

---

### Handle Sleeve (TPU 95A)

The handle sleeve was printed in TPU 95A to provide a compliant, high-friction grip surface. The interference fit ensures a secure attachment without adhesives, while the material improves comfort and vibration damping during play.

---

## Weight & Mass Balance

The final paddle mass exceeded **8.3 oz**, placing it in the **heavy category**, which prioritizes power generation during play.

- **Heavy paddles (>8.3 oz):** Increased power and momentum transfer  
- **Tradeoff:** Reduced maneuverability compared to lighter paddles  

### Mass Distribution

The paddle exhibited a **head-heavy balance** due to:
- The ABS paddle body (higher mass)
- The PLA handle (lower mass)

This mass distribution shifts the center of mass toward the paddle face, resulting in:
- Increased swing momentum
- Greater power on drives and smashes
- Slightly reduced control for quick, reactive shots

This configuration aligns with a play style focused on **power over finesse**, where generating strong shots is prioritized over rapid hand adjustments.

---

## Compliance with 2026 USA Pickleball Rules

The design was evaluated against relevant paddle specifications:

### Material (2.E.1)

The paddle is constructed from rigid, non-compressible materials (ABS, PETG, PLA) with a compliant TPU grip. All materials are safe and structurally appropriate for gameplay.

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
- Maximum combined length + width ≤ 24 in (60.96 cm)
- Maximum length ≤ 17 in (43.18 cm)

No restrictions were imposed on thickness, allowing flexibility in structural design.

---

## Discussion

This project demonstrates the viability of a fully 3D printed pickleball paddle using a multi-material approach. By separating structural, protective, and ergonomic functions into different components, the design achieves a balance between durability, performance, and user comfort.

The modular assembly enables easy iteration, particularly for components such as the edge guard and handle grip. Future improvements could focus on optimizing internal infill structures, refining mass distribution, and improving surface finish for enhanced gameplay performance.
