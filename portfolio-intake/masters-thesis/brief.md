# Portfolio Brief: Real-Time Localization Infrastructure for Differential-Drive Robots

## Project title options

Preferred title:

**Real-Time Localization Infrastructure for Differential-Drive Robots**

Other acceptable options:

- External Localization System for Mobile Robots
- Real-Time Pose Estimation and Communication System for Mobile Robots
- Camera-Based Localization and Wireless Pose Feedback for Differential-Drive Robots

Avoid titles that make the project sound primarily like a computer vision specialization project, such as "Computer Vision Pose Estimation with ArUco Markers," unless used only as a technical subtitle.

## Project type

Master's thesis project.

## Team size

Solo project. I was the only person who worked on the project.

## Portfolio positioning

Frame this project as a robotics systems, localization, pose-estimation, coordinate-transformation, embedded communication, and experimental validation project.

The project uses computer vision, OpenCV, ArUco markers, and PnP, but the portfolio page should not position me primarily as a computer vision engineer. The broader robotics value is more important: building infrastructure that allows mobile robots to estimate pose, communicate pose data, and operate within a shared world frame.

## Target roles

This project should support applications for roles in:

- Robotics engineering
- Mechatronics
- Mobile robotics
- Robot localization
- Controls-adjacent systems work
- Embedded robotics systems
- Robotics test and validation
- Systems integration
- Mechanical engineering roles involving robotics or automation

## One-sentence summary

Developed and tested a real-time external localization and wireless communication system that estimates differential-drive robot poses using fixed visual markers and relays pose information to individual robots.

## Short portfolio summary

This project explored external localization infrastructure for differential-drive robots by combining a fisheye camera, fixed ArUco reference markers, robot-mounted markers, coordinate-frame transformations, and wireless communication. The system estimated robot pose in a world coordinate frame and transmitted pose data to individual robots using a multi-microcontroller architecture based on ESP-NOW. Static pose estimates showed accurate results compared to ground truth, while moving-robot tests revealed important limitations that would need to be addressed in future work.

## What to emphasize

Emphasize these themes:

- Robotics system integration
- Differential-drive robot localization
- Real-time pose estimation
- Coordinate-frame transformations
- World-frame robot pose data
- External localization infrastructure
- Embedded wireless communication
- ESP-NOW communication architecture
- Multi-microcontroller system design
- Experimental validation
- Static versus dynamic test performance
- Honest analysis of system limitations
- Lessons learned from integrating perception-derived pose data with physical robot motion

## What not to over-emphasize

Do not over-emphasize:

- Computer vision as my desired career direction
- OpenCV implementation details beyond what is necessary
- ArUco marker detection as the main point of the project
- PnP math as the main story
- Camera calibration theory unless it directly supports the robotics system explanation

Computer vision should be presented as one subsystem within a larger robotics localization and communication pipeline.

## My role

I independently developed and tested the full thesis project. My work included developing the pose estimation pipeline, implementing the coordinate transformation approach, integrating the localization system with differential-drive robots, designing and testing the wireless communication architecture, analyzing static and dynamic pose-estimation performance, and documenting the results in the thesis report and defense presentation.

## System overview

The system used a single camera with a fisheye lens to observe ArUco markers placed at fixed known locations and attached to mobile robots. OpenCV was used to detect the markers and solve the Perspective-n-Point problem, enabling image-frame detections to be transformed into world-frame pose estimates.

An analytical approach was developed to estimate robot poses based on a single PnP solution rather than solving the PnP problem separately for each pose estimate. This was intended to reduce repeated computation and support real-time operation.

Pose information was transmitted to individual differential-drive robots using a multi-microcontroller architecture that leveraged the ESP-NOW wireless protocol.

## Core technical areas

### Robotics and localization

- Differential-drive mobile robots
- External localization
- World-frame pose estimation
- Pose feedback for robot systems
- Odometry comparison
- Static and dynamic validation

### Computer vision subsystem

- Fisheye camera
- ArUco markers
- OpenCV
- Perspective-n-Point pose estimation
- Marker-based reference frame estimation

### Embedded and communication subsystem

- ESP-NOW wireless protocol
- Multi-microcontroller communication architecture
- Pose data transmission to individual robots

### Analysis and validation

- Ground truth comparison for static objects
- Odometry comparison for moving robot tests
- Projection error analysis
- Timing and performance analysis
- Evaluation of system limitations

## Key engineering decisions to highlight

1. **External localization architecture**

   The system used an external camera-based localization setup to estimate robot pose in a shared world frame, rather than relying only on onboard odometry.

2. **Fixed visual reference markers**

   Fixed ArUco markers provided known world-frame references for estimating camera pose and transforming robot marker detections into world-frame coordinates.

3. **Single-camera fisheye setup**

   A fisheye lens allowed a larger workspace to be observed with one camera, reducing hardware complexity while introducing calibration and distortion considerations.

4. **Analytical pose-estimation approach**

   The project presented an analytical method for estimating robot poses based on a single PnP solution rather than solving PnP for every individual pose estimate.

5. **ESP-NOW communication**

   The system used ESP-NOW to relay pose information to individual robots through a multi-microcontroller architecture, supporting efficient wireless communication without relying on a conventional Wi-Fi network.

6. **Static and moving robot validation**

   The project separately evaluated static pose accuracy and moving robot performance, making the results more honest and useful for future robotics development.

## Results framing

Use this framing:

- Static pose estimates from the CV algorithm produced accurate results compared to ground truth values.
- The system validated the camera-based localization approach as a viable source of pose data under static conditions.
- The ESP-NOW wireless communication system was verified as reliable and efficient for relaying pose information to individual robots.
- When integrated with a moving robot, the camera-based pose estimates deviated significantly from odometry-based values.
- The dynamic results should be presented as an important engineering finding, not hidden or overstated.
- Future work should focus on improving dynamic pose accuracy, synchronization, calibration, error characterization, and validation across additional trajectories.

## Claims to avoid

Do not claim:

- The system fully solved mobile robot localization.
- Moving robot pose estimates were highly accurate.
- The system was production-ready.
- The robot localization was robust under all conditions.
- The project proves expertise specifically in computer vision as a target career direction.
- Accuracy, latency, update rate, packet loss, reliability, or runtime numbers unless they are directly supported by the thesis, plots, or slides.
- Autonomous robot behavior unless the thesis clearly describes the relevant closed-loop behavior.

## Preferred language

Use language like:

- "external localization infrastructure"
- "robot pose estimation"
- "world-frame coordinates"
- "differential-drive robot localization"
- "real-time pose feedback"
- "wireless communication architecture"
- "robotics system integration"
- "experimental validation"
- "static accuracy and dynamic limitations"

Avoid language like:

- "computer vision expert"
- "fully autonomous localization system"
- "highly accurate moving robot localization"
- "production-ready tracking system"
- "solved real-time robot localization"

## Available source files and assets

The intake folder contains:

- `thesis.pdf`
- `assets/diagrams/esp-receiver.svg`
- `assets/diagrams/esp-transmitter.svg`
- `assets/diagrams/mcu_architecture.svg`
- `assets/images/esp32-dev-board.jpg`
- `assets/images/offset-stand.jpg`
- `assets/images/romi-test-drive.jpg`
- `assets/images/romilabeled.jpg`
- `assets/images/rpi4b.jpg`
- `assets/images/stand.jpg`
- `assets/plots/DifferencesvsTime1.pdf`
- `assets/plots/DifferencesVelocity.pdf`
- `assets/plots/PiTiming.pdf`
- `assets/plots/ProjectionError2.pdf`
- `report/`
- `slides/`

The agent should inspect the thesis and assets before deciding which visuals belong on the final page.

## Recommended visuals for the final page

Strong candidates include:

- Robot platform photo
- Labeled robot image
- Camera or stand setup image
- MCU architecture diagram
- ESP receiver/transmitter diagrams
- Static pose accuracy plot
- Moving robot comparison plot
- Timing or performance plot
- Projection error plot

The final page should include at least one system-level diagram or architecture figure, not only photos or plots.

## Missing details to extract or confirm

The agent should look for these in the thesis and slides:

- Programming languages used
- Robot platform details
- Hardware components
- Camera model, if relevant
- Microcontrollers used
- Update rate, timing, or latency results
- Static accuracy results
- Dynamic test results
- Communication reliability details
- Number of trials or test conditions
- Any useful quantitative results that can be safely included
- Whether a demo video exists or should be added later

If any of these are not clearly supported by the source files, mark them as TODO rather than guessing.