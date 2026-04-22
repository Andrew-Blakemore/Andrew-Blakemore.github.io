---
title: "3D Printed Pickleball Paddle"
excerpt: "A multi-material, fully 3D printed pickleball paddle that meets USA Pickleball guidelines for official play."
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

This project explores the design and fabrication of a **multi-material, fully 3D printed pickleball paddle**. The paddle was designed as an assembly consisting of four components:

- **Paddle body**
- **Edge guard**
- **Handle core**
- **Handle sleeve**

All components were fabricated using **FFF printing on Voron printers**.

---

## Design Overview

The paddle was designed with a focus on **structural integrity and ease of assembly**. The main paddle body was printed in **ABS** to provide rigidity while maintaining manageable weight. A removable **PETG edge guard** was added to protect the perimeter of the paddle from wear. The handle system was designed as a two-part solution including a rigid **PLA core** for structural support and a flexible **TPU sleeve** for grip and comfort. This separation allows the **functional and ergonomic requirements** of the design to be addressed independently.

---

## CAD Model

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b6028116f2e7aea73086291?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

---

## Assembly

<p align="center">
  <img src="/assets/img/full-paddle.jpg" alt="Complete Paddle">
</p>

The assembly was designed to be **mechanically fastened and modular**:

- **Heat-set inserts (M5)** were embedded into the bottom edge of the paddle body
- The **edge guard** was designed with aligned through-holes
- The **handle** also included matching holes

Bolts were inserted through the handle, passed through the edge guard, and threaded into the paddle inserts. This configuration serves two purposes:
1. **Securely attaches the handle to the paddle**
2. **Clamps the edge guard in place around the paddle perimeter**

The **TPU handle sleeve** was then installed as an **interference fit** over the handle, eliminating the need for adhesives while providing a compliant grip.

---

## Component Design Details
### Paddle Body

The paddle body was printed in **ABS** to provide a **rigid, impact-resistant structure**. A **20% infill** was selected to balance stiffness and weight. ABS was chosen over PLA due to its **improved toughness** and resistance to cracking under repeated ball impacts.

---

### Edge Guard

The edge guard serves as a **protective layer** around the paddle perimeter, shielding the paddle body from collisions with the ground and other paddles. **PETG** was selected for this component due to its balance of **toughness, ductility, and impact resistance**, allowing it to deform slightly under load rather than crack. Compared to more brittle materials like PLA, PETG is better suited for **absorbing edge impacts** without propagating damage into the main paddle body.

The edge guard includes **through-holes** that align with the **heat-set inserts** in the paddle body, allowing it to be mechanically fastened using the same bolts that secure the handle. This creates a **clamping system** where the handle, edge guard, and paddle are all integrated into a **single load path**. As a result, the edge guard is held firmly in place during play and the guard can be removed or replaced independently  

From a design perspective, this **modularity** opens the door for future improvements. Potential refinements include **reinforced edge profiles** in high-impact regions and a more **streamlined outer geometry** to reduce drag. Additionally, different materials or hybrid constructions could be explored to further optimize durability and performance. For instance, a **softer outer layer** combined with a **stiffer inner structure** could improve both impact absorption and structural support.

---

### Handle Core

The handle core was printed in **PLA** due to its **stiffness and dimensional accuracy**. Since the handle primarily experiences **compressive and bending loads** rather than impact, PLA provides sufficient structural performance while keeping the piece **lightweight**.

The rigid core serves as a **stable foundation** for the assembly, ensuring secure load transfer between the paddle and the user’s hand. Its lightweight nature also contributes to the paddle’s **head-heavy balance**, which enhances power during swings.

Future improvements could include **internal reinforcement features** or slight geometric adjustments to improve ergonomics and durability without significantly increasing weight.

---

### Handle Sleeve

The handle sleeve was printed in **TPU 95A** to provide a **compliant, high-friction grip surface**. The interference fit ensures a **secure attachment without adhesives**, while the material improves **comfort and performance** during play. TPU’s elastomeric behavior allows it to deform slightly under hand pressure, increasing contact area and friction, which helps prevent slipping during **high-power swings**. This also contributes to **vibration damping**, reducing the transmission of impact forces from ball contact into the player’s hand, which is an important factor for comfort during extended play.

The interference fit between the sleeve and the PLA handle core was intentionally designed to be tight enough to prevent **rotation or loosening over time**, while still allowing installation without excessive force. This required balancing dimensional tolerances, as TPU can stretch during installation but will relax to maintain a secure grip on the underlying handle.

From a geometric standpoint, the current sleeve design uses a relatively simple profile. However, future iterations could explore **contoured grip shapes** that better match the natural curvature of the hand, **indexed features** to guide consistent hand placement, or **textured surface patterns** (within rule limits) to enhance grip without increasing surface roughness excessively. Additionally, further modifications to the handle sleeve could be explored by varying TPU hardness (e.g., **90A instead of 95A**) or incorporating **internal lattice structures** to further tailor compliance and damping characteristics.

---

## Weight

The final paddle mass exceeded **8.3 oz**, making it relatively **heavy** compared to other models and enabling increased **power and momentum transfer** on each swing. This allows for stronger drives and more forceful returns at the expense of **quick hand adjustments** and rapid reaction time at the net.

One advantage of a fully 3D printed design is the ability to **tune weight through internal structure and material selection**. For example, increasing or decreasing **infill density** directly adjusts overall mass without changing external geometry. Selecting alternative materials (e.g., **carbon fiber filaments** or higher-density polymers) can further increase rigidity and mass, while switching to lighter materials or reducing wall thickness can shift the paddle toward a more **control-oriented weight class**.

These parameters provide a straightforward pathway for future iterations to tailor the paddle’s performance to different play styles, ranging from **power-focused** to **agility-focused designs**.

## Mass Distribution

The paddle exhibited a **head-heavy balance** due to the ABS body (**higher mass**) and PLA handle (**lower mass**). This mass distribution shifts the center of mass toward the paddle face, resulting in **increased swing momentum**, **greater power on drives and smashes**, and slightly **reduced control** for quick, reactive shots. This configuration aligns with a play style focused on **power over finesse**, where generating strong shots is prioritized over rapid hand adjustments.

More impactful adjustments to mass balance would include increasing **infill density near the paddle face** to further enhance head-heaviness, reducing handle mass or using lighter materials, or introducing **localized reinforcement zones** to shift the center of mass intentionally.

---

## Compliance with 2026 USA Pickleball Rules

The design was evaluated against relevant paddle specifications:

### Material (2.E.1)

The paddle is constructed from **rigid, non-compressible materials** (ABS, PETG, PLA) with a compliant TPU grip. All materials are **safe and structurally appropriate** for gameplay.

---

### Surface (2.E.2)

The paddle surface was printed to avoid:
- Rough textures
- Surface discontinuities
- Features that could impart excessive spin

Care was taken to maintain a **smooth outer surface** within acceptable roughness limits.

---

### Size (2.E.3)

The paddle dimensions were designed to comply with:
- Maximum combined length + width ≤ **24 in (60.96 cm)**
- Maximum length ≤ **17 in (43.18 cm)**

No restrictions were imposed on thickness, allowing flexibility in structural design.

---

## Discussion

This project demonstrates the viability of a **fully 3D printed pickleball paddle** using a **multi-material approach**. By separating **structural, protective, and ergonomic functions** into different components, the design achieves a balance between **durability, performance, and user comfort**.

The modular assembly enables **easy iteration**, particularly for components such as the edge guard and handle grip. Future improvements could focus on optimizing **internal infill structures**, refining **mass distribution**, and improving **surface finish** for enhanced gameplay performance.
