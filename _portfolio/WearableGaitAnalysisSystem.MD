---
title: "Wearable Multi-Sensor Gait Analysis System"
excerpt: "A lightweight-wearable system combining pressure sensing and IMU data to quantify gait symmetry and classify terrain in real time."
header:
  image: /assets/img/pliers_present1.jpg
  teaser: /assets/img/pliers_cover.jpg

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---
## About Gait Analysis Systems
{: .visually-hidden }

Measuring human gait provides valuable insight into injury recovery and neuromotor health. Subtle asymmetries in walking patterns can indicate musculoskeletal imbalance, early-stage neurological impairment, or incomplete rehabilitation following lower-limb injury. However, many gait analysis tools remain confined to clinical environments due to cost, complexity, or lack of portability.

Traditional systems such as force plates provide high accuracy but are immobile and expensive, while pressure insoles often lack spatial resolution or robustness. Standalone IMU-based solutions offer portable motion tracking but cannot capture plantar loading distributions. These limitations create a gap between laboratory-grade analysis and real-world monitoring.

This project explores a wearable, multi-sensor system designed to bridge that gap by combining pressure sensing and inertial measurements in a compact, field-deployable platform.

## System Overview

The device consists of a pressure-mapped insole paired with a 3-axis inertial measurement unit (IMU) and a microcontroller for real-time data acquisition and analysis. By integrating both force and motion sensing, the system captures complementary biomechanical information that enables more robust gait characterization than either modality alone.

<p align="center">
  <img src="/assets/img/System_architecture.png" alt="System Architecture">
</p>

Pressure sensors embedded within the insole measure plantar loading patterns during stance phases, enabling estimation of force symmetry and peak pressure distribution. Simultaneously, the IMU captures acceleration signatures that provide information about step timing, gait dynamics, and surface-dependent motion characteristics.

## Design Motivation

Lower-limb injuries and neuromotor disorders frequently lead to gait asymmetry that is difficult to measure outside specialized labs. Many patients rely on subjective feedback during rehabilitation, limiting their ability to quantify progress over time. Athletes and clinicians alike would benefit from a portable system capable of delivering objective gait metrics in everyday environments.

This system was designed with three primary goals:

- Quantify gait symmetry using distributed plantar pressure sensing  
- Classify terrain using acceleration signatures  
- Enable lightweight, portable deployment for real-world monitoring  

By targeting both clinical and performance contexts, the design aims to support rehabilitation tracking, early impairment detection, and field-based biomechanical analysis.

## Key Technical Components

<p align="center">
  <img src="/assets/img/Key Technical Components.png" alt="Key Technical Components">
</p>

The hardware architecture integrates several core subsystems:

**Pressure Sensor Array**  
A flexible set of force-sensitive elements embedded within the insole measures localized plantar loading. After iterative testing, a configuration of four sensors provided stable and discriminative measurements while minimizing system complexity.

**Analog Front End (AFE)**  
Signal conditioning circuitry amplifies and filters the raw pressure signals, enabling accurate digitization while maintaining low noise and minimal drift.

<p align="center">
  <img src="/assets/img/AFE.png" alt="Analog Front End">
</p>

**Inertial Measurement Unit (IMU)**  
A 3-axis IMU captures acceleration data used for both step segmentation and terrain classification. These signals complement the pressure data by providing dynamic motion context.

**Microcontroller and Data Interface**  
A compact microcontroller aggregates sensor streams and enables real-time processing, with USB connectivity used for prototyping and validation.

## Iterative Prototyping and Validation

The system was developed through iterative hardware and sensing experiments focused on balancing signal fidelity with wearability. Early prototypes explored multiple sensing modalities and placements to determine the most informative configuration.

One alternative approach investigated terrain classification using acoustic signatures from a miniature microphone. While promising in controlled environments, this method proved unreliable due to ambient noise sensitivity and inconsistent foot–ground coupling. The concept was ultimately abandoned in favor of IMU-based terrain sensing, which provided more robust and repeatable results.

## Sensor Validation

Both sensing modalities were validated independently before full integration into the wearable system.

### IMU Validation

<p align="center">
  <img src="/assets/img/IMU.gif" alt="IMU Data Visualization">
</p>

IMU testing demonstrated consistent acceleration signatures across walking trials, enabling reliable step segmentation and surface-dependent pattern recognition.

### Pressure Sensor Validation

<p align="center">
  <img src="/assets/img/Pressure_video.gif" alt="Pressure Sensor Validation">
</p>

Pressure measurements were calibrated against known loads to verify responsiveness and repeatability. The selected sensor configuration showed stable readings during walking, with clear distinctions between stance phases and peak loading events.

## Example Output Metrics

Preliminary testing produced several physiologically relevant metrics derived from combined pressure and motion data:

- Force symmetry between left and right stance phases  
- Peak plantar pressure estimates  
- Step timing and cadence  
- Terrain-dependent gait signatures  

<p align="center">
  <img src="/assets/img/Graph.png" alt="Example Sensor Output">
</p>

These outputs demonstrate the system’s potential to provide quantitative gait insights using a minimally instrumented wearable platform.

## Limitations and Future Work

While the proof-of-concept system successfully demonstrated hybrid sensing, several limitations remain. The current hardware prototype is bulkier than ideal for long-term wear, and not all sensor placements performed equally well across subjects.

Future work will focus on improving integration and usability through:

- Optimized sensor placement and mechanical integration  
- Miniaturized electronics and compact power solutions  
- Wireless data streaming and mobile visualization  
- Improved comfort, durability, and environmental robustness  

With further refinement, the platform could support deployment in clinical research, rehabilitation monitoring, and performance analysis.
