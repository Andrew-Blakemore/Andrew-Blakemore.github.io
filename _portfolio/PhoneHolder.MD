---
title: "Top-Down Modeling: Bike Phone Holder"
excerpt: "A top-down modeled, filament-printed phone holder designed to mount securely to bicycle handlebars and rotate between portrait and landscape orientations."
header:
  image: /assets/img/phone_holder_present.jpg
  teaser: /assets/img/phonr-holder-placeholder.jpg

toc: true
toc_label: "Table of Contents"
toc_sticky: true
toc_icon: bars
---

## About Top-Down Modeling
{: .visually-hidden }

Top-down modeling is a CAD workflow in which a design is developed by referencing shared geometry from a higher-level assembly or master layout. Rather than designing each component in isolation, the major interfaces are established first and then used to drive the dimensions and relationships of the individual parts. This approach is especially useful when several components must fit together precisely while remaining parametric and easy to revise.

For this project, the top-down workflow was used to develop a phone holder that mounts to bicycle handlebars and supports quick orientation changes between portrait and landscape modes. The assignment required a functional printed model, at least three individually modeled components, and a detent mechanism that produces a noticeable click when the phone rotates into position. The supplied handlebars included a 25.4 mm clamp diameter and a 22.2 mm grip diameter, which provided the reference geometry for the mounting interface.

## Project Overview

The goal of this project was to design a phone holder that could be attached to a bike without requiring tools for routine use. Once mounted, the holder needed to grip the phone securely, resist vibration, and allow rotation between portrait and landscape orientations. Because the phone and handlebar interfaces were the most important design constraints, the holder was modeled around those fixed reference components from the start.

The final concept was built as a set of components assembled in place using a top-down approach. This made it possible to maintain alignment between the bike mount, the rotating phone cradle, and the detent features that define each locking position. The workflow also made later adjustments easier, since changes to one interface could propagate through the rest of the model.

## Design Requirements

The assignment emphasized several practical constraints that shaped the geometry of the holder. The design needed to be compatible with a range of phone sizes, attach quickly without separate tools, and remain stable under road vibration. It also needed to use a detent mechanism with enough holding force to prevent accidental rotation while still allowing the phone to move deliberately between orientations.

## Design Approach

The design began by creating the handlebar geometry in a dedicated component and anchoring it as the fixed reference. A phone model was then imported and positioned at a viewing angle that would be comfortable for a rider. These two reference parts defined the envelope for the holder, the placement of the rotating joint, and the allowable range of motion.

From there, the mount, rotating cradle, and phone-retaining features were modeled as separate components. This separation made it easier to manage fit, clearances, and assembly order while keeping the design fully parametric. The top-down method also helped ensure that the holder remained aligned to the handlebar axis and that the phone stayed centered through rotation.

## Iteration 1

The first prototype was printed in **PLA** and consisted of **six components**. Two of those pieces formed the handlebar mount: one part was a semi-circle attached to a plate with a circular cutout, and the second was a matching semi-circle on the opposite side of the handlebar. Together, these parts supported the bike attachment and created the outer frame of the holder.

The phone cradle itself was a separate plate with a lip at the bottom to support the phone. The back of this plate included two hollow rail passages and a circular extrusion with eight notch-like cutouts around its edge. That circular feature inserted into the circular cutout in the mating part and formed the basis of the detent mechanism. A spring and ball bearing were placed in the interface so the ball seated into the eight cutouts and produced discrete rotation positions.

Two additional side guard pieces were also printed, one on each side of the phone plate. Their purpose was to secure the phone laterally. Each guard had a long rail that was meant to slide through the tunnel-like passages on the back of the main phone plate.

Mechanical fastening relied on heat-set inserts and bolts:
- **Four M5 heat inserts** were placed into the edge of the first semi-circular mount piece
- **M5 bolts** passed through the second semi-circular mount piece to clamp the holder to the handlebar
- **Two M5 heat inserts** were placed in the center of the circular extrusion on the back of the phone holder
- A disc-shaped back cover was bolted into those inserts to retain the detent spring and ball bearing
- **M3 heat inserts** were added to the top and bottom of each side guard
- **M3 bolts** were used to compress springs between the guards, creating the force that held the phone in place

This first version showed that the detent mechanism worked very well. The rotation felt positive, and the ball-and-spring system produced a clear click between positions. The main issue was that the side guard rails were too wide to fit into the tunnels on the back of the phone plate, so the guards could not actually be attached. The overall assembly was also relatively large and bulky.

## Iteration 2

The second prototype was printed in **PETG** and simplified the overall assembly. The most important change was reducing the number of parts by combining the two semi-circular handlebar pieces into a single clamp component. This new mount included an opening with a **2 mm gap**. Two M5 heat inserts were placed on one side of the gap, and bolts passed through the opposite side to create a clamping mechanism around the handlebar.

This version also corrected the earlier rail issue: the side guards now fit into the tunnels on the back of the phone holder. That was an improvement over the first design, since the guards could finally do their job of stabilizing the phone.

However, PETG introduced a new problem. The detent pieces fit together, but the rotation was not as smooth as expected. The most likely cause was print expansion and tolerance shift during fabrication, which tightened the fit more than intended. As a result, the motion became harder to turn and the detent mechanism lost some of the crisp feel that the PLA prototype had achieved.

Even with that drawback, the second iteration was an important refinement. It reduced complexity, improved the handlebar attachment method, and demonstrated that the design could be made more compact while preserving the core mechanism.

## Detent Mechanism

A detent mechanism was incorporated to lock the phone into defined orientations. In this type of interface, a spring-loaded element engages with a notch or recess, creating a tactile click at each stable position. The assignment specifically called for a noticeable click when switching between portrait and landscape orientations, so the detent geometry was treated as a critical functional feature rather than a cosmetic detail.

The detent dimensions were parameterized so that the engagement force could be adjusted if the printed parts were too loose or too stiff. That flexibility is important in filament printing because clearance, surface finish, and layer adhesion can all affect how smoothly a rotating mechanism behaves. In practice, this made the detent one of the most important features to prototype early and refine through iteration.

## CAD Modeling Workflow

The model was created using a hybrid top-down design strategy. Each major part was built as its own component, with sketches and features confined to the correct body in the browser. This avoided the common problem of treating one large assembly as a single part and made the design easier to edit, inspect, and manufacture.

Projected geometry was used selectively to maintain alignment between the phone, the mount, and the rotation mechanism. Because projected references can break when upstream geometry changes, the final model was cleaned up to preserve a stable parametric structure. This kept the CAD tree organized and reduced the risk of broken dependencies during later revisions.

## Geometric Specifications

| Specification | Value |
|--------------|--------|
| Mounting Reference | Bike handlebar |
| Clamp Diameter | 25.4 mm |
| Grip Diameter | 22.2 mm |
| Orientation Modes | Portrait / Landscape |
| Rotation Feature | Detent-based indexing |
| Minimum Main Components | 3 |

*Final dimensions were selected to match the supplied handlebars and provide enough clearance for reliable printing and assembly.*

## Design Calculations & Justification

*This section will include the specific reasoning behind the final geometry, supported by calculations and design tradeoffs.*

*(To be completed.)*

## Fabrication Process

The holder was fabricated using filament 3D printing. This choice was appropriate because the part needed to be structurally robust, relatively quick to iterate, and suitable for repeated assembly and disassembly. All printing was done on **Voron printers**, which made it practical to produce multiple prototypes and refine clearances between iterations.

### Individual Components

The design was divided into separate printed parts so each one could be optimized for its specific role:
- handlebar clamp or base
- rotating phone holder body
- detent or indexing component
- phone contact or retention features

This modular approach made the assembly easier to troubleshoot and allowed the rotation mechanism to be tuned independently from the mounting structure.

## Assembly and Use

The holder was assembled around the handlebar reference geometry and secured using the designed clamp interface. Once mounted, the phone could be inserted into the cradle and rotated between orientations until the detent engaged. The goal of the final assembly was to create a stable, repeatable motion with enough holding force to resist vibration during riding.

## CAD Models

### Iteration 1

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b60281156d3ea2f66e9947f?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

### Iteration 2

<iframe src="https://vanderbilt643.autodesk360.com/shares/public/SH90d2dQT28d5b602811fe4660540281e9fc?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

## Testing and Iteration

Testing focused on three questions: whether the mount fit the handlebar correctly, whether the phone remained secure during vibration, and whether the detent produced a clear and reliable click between positions. Because printing tolerances can affect both grip and rotation, the mechanism was designed to be adjustable through parameter changes rather than rebuilt from scratch each time.

If the fit was too tight, the clearances around the rotation joint could be increased. If the detent was too weak, spring preload or notch depth could be adjusted. If the parts flexed too much, the wall thickness or material choice could be revised in a later print.

## Discussion

This project showed how top-down modeling can simplify the development of a multi-part mechanism. By defining the handlebar and phone as reference geometry first, the rest of the design could be built around real functional constraints instead of guessed dimensions. That made it easier to keep the mount aligned, the rotation axis centered, and the detent positions consistent.

The assignment also reinforced the importance of designing for the manufacturing process. Filament printing is excellent for rapid iteration, but tolerances, layer direction, and material stiffness all influence how a small mechanism behaves. A successful holder therefore depends not only on the CAD model, but also on how well the design accounts for printability and real-world use.

## Multimedia

*To be added:*
- PHOTOS
- Photo of the holder mounted on bike handlebars
- GIF of the phone rotating between portrait and landscape
- Fusion rendering of the full assembly
- Cross-section view of the detent mechanism
- Images of individual top-down components
