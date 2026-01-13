---
title: "Syringe Pump"
excerpt: "A low-cost, programmable syringe pump capable of accurate flow control for 10 mL and 20 mL syringes."
header:
  image: /assets/img/Cyber-Scooter-Banner.jpg
  teaser: /assets/img/Cyber-Scooter-TH.jpg
gallery:
  - url: /assets/img/Cyber-Scooter-1.jpg
    image_path: assets/img/Cyber-Scooter-1.jpg
    alt: "placeholder image 1"
  - url: /assets/img/Cyber-Scooter-2.jpg
    image_path: assets/img/Cyber-Scooter-2.jpg
    alt: "placeholder image 2"
  - url: /assets/img/Cyber-Scooter-3.jpg
    image_path: assets/img/Cyber-Scooter-3.jpg
    alt: "placeholder image 3"

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---
# Purpose
{: .visually-hidden }

Commercial syringe pumps are widely used in clinical and laboratory settings, but their high cost can limit accessibility despite relying on relatively simple mechanical and electrical principles. For this project, I set out to design and fabricate a low-cost, programmable syringe pump using additive manufacturing and embedded control. The goal was to create a device capable of delivering precise, non-pulsatile flow while remaining adaptable to different syringe sizes and easy to modift. By combining CAD design, FFF 3D printing, stepper motor driven linear actuation, and Arduino-based control, I developed a fully functional pump conpatible with both 10 mL and 20 mL syringes. The final design integrates user controls, visual status feedback, and enclosed electronics.

# Key Features
* Compatibility with 10 mL and 20 mL syringes
* Stepper motor driven lead screw for smooth, precise actuation
* Adjustable limit switch to prevent excess compression/decompression
* Start/pause control with visual status feedback (RGB LED)
* Enclosed electronics designed to protect against liquid exposure
* Fully 3D printed structural components with no adhesive bonding

# Off-the-Shelf Components

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

# Fabricated Components (3D Printed)

| Part | Material | Function |
|------|----------|----------|
| Syringe Holder | PLA | Secures 10 mL and 20 mL syringe barrels |
| Plunger Carriage | PLA | Transfers linear force to syringe plunger |
| Electronics Housing | PLA | Protects wiring and control electronics |
| Rail Supports | PLA | Stabilize linear motion system |
| Motor Mount | ABS | Heat-resistant mount for stepper motor |

# Operating Instructions

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

# Interactive CAD Model

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b6028110139d5f29dd51f97?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

**[View Arduino Code on GitHub](https://github.com/Andrew-Blakemore/automated-syringe-pump)**

{% comment %}
{% include gallery caption="This is a sample gallery to go along with this case study." %}
{% endcomment %}
