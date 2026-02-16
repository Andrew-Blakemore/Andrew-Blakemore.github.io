---
title: "Low-Cost Cardiac Ultrasound Phantom"
excerpt: "A <$10 dynamic cardiac ultrasound phantom designed to simulate systolic and diastolic motion for accessible training."
header:
  image: /assets/img/phantom_cover.jpg
  teaser: /assets/img/phantom_cover.jpg

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---

## About Ultrasound Phantoms
{: .visually-hidden }

Ultrasound phantoms are physical models that replicate human tissue properties for imaging practice, device testing, and training. Commercial phantoms are widely used in medical education, but many cost hundreds to thousands of dollars, limiting accessibility for early learners and low-resource settings.

Low-cost phantoms have gained traction as an alternative, often using simple materials like gelatin, silicone, or latex to approximate acoustic properties. While many inexpensive designs successfully replicate static anatomy, fewer models capture dynamic physiological motion, which is critical for applications such as cardiac ultrasound training.

This project explores the design of a low-cost cardiac ultrasound phantom capable of simulating basic systolic and diastolic chamber motion using accessible materials and simple fabrication methods.

## Design Overview

The phantom was inspired by prior <$10 training models and adapted to better represent cardiac motion. The core concept was to create a fluid-filled chamber embedded in a tissue-mimicking medium that could be manually actuated to simulate contraction and relaxation.

The design consisted of:

- A latex glove chamber acting as a deformable ventricular cavity  
- Surgical tubing connected to a syringe for manual pulsation  
- Gelatin as a tissue-mimicking bulk material  
- Hot glue inclusions to simulate rib shadowing artifacts  

This configuration produced a deformable, fluid-filled structure that could be imaged using standard ultrasound systems.

## Fabrication

The phantom was constructed by forming a sealed latex chamber and filling it with water to mimic a fluid-filled cardiac cavity. The chamber was embedded within a gelatin matrix mixed with calcium chloride to improve structural stability. Tubing connected the chamber to a 20 mL syringe, allowing manual control of internal pressure and cyclic deformation.

<p align="center">
  <img src="/assets/img/fabrication.png" alt="System Architecture">
</p>

The fabrication process required only inexpensive, widely available materials and could be completed in a single session, making it suitable for resource-limited or rapid prototyping environments.

## Imaging Results

<p align="center">
  <img src="/assets/img/beat.gif" alt="System Architecture">
</p>

Ultrasound imaging of the phantom successfully reproduced key visual features of cardiac scans, including:

- A clear anechoic chamber resembling a ventricular cavity  
- Surrounding echogenic material analogous to soft tissue  
- Acoustic shadowing from simulated ribs  

Manual syringe actuation produced visible cyclic deformation of the chamber, enabling visualization of simulated systole and diastole. The chamber diameter decreased from approximately 7.0 cm in the relaxed state to 6.7 cm during compression, demonstrating repeatable dynamic motion detectable under ultrasound.

## Discussion

The phantom demonstrates that meaningful dynamic ultrasound training tools can be produced at extremely low cost. While the model does not replicate full cardiac anatomy or physiological motion, it provides an accessible platform for introducing learners to key imaging concepts such as chamber identification, probe positioning, and motion interpretation.

Several limitations remain, including simplified geometry, manual actuation, and limited anatomical fidelity. Future iterations could improve realism through:

- Motorized or pneumatic actuation for repeatable pulsation  
- Multi-chamber designs for anatomical accuracy  
- Improved tissue-mimicking materials for acoustic fidelity  

This project demonstrates a low-cost, dynamic cardiac ultrasound phantom built from readily available materials. By combining simple fabrication techniques with manual actuation, the design produces repeatable chamber motion visible under ultrasound, making it a practical educational tool for early ultrasound training.

The work highlights how accessible materials and rapid prototyping approaches can expand hands-on medical device education and democratize simulation-based learning.
