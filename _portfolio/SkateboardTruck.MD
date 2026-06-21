---
title: "Generative Design Skateboard Truck"
excerpt: "A generative design study of a lightweight skateboard truck hanger with an integrated motor mount, optimized for structural performance and reduced mass."
header:
  image: /assets/img/truck-header.JPG
  teaser: /assets/img/printed-truck-attached.jpg

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---
## Project Overview
{: .visually-hidden }

This project explored the use of generative design to develop a lightweight skateboard truck hanger with an integrated motor mount for an electric longboard. The goal was to consolidate multiple functional components into a single optimized structure capable of withstanding realistic loads while minimizing mass.

Unlike traditional CAD workflows, generative design produces geometry based on load constraints and material properties. This makes it particularly effective for components like a truck hanger, where complex load paths and multiple functional requirements intersect.

---

## Background

The skateboard truck hanger is the primary structural element connecting the wheels to the board. It transmits forces from the rider during riding and braking while rotating about the kingpin through compressible bushings to enable steering.

In a conventional setup:
- The hanger is typically cast aluminum
- The axle is a press-fit steel rod
- The motor mount is a separate attachment

In this project, the hanger and motor mount were combined into a single generatively designed component, improving load transfer and reducing part count.

---

## Design Objectives

- Minimize mass while maintaining structural integrity  
- Maintain a minimum safety factor of 2
- Integrate the motor mount into the hanger
- Preserve all critical functional interfaces  
- Ensure compatibility with the pulley system and assembly constraints  

The study used an unrestricted manufacturing setting to allow maximum geometric freedom.

---

## CAD Setup

A CAD model of the longboard assembly was utilized to define key interfaces and constraints. The generative design workflow required separating geometry into:

### Preserve Geometry
- Axle ends
- Pivot interface
- Motor mounting holes and shaft clearance
- Functional kingpin cutout

### Obstacle Geometry
- Motor and pulley clearance
- Tool access regions
- Assembly motion paths

Maintaining these geometries ensured the final design remained functional after optimization.

---

## Generative Design Inputs

### Constraints
- The kingpin region was treated as a fixed support
- The axle ends, motor mount, and pivot were allowed to respond to loads

### Load Cases

Applying realistic load cases is critical in generative design because the resulting geometry is entirely driven by the forces and constraints applied. For this project, the load cases were selected to represent the primary forces experienced during riding, including vertical rider weight, lateral turning forces, motor torque, braking, and curb impacts.

The forces were estimated using reasonable assumptions based on rider weight, expected usage, and simplified physical models. This process could be improved through experimental measurements, dynamic simulations, or more detailed, multi-axis loading conditions.

| Force Name        |   Magnitude   | Location Applied | Rationale |
|-------------------|---------------|------------------|----------|
| Rider Weight      | 800 N         | Axle           | Represents vertical load from rider |
| Motor Weight      | 9.61 N        | Motor Mount    | Represents vertical load from motor |
| Motor Torque      | 8000 N-mm     | Motor Mount    | Simulates propulsion through belt drive |
| Lateral Load      | 600 N         | Axle           | Represents turning forces |
| Braking Force     | 600 N         | Axle           | Represents deceleration forces during braking |
| Curb Strike Force | 2000 N        | Axle           | Simulates impact from a curb collision |

Each load case was designed to reflect a realistic riding condition.

---

## Materials

Two materials were evaluated for this study:

### AlSi10Mg Aluminum
- Lightweight  
- Comparable to conventional truck materials  
- Produces thicker structures  

### 17-4 PH Stainless Steel
- Higher strength and stiffness  
- Higher density  
- Produces thinner structures

Material properties significantly influence generative outcomes.

---

## Generative Design Results

### Aluminum Outcome

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b602811869df322f4618689?mode=embed" width="640" height="480" allowfullscreen="true" frameborder="0"></iframe>

<p align="center">
  <img src="/assets/img/aluminum-render.PNG" width="400">
</p>

The aluminum solution produced a more robust structure to compensate for its lower material strength.

---

### Steel Outcome

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b602811d31cba84866ec0e2?mode=embed" width="640" height="480" allowfullscreen="true" frameborder="0"></iframe>

<p align="center">
  <img src="/assets/img/steel-render.png" width="400">
</p>

The steel solution resulted in a thinner geometry with less overall volume due to higher material strength.

---

## Fabrication

The truck hanger was originally intended to be fabricated using nylon powder bed fusion (pSLS). This process is particularly well suited for generative design because it:

- Eliminates the need for support structures
- Produces isotropic mechanical properties
- Accurately captures complex internal geometries

However, due to equipment constraints, the prototype was instead fabricated using PLA filament (FFF) on a Bambu H2C printer.

<p align="center">
  <img src="/assets/img/hanger-print-bed.jpg" width="400">
</p>

This introduced several limitations:
- Required support structures  
- Anisotropic strength  
- Reduced dimensional accuracy for fine features  

---

## Assembly and Testing

<p align="center">
  <img src="/assets/img/printed-truck-alone.jpg" width="350">
  <img src="/assets/img/printed-truck-attached.jpg" width="350">
</p>

The printed hanger was assembled into the longboard system to verify the fit of the pivot and kingpin region, motor mount alignment, and clearance for the pulley and belt components.

### Motion Validation

<p align="center">
  <img src="/assets/img/truck-turning.gif" width="400">
</p>

<p align="center">
  <img src="/assets/img/gear-rotate-gif.gif" width="400">
</p>

Testing confirmed adequate turning clearance and functional motor and belt rotation with no major interference issues.

---

## Discussion

This project demonstrated how generative design can produce components that outperform traditional designs in terms of weight and structural efficiency.

### Key Takeaways

- Load definition is critical
- Material selection strongly influences geometry  
- Manufacturing method affects feasibility and performance

### Generative Design + Powder Bed Fusion

The combination of generative design and powder bed fusion is especially powerful in industries such as aerospace and automotive, where complex geometries and part consolidation can provide significant performance benefits.

In aerospace applications, a well-known example is Airbus’ use of generative design to create lightweight ["bionic partition" structures](https://adsknews.autodesk.com/en/news/autodesk-airbus-generative-design-aerospace-factory/), which significantly reduce preserving strengthaircraft mass while preserving strength. This directly improves fuel efficiency and reduces emissions.

In the automotive industry, similar benefits are targeted in components such as suspension systems and motor mounts, where reducing mass and improving stiffness-to-weight ratio can enhance performance. Generative design enables engineers to distribute material according to expected loads, while powder bed fusion allows these optimized geometries to be manufactured directly. This is particularly useful in [high-performance](https://www.divergent3d.com/applications/automotive/) and low-volume applications such as motorsports and electric vehicles.

### Limitations

- Requires careful setup and validation  
- Results can be difficult to manufacture using traditional methods  
- Interpretation of organic geometry can be non-intuitive  
- Highly dependent on accurate load cases  

---

## Conclusion

Generative design is a powerful tool for producing efficient, lightweight structures in applications where performance and weight are important. However, its effectiveness depends heavily on the accuracy of input assumptions, particularly load cases and constraints. Poor setup can lead to impractical or infeasible designs, and the resulting geometries often require advanced manufacturing methods to be produced effectively. Computational cost can also be significant.

Despite these limitations, generative design is especially valuable in applications where part consolidation, weight reduction, and optimized load paths provide measurable benefits. Although fabrication was performed using FFF due to equipment constraints, this project highlights the advantages of additive manufacturing for producing complex generative geometries in real-world applications.
