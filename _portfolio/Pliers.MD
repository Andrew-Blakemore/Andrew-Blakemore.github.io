---
title: "Print-in-Place Pliers"
excerpt: "Functional multi-material pliers that work immediately after removal
from the print bed."
header:
  teaser: /assets/img/pliers_cover.jpg
gallery:
  - url: /assets/img/syringe_compare.png
    image_path: assets/img/syringe_compare.png
    alt: "Completed syringe pump and its CAD model"
  - url: /assets/img/syringe_electrical.jpg
    image_path: assets/img/syringe_electrical.jpg
    alt: "Electrical schematics of the syringe pump"

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---
## About Print-in-Place Parts
{: .visually-hidden }

Print-in-place (PIP) parts are additively manufactured assemblies that emerge from the printer fully functional, requiring no post-print assembly. By strategically designing clearances, joints, and interfaces, multiple moving components can be fabricated concurrently in a single print. This approach reduces assembly time and part count, and enables mechanisms that would be difficult to produce using traditional manufacturing methods.

Print-in-place techniques have been widely used across a range of applications, including [hinges](https://www.youtube.com/watch?v=BWsUk1xSSn4), [articulated toys](https://www.printables.com/model/538160-articulated-bone-dragon), [gears](https://www.printables.com/model/319669-print-in-place-3-in-1-planetary-gears), and functional tools such as [clamps](https://www.printables.com/model/343921-ratchet-clamp-print-in-place). In engineering and prototyping contexts, PIP designs are especially valuable for rapid iteration, allowing designers to test mechanical concepts directly off the print bed.

Material selection plays an important role in print-in-place designs, especially when motion or load transfer is involved. Common single-material solutions include PLA and PETG due to their dimensional stability and ease of printing, while nylon offers improved toughness and wear resistance for moving components. In multi-material print-in-place applications, combining rigid materials (such as PLA, PETG, or nylon) with flexible elastomers (such as TPU) enables integrated compliance, grip surfaces, and return mechanisms.

Building on these principles, the following project explores the design and fabrication of a multi-material print-in-place pliers mechanism.

## Iterative Process
This process was complicated.....

![Iteration 1](/assets/img/it_1.jpg)
![Iteration 1 stagger](/assets/img/stagger.jpg)
![Iteration 2](/assets/img/it_2.jpg)
![Printed pliers opening and closing](/assets/img/pliers_working.gif)
![Iteration 2 application](/assets/img/bit.jpg)


## Off-the-Shelf Components

| Component | Description |
|----------|-------------|
| Arduino Uno | Microcontroller for motor control and user interface |
| NEMA-17 Stepper Motor | Drives linear motion through lead screw |
| Stepper Motor Driver | Controls microstepping and motor current |
| Lead Screw & Brass Nut | Converts rotational motion to linear motion |
| LM8UU Linear Bearings | Guides carriage along linear rods |
| Aluminum Extrusion | Structural rail for motion system |
| Limit Switch | Detects end of syringe travel |
| Latching Pushbutton | Start / pause control |
| RGB LED | System status indicator (run / pause / empty) |
| External Power Supply | Provides power to motor and electronics |

## Fabricated Components (3D Printed)

| Part | Material | Function |
|------|----------|----------|
| Syringe Holder | PLA | Secures 10 mL and 20 mL syringe barrels |
| Plunger Carriage | PLA | Transfers linear force to syringe plunger |
| Electronics Housing | PLA | Protects wiring and control electronics |
| Rail Supports | PLA | Stabilize linear motion system |
| Motor Mount | ABS | Heat-resistant mount for stepper motor |

## Operating Instructions

1. Ensure all components are dry and disconnected from power.
2. Upload the Arduino code with the correct syringe size and flow rate.
3. Disconnect the USB cable and connect the external power supply.
4. Adjust the limit switch position for the selected syringe size.
5. Use the forward and backward controls to position the syringe holder.
6. Secure the filled syringe in the holder.
7. Press the **Start** button to begin pumping.

**RGB LED Status Indicators:**
- **Green**: Running
- **Yellow**: Paused
- **Red**: Syringe empty / limit reached

## Interactive CAD Model

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b602811fa450a2d4a33e1d1?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

## Arduino Code

The Arduino script converts a user-defined volumetric flow rate into a motor step rate using syringe diameter, lead screw pitch, and microstepping configuration. Global variables allow easy adjustment for syringe size and desired flow rate.

**[View Arduino Code on GitHub](https://github.com/Andrew-Blakemore/automated-syringe-pump)**

{% include gallery caption="The completed syringe pump alongside its CAD model (left), with the corresponding electrical schematic diagram shown on the right." %}
