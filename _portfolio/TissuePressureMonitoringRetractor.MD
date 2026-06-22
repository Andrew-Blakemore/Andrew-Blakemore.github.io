---
title: "Pressure Monitoring Retractor"
excerpt: "A pressure-sensing cervical retractor designed in collaboration with Medtronic Spine R&D for anterior cervical spine surgery."
header:
  image: /assets/img/retractor_header.jpg
  teaser: /assets/img/retractor_teaser.jpg

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---
## Project Overview
{: .visually-hidden }

This project was completed in collaboration with Medtronic Spine R&D and focused on improving the Medtronic Trimline Retractor used during anterior cervical discectomy and fusion (ACDF) procedures.

The Trimline Retractor is a self-retaining surgical retractor designed to hold back the trachea, esophagus, muscles, and surrounding soft tissue, allowing surgeons to access the cervical spine. Once positioned, the device maintains retraction throughout the procedure while the surgeon performs the discectomy and fusion.

<p align="center">
  <img src="/assets/img/trimline_retractor_diagram.png" alt="Trimline Retractor">
</p>

<p align="center">
  <em>Image source: Medtronic.</em>
</p>

<p align="center">
  <video width="640" controls>
    <source src="/assets/img/Retractor_Video.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

One challenge with existing cervical retractors is that surgeons receive no quantitative feedback regarding the amount of force being applied to tissue or how long that tissue has remained under load. Excessive retraction force and prolonged loading have been associated with postoperative complications such as dysphagia (difficulty swallowing) and dysphonia (voice impairment), yet current systems rely entirely on surgeon experience and judgment.

This project explored two pressure-sensing modifications to the Trimline Retractor capable of providing real-time intraoperative feedback. The objective was to quantify tissue loading during surgery without altering the normal function, geometry, or workflow of the existing device.

---

## Clinical Motivation

Anterior cervical spine procedures require prolonged soft-tissue retraction to expose the surgical site. While necessary for access, this retraction can place significant stress on surrounding anatomy.

Because current retractors provide no force feedback, surgeons cannot directly quantify tissue loading during a procedure. Developing a method to monitor pressure and time-under-load may help future studies identify relationships between retraction conditions and postoperative outcomes.

---

## Design Requirements

The proposed system was required to:

* Maintain normal retractor functionality
* Provide real-time force feedback
* Remain compatible with existing surgical workflows
* Utilize sterilizable and biocompatible materials
* Avoid interference with the surgical field
* Operate safely in a clinical environment

Because the device would be used during surgery, preserving the geometry and usability of the existing retractor was considered a critical design constraint.

---

## Design Concepts

Two sensing approaches were developed.

### Concept 1: Instrumented Retractor Arm

The first concept integrated a strain-gauge load cell directly into the retractor rack. A structural component within the retractor assembly was replaced with a custom load cell designed to match the geometry of the original part.

<p align="center">
  <img src="/assets/img/load_cell_drawing.png" alt="Load Cell Retractor Concept">
</p>

<p align="center">
  <em>Image source: Medtronic.</em>
</p>

*Figure 2. Load-cell integration into the retractor assembly.*

As retraction force increased, the load cell experienced microscopic deformation that could be measured using bonded strain gauges. This approach provided a single quantitative measurement of the overall force applied through the retractor.

---

### Concept 2: Pressure-Sensing Blade

The second concept incorporated an array of piezoelectric sensors directly into the retractor blade.

<p align="center">
  <img src="/assets/img/figure3.jpg" alt="Pressure Sensing Blade Concept">
</p>

*Figure 3. Retractor blade with integrated piezoelectric sensor array.*

Unlike the load-cell approach, this design provided spatial information about tissue loading. By arranging sensors across the blade surface, a pressure map could be generated to identify localized regions of high stress.

---

## Electronics Architecture

Both concepts utilized a Silicon Labs EFR32BG29 wireless SoC microcontroller to acquire sensor data and transmit measurements to an external processing system.

The wireless architecture was selected to:

* Reduce cable clutter in the operating room
* Enable real-time monitoring
* Support future data logging and visualization capabilities

Sensor data would be processed on a connected computer and displayed through a surgeon-facing user interface.

---

## Fabrication Strategy

### Load Cell Assembly

The load-cell concept was designed around a CNC-machined 316L stainless steel structure.

The manufacturing process consisted of:

1. CNC machining the load-cell geometry
2. Stress-relief annealing
3. Bonding foil strain gauges to the surface
4. Wiring the gauges into a Wheatstone bridge circuit
5. Signal amplification using an instrumentation amplifier

This approach leveraged established load-cell manufacturing techniques while maintaining compatibility with surgical sterilization requirements.

---

### Pressure-Sensing Blade

The pressure-sensing blade was also designed to be fabricated from CNC-machined 316L stainless steel.

Piezoelectric sensors would be bonded directly to the blade surface in a grid pattern and connected to the microcontroller through dedicated analog channels.

The resulting design would generate a distributed pressure map rather than a single force measurement.

---

## Proposed Testing

A staged testing approach was developed to evaluate the device.

### Mechanical Validation

Initial testing would verify:

* Structural integrity
* Sensor calibration
* Electrical safety

Known loads would be applied to establish sensor accuracy and repeatability.

### Tissue Testing

Following bench validation, the device would be evaluated using:

* Tissue phantoms
* Cadaveric models
* Porcine tissue models

These tests would assess the system's ability to measure realistic tissue pressures while maintaining normal surgical operation.

---

## Market Opportunity

Although ACDF retractors represent a specialized surgical market, they address a clinically significant problem that currently lacks a dedicated sensing solution.

The proposed platform could potentially be expanded beyond cervical spine surgery into other procedures requiring prolonged tissue retraction, creating opportunities within the broader surgical instrumentation market.

---

## Key Takeaways

* Current ACDF retractors provide no feedback regarding tissue loading.
* Real-time pressure monitoring may help reduce preventable soft-tissue injury.
* Two complementary sensing approaches were developed: load-cell measurement and pressure mapping.
* The proposed designs preserve existing surgical workflows while adding quantitative feedback.
* Future work would focus on prototype fabrication, validation, and cadaveric testing.

---

## Conclusion

This project explored two approaches for measuring tissue pressure during anterior cervical spine surgery. Both concepts sought to provide surgeons with real-time information regarding retraction forces while preserving the functionality of existing retractors.

## Although the designs remain at the conceptual stage, they establish a foundation for future prototype development and testing. By introducing objective measurements into a procedure that currently relies entirely on surgeon judgment, pressure-sensing retractors have the potential to improve surgical decision-making and reduce postoperative complications.
