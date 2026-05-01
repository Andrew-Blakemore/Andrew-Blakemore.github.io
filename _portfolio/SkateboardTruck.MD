---
title: "Generative Design Skateboard Truck Hanger"
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

This project explores the use of **generative design** to develop a lightweight skateboard truck hanger with an integrated motor mount for an electric longboard. The goal was to consolidate multiple functional components into a single, optimized structure capable of withstanding realistic loads while minimizing mass.

Unlike traditional CAD workflows, generative design produces geometry based on constraints, loads, and material properties. This makes it particularly effective for components like a truck hanger, where complex load paths and multiple functional requirements intersect.

---

## Background

The skateboard truck hanger is the primary structural element connecting the wheels to the board. It transmits forces from the rider during **riding, turning, and braking**, while rotating about the kingpin through compressible bushings to enable steering.

In a conventional setup:
- The hanger is typically **cast aluminum**
- The axle is a **press-fit steel rod**
- The motor mount is a **separate attachment**

In this project, the hanger and motor mount were combined into a **single generatively designed component**, improving load transfer and reducing part count.

---

## Design Objectives

- Minimize mass while maintaining structural integrity  
- Maintain a **minimum safety factor of 2**  
- Integrate the **motor mount into the hanger**  
- Preserve all critical functional interfaces  
- Ensure compatibility with the pulley system and assembly constraints  

The study used an **unrestricted manufacturing setting** to allow maximum geometric freedom.

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
- The kingpin region was treated as a **fixed support**
- The axle ends, motor mount, and pivot were allowed to respond to loads

### Load Cases

Six meaningful load cases were defined:

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

The aluminum solution produced a more **robust structure** to compensate for lower material strength.

---

### Steel Outcome

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b602811d31cba84866ec0e2?mode=embed" width="640" height="480" allowfullscreen="true" frameborder="0"></iframe>

<p align="center">
  <img src="/assets/img/steel-render.png" width="400">
</p>

The steel solution resulted in a **thinner geometry** with less overall volume due to higher material strength.

---

## Fabrication

The truck hanger was originally intended to be fabricated using **nylon powder bed fusion (pSLS)** due to its ability to produce complex geometries without support structures and with isotropic mechanical properties. This process is particularly well-suited for generative design because it:

- Eliminates the need for support structures  
- Produces **uniform strength in all directions**  
- Accurately captures complex internal geometries  

However, due to **equipment constraints**, the prototype was instead fabricated using PLA filament (FFF) on a Bambu H2C printer.

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

Testing confirmed that the part allowed for adequate **turning clearance** and functional **motor and belt rotation** with no major interference issues.  

---

## Discussion

This project demonstrates how generative design can produce components that outperform traditional designs in terms of weight and structural efficiency.

### Key Takeaways

- **Load definition is critical**
- **Material selection strongly influences geometry**  
- **Manufacturing method affects feasibility and performance**  

### Generative Design + Powder Bed Fusion

The combination of generative design and powder bed fusion is especially powerful in industries such as aerospace and automotive, where:

- Weight reduction is critical  
- Complex geometries are acceptable  
- Part consolidation reduces assembly complexity  

A well-known example is Airbus’ use of generative design to create lightweight "bionic partition" structures, which significantly reduces aircraft mass while maintaining strength.

### Limitations

- Requires careful setup and validation  
- Results can be difficult to manufacture using traditional methods  
- Interpretation of organic geometry can be non-intuitive  
- Highly dependent on accurate load cases  

---

## Conclusion

The generative design skateboard truck hanger demonstrates the potential of computational design tools to create **lightweight, performance-optimized components**. By integrating multiple functions into a single optimized geometry, the design reduces part count and improves structural efficiency.

Although fabrication was performed using FFF due to constraints, this project highlights the advantages of using **powder-based additive manufacturing** to fabricate complex generative geometries in real-world applications.
