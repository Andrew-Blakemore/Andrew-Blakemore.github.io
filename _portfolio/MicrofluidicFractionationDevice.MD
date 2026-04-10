---
title: "Microfluidic Pinch-Flow Fractionation Device"
excerpt: "SLA-printed mold for PDMS microfluidic device enabling size-based particle separation using pinch-flow fractionation."
header:
  image: /assets/img/fluids_banner.jpg
  teaser: /assets/img/fluiidics_device_final.jpg

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---

## About Pinch-Flow Fractionation
{: .visually-hidden }

Pinch-flow fractionation (PFF) is a microfluidic technique used to separate particles based on size by leveraging laminar flow behavior at small scales. In a typical PFF device, a particle-containing stream is compressed (or “pinched”) by a buffer flow, forcing particles into predictable streamline positions based on their diameter. As the channel expands into a broader region, particles follow these streamlines and can be spatially separated into different outlet channels.

Compared to traditional filtration methods, PFF offers continuous operation without clogging, making it well-suited for applications in biomedical diagnostics, particle analysis, and micro-scale material processing.

---

## Design Overview

The goal of this project was to design and fabricate a microfluidic device capable of separating particles into two size ranges:
- **Small particles:** 125–150 μm  
- **Large particles:** 425–500 μm

The device was produced using SLA resin printing to create a mold, followed by PDMS casting and bonding to a glass substrate.

The core geometry consists of:
- Two inlet streams (particle-containing flow and buffer flow)
- A pinched section where particles are laterally compressed
- A broad expansion region where particles separate along streamlines
- Three outlet channels (small particles, large particles, buffer)

A key challenge in this design is balancing flow resistance across outlets to ensure particles are collected in the correct streams.

---

## Iterative Design Process

The device was developed through an iterative CAD workflow, focusing on both manufacturability and fluid behavior.

### Initial Design

The first design implemented a basic three-outlet configuration. While conceptually valid, it became clear that unequal flow distribution—especially due to the higher buffer flow—could lead to incorrect particle routing.

### Refined Design

To address this, outlet channel geometries were adjusted to control hydraulic resistance:
- Particle outlets were lengthened and/or narrowed
- The buffer outlet was shortened to preferentially carry excess flow

Additional refinements included smoothing transitions and minimizing dead volumes to reduce bubble formation.

---

## CAD Model

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b602811bbca4690918d996a?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

---

## Geometric Specifications

| Specification | Value |
|--------------|--------|
| Device Length | 75 mm |
| Device Width | 50 mm |
| Broad Section Length | ≥ 15 mm |
| Channel Spacing | ≥ 1 mm |
| Edge Clearance | ≥ 3 mm |
| Inlet/Outlet Diameter | 2.2 mm |

---

## Design Calculations & Justification

*This section will include detailed reasoning behind key design decisions, supported by analytical calculations and fluid mechanics principles.*

*(To be completed)*

---

## Fabrication Process

The device was fabricated using SLA printing to produce a mold, followed by PDMS casting.

### SLA Mold Fabrication

<p align="center">
  <img src="/assets/img/Mold_SLA_NO_COVER.jpg" alt="SLA Printed Mold">
</p>

A high-resolution SLA printer was used to fabricate the mold, enabling accurate reproduction of microfluidic features.

### Washing

<p align="center">
  <img src="/assets/img/Mold_Wash.jpg" alt="Mold Washing">
</p>

After printing, the mold was washed in isopropyl alcohol to remove uncured resin.

### Drying

<p align="center">
  <img src="/assets/img/Mold_Dry.jpg" alt="Mold Drying">
</p>

The mold was then dried thoroughly to prevent contamination and ensure proper curing.

### UV Curing

<p align="center">
  <img src="/assets/img/Mold_Cure.jpg" alt="Mold Curing">
</p>

A short UV curing step was performed to solidify the resin without introducing warping.

### Final Mold

<p align="center">
  <img src="/assets/img/Mold_Final.jpg" alt="Final Mold">
</p>

The completed mold shows clean channel features suitable for PDMS casting.

---

## PDMS Casting & Device Assembly

<p align="center">
  <img src="/assets/img/fluiidics_device_final.jpg" alt="Finished Device">
</p>

PDMS was poured over the mold, cured, and carefully removed. The device was then bonded to a glass slide to seal the channels.

---

## Testing Setup

<p align="center">
  <img src="/assets/img/Device_Testing_Setup.jpg" alt="Testing Setup">
</p>

The device was tested using a dual-syringe pump setup to control buffer and particle flow rates.

Initial testing demonstrated:
- Stable laminar flow through the device
- Clear separation of particle streamlines after the pinched region
- Sensitivity to flow balance and air bubble presence

---

## Future Direction: Enhanced Pinch-Flow Fractionation

A promising next step is to redesign the device using an **enhanced pinch-flow fractionation (EPFF)** approach. This method introduces a modified broadening region with a structured geometry (often described as a snakelike channel) that selectively expands the portion of the flow containing particles.

By amplifying the spacing between particle streamlines in this region, EPFF has been shown to significantly improve separation efficiency—reportedly achieving up to ~70% enhancement without introducing external forces.

This approach directly addresses the primary limitation observed in the current design: insufficient separation distance before outlet collection. Future iterations will focus on incorporating this geometry while maintaining manufacturability and flow stability.

---

## Video Demonstration

The following video demonstrates a working implementation of an enhanced PFF device, which serves as a reference for future design iterations.

<p align="center">
  <video width="640" controls>
    <source src="/assets/img/MicroFluidicsDemo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

---

## Discussion

This project highlights the challenges of translating theoretical microfluidic concepts into functional devices. While the fabrication process using SLA printing and PDMS casting proved effective, achieving reliable particle separation requires careful control of channel geometry and flow resistance.

The transition to an enhanced PFF design represents a natural next step, offering a geometry-driven solution to improve separation without increasing system complexity.

---
