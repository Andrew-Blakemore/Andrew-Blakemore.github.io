---
title: "Wearable Gait Analysis System"
excerpt: "A lightweight, wearable system combining pressure sensing and IMU data to quantify gait symmetry and classify terrain in real time."
header:
  image: /assets/img/projects/gait-analysis-device/running-gait-hero.webp
  teaser: /assets/img/projects/gait-analysis-device/wearable-gait-sensor-prototype.webp

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---
## About Gait Analysis
{: .visually-hidden }

Measuring human gait provides valuable insight into injury recovery and neuromotor health. Subtle asymmetries in walking patterns can indicate neurological impairment or incomplete rehabilitation following lower-limb injury. However, many gait analysis tools remain confined to clinical environments due to cost, complexity, or lack of portability.

Traditional systems such as force plates provide high accuracy but are immobile and expensive, while pressure insoles often lack spatial resolution or robustness. Standalone IMU-based solutions offer portable motion tracking but cannot capture plantar loading distributions. These limitations create a gap between laboratory analysis and real-world monitoring.

This project explored a wearable, multi-sensor system that combined pressure sensing and inertial measurements in a compact, field-deployable platform.

## System Overview

The device consisted of a pressure-mapped insole paired with a 3-axis inertial measurement unit (IMU) and a microcontroller for real-time data acquisition and analysis. By integrating force and motion sensing, the system captured complementary biomechanical information that enabled more robust gait characterization than either modality alone.

<p align="center">
  <img src="/assets/img/projects/gait-analysis-device/gait-analysis-signal-path.webp" alt="System Architecture">
</p>

Pressure sensors embedded within the insole measured plantar loading patterns during stance phases, enabling estimation of force symmetry and peak pressure distribution. Simultaneously, the IMU captured acceleration signatures used for terrain classification, step timing, and other gait dynamics.

## Design Motivation

Lower-limb injuries and neuromotor disorders frequently lead to gait asymmetry that is difficult to measure outside specialized labs. Many patients rely on subjective feedback during rehabilitation, limiting their ability to quantify progress over time.

This system was designed with three primary goals:

- Quantify gait symmetry using distributed plantar pressure sensing
- Classify terrain using acceleration signatures
- Enable lightweight, portable deployment

By targeting both clinical and performance contexts, the design supports rehabilitation tracking and field-based biomechanical analysis.

## Key Technical Components

<p align="center">
  <img src="/assets/img/projects/gait-analysis-device/gait-analysis-hardware-connections.webp" alt="Key Technical Components">
</p>

The hardware architecture integrates several core subsystems:

**Pressure Sensor Array**  
A flexible set of force-sensitive elements embedded within the insole measures localized plantar loading. After iterative testing, a configuration of sixteen sensors provided stable measurements while minimizing system complexity.

**Analog Front End (AFE)**  
Signal conditioning circuitry amplifies and filters the raw pressure signals, enabling accurate digitization while maintaining low noise and minimal drift.

<p align="center">
  <img src="/assets/img/projects/gait-analysis-device/pressure-sensor-analog-front-end.webp" alt="Analog Front End">
</p>

**Inertial Measurement Unit (IMU)**  
A 3-axis IMU captures acceleration data used for both terrain classification and step segmentation. These signals complement the pressure data by providing dynamic motion context.

**Microcontroller and Data Interface**  
A compact microcontroller aggregates sensor streams and enables real-time processing, with USB connectivity used for prototyping and validation.

## Iterative Prototyping and Validation

The system was developed through iterative hardware and sensing experiments focused on balancing signal fidelity with wearability.

One alternative approach investigated terrain classification using acoustic signatures from a miniature microphone. While promising in controlled environments, this method proved unreliable due to ambient noise sensitivity and inconsistent foot-ground coupling. The concept was abandoned in favor of IMU-based terrain sensing, which provided more robust results.

Both sensing modalities were validated independently before full integration into the wearable system. IMU testing demonstrated consistent acceleration signatures across walking trials, enabling reliable step segmentation and surface-dependent pattern recognition. Pressure measurements were calibrated against known loads to verify responsiveness and repeatability. The selected sensor configuration showed stable readings during walking, with clear distinctions between stance phases.

<p align="center">
  <img src="/assets/img/projects/gait-analysis-device/wearable-gait-sensor-prototype.webp" alt="Prototype Gait Analysis System">
</p>

## Measurable Output Metrics

Preliminary testing produced several metrics derived from combined pressure and motion data:

- Force symmetry between left and right stance phases  
- Peak plantar pressure estimates  
- Step timing and cadence  
- Terrain identification
- Terrain-dependent gait signatures 

<p align="center">
  <img src="/assets/img/projects/gait-analysis-device/heel-strike-toe-off-acceleration-plot.webp" alt="Gait Data">
</p>

These outputs demonstrate the system’s ability to provide quantitative gait insights using a minimally instrumented wearable platform.

## Limitations and Future Work

While the proof-of-concept system successfully demonstrated hybrid sensing, several limitations remain. The current hardware prototype is bulkier than ideal for long-term wear, and not all sensor placements performed equally well across subjects.

Future work will focus on:

- Optimized sensor placement and mechanical integration
- Miniaturized electronics and compact power solutions
- Bluetooth data streaming and mobile visualization
- Improved comfort, durability, and environmental robustness

With further refinement, the platform could support clinical research and rehabilitation monitoring.
