---
title: "Microfluidic Pinch-Flow Fractionation Device"
excerpt: "SLA-printed mold for PDMS microfluidic device enabling size-based particle separation using pinch-flow fractionation."
header:
  image: /assets/img/microfluidic_present.jpg
  teaser: /assets/img/microfluidic_cover.jpg

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---

## About Pinch-Flow Fractionation
{: .visually-hidden }

Pinch-flow fractionation (PFF) is a microfluidic technique used to separate particles based on size by leveraging laminar flow behavior at small scales. In a typical PFF device, a particle-containing stream is compressed (or “pinched”) by a buffer flow, forcing particles into predictable streamline positions based on their diameter. As the channel expands into a broader region, particles follow these streamlines and can be spatially separated into different outlet channels.

This method is particularly advantageous over traditional filtration techniques, as it avoids clogging and enables continuous sorting of particles without physical barriers. Applications of PFF include cell sorting, particle analysis in biomedical diagnostics, and industrial processes involving suspensions of microscale materials.

This project focuses on the design, fabrication, and testing of a microfluidic PFF device using SLA resin printing and PDMS casting.

---

## Design Overview

The device was designed to separate particles into two size ranges:
- **Small particles:** 125–150 μm  
- **Large particles:** 425–500 μm :contentReference[oaicite:0]{index=0}  

The core geometry consists of:
- Two inlet streams (particle-containing flow and buffer flow)
- A **pinched section** where particles are laterally compressed
- A **broad expansion region** where particles separate along streamlines
- Three outlet channels:
  - Small particle outlet
  - Large particle outlet
  - Buffer outlet

The separation principle is governed by the relationship between particle diameter and streamline position after the pinched region. As described in the project brief, particle position depends on channel geometry and particle size, enabling deterministic separation :contentReference[oaicite:1]{index=1}.

A key design challenge lies not in separating particles, but in **collecting the separated streams without disrupting flow balance**. If outlet resistances are mismatched, particles may be diverted into incorrect channels, reducing sorting accuracy.

---

## Iterative Design Process

The device was developed through an iterative CAD-driven workflow in Autodesk Fusion, with a focus on balancing manufacturability and fluid performance.

### Initial Design

The first design emphasized a straightforward implementation of a three-outlet PFF system. The pinched region width was selected based on the largest particle diameter to prevent clogging, while the broad region length was extended to allow sufficient spatial separation.

However, early considerations revealed a major issue:
- The **buffer stream carries significantly more flow** than the particle streams, requiring careful outlet design to avoid flow imbalance :contentReference[oaicite:2]{index=2}.

Additionally, maintaining equal outlet diameters (due to barb constraints) limited the ability to control flow distribution through geometry alone.

### Refined Design

To address these issues, the design incorporated **on-chip flow resistance tuning**:
- Particle outlet channels were made **longer and/or narrower** to increase hydraulic resistance
- The buffer outlet was kept **shorter and wider** to preferentially carry excess flow

This approach reduces reliance on external tubing conditions and improves robustness against variations such as tubing length or trapped air bubbles.

Further refinements included:
- Smoothing channel transitions to reduce bubble trapping
- Maintaining consistent inlet dimensions to simplify flow control
- Ensuring adequate spacing between features to prevent leakage and structural failure

---

## CAD Model

<iframe src="https://example.com/embedded_model" width="640" height="480" allowfullscreen="true" frameborder="0"></iframe>

---

## Geometric Specifications

| Specification | Value |
|--------------|--------|
| Device Length | 75 mm |
| Device Width | 50 mm |
| Pinched Width (wp) | *TBD* |
| Broad Section Width (wb) | *TBD* |
| Broad Section Length | ≥ 15 mm |
| Channel Spacing | ≥ 1 mm |
| Edge Clearance | ≥ 3 mm |
| Inlet/Outlet Diameter | 2.2 mm |
| Outlet Spacing (Center-to-Center) | ≥ 11 mm |

*Final dimensions were selected to ensure compatibility with SLA printing resolution and PDMS casting constraints.*

---

## Design Calculations & Justification

*This section will include detailed reasoning behind key design decisions, supported by analytical calculations and fluid mechanics principles.*

- Pinched region sizing relative to particle diameter  
- Streamline position predictions  
- Hydraulic resistance calculations for outlet balancing  
- Flow rate considerations and expected pressure drops  

*(To be completed)*

---

## Fabrication Process

The device was fabricated using a multi-step soft lithography workflow:

### 1. Mold Fabrication (SLA Printing)

A negative mold of the microfluidic channels was designed and printed using a Formlabs SLA printer. SLA printing was selected due to its high resolution (minimum feature size ~85 μm), enabling accurate reproduction of micro-scale channel geometries :contentReference[oaicite:3]{index=3}.

Key considerations:
- The mold surface interfacing with PDMS was kept **perfectly flat** to ensure proper sealing
- Feature aspect ratios were limited to prevent breakage during printing and demolding
- Channel dimensions were selected above minimum printable thresholds

### 2. Post-Processing

Post-processing steps included:
- Isopropyl alcohol (IPA) washing to remove uncured resin
- Controlled UV curing to prevent warping
- Removal of support structures without damaging channel features

Special care was taken to avoid surface contamination, as roughness or residue can inhibit PDMS bonding.

### 3. PDMS Casting

- PDMS (10:1 ratio) was poured over the mold and cured
- The cured PDMS layer was peeled from the mold
- Inlet and outlet holes were formed using embedded posts in the mold

### 4. Device Bonding

The PDMS device was plasma treated and bonded to a glass slide to seal the microchannels. Proper bonding is critical to prevent leakage and ensure consistent flow behavior.

---

## Testing & Performance

The device was tested using a dual-syringe pump setup:
- Buffer flow rate: ~3.0 mL/min  
- Particle-containing flow rate: ~0.6 mL/min :contentReference[oaicite:4]{index=4}  

Polyethylene microspheres were used as test particles, suspended in a surfactant solution to prevent aggregation.

Key observations:
- Stable laminar flow was achieved within the device
- Particles followed distinct streamlines after the pinched region
- Separation into designated outlets was observed, with performance dependent on flow balance and absence of air bubbles

---

## Discussion

This project highlights both the strengths and challenges of microfluidic device design:

- **Advantages of SLA + PDMS fabrication:**
  - High resolution and rapid prototyping
  - Ability to iterate designs quickly
  - Smooth channel surfaces suitable for microfluidics

- **Key challenges:**
  - Managing flow resistance across outlets
  - Preventing bubble formation and trapping
  - Balancing manufacturability with micro-scale precision

Future improvements could include:
- Optimization of outlet geometries for more precise flow control
- Integration of asymmetric PFF designs for enhanced separation
- Scaling the device to accommodate a wider range of particle sizes

---

## Multimedia

*To be added:*
- CAD sketches with labeled dimensions  
- Images of SLA-printed mold  
- PDMS casting process  
- Experimental setup (syringe pumps, tubing, device)  
- Video demonstration of particle separation  

---
