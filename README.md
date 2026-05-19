# Andrew Jones

**Robotics Engineer • Embedded Systems • Real-Time Control**

I build robotic systems that connect control theory, embedded software, sensors, and hardware debugging. My work focuses on reliable motion, real-time performance, and practical implementation on physical machines.

## Featured Projects

### Autonomous Mobile Robot (2024)

Built and tuned a differential-drive Romi robot for fast, reliable autonomous course navigation. The project combined real-time embedded control, state estimation, sensor integration, telemetry tooling, and iterative controller tuning on physical hardware.

- Developed STM32/MicroPython firmware for autonomous navigation using encoder, IMU, reflectance-array, bump, and proximity-sensor feedback.
- Implemented observer-based state estimation for wheel motion, heading, and robot pose.
- Designed heading and speed control logic for waypoint navigation, including speed reduction for large heading errors and controlled deceleration near targets.
- Streamed Bluetooth telemetry to a PC interface for live monitoring of predicted versus actual wheel velocity, pose, heading, control signals, and path data.
- Built logging and plotting tools that exported CSV data and generated run-analysis plots for velocity tracking, setpoint timing, and XY path performance.
- Used iterative tuning and test data to reduce course completion time from roughly 30 seconds to roughly 15 seconds.

**Key skills:** autonomous navigation, state estimation, heading control, speed control, live telemetry, embedded optimization, sensor fusion

[View the autonomous mobile robot documentation](https://term-project-me-405.readthedocs.io/en/latest/index.html)

---

### 3-DOF Robotic Harvester System

Built the control stack for a 5-motor manipulator that executed a 24-waypoint pick, transport, and release sequence with smooth, repeatable motion.

- Implemented cubic-spline trajectory generation, cascaded PI/PID motor controllers, and real-time encoder feedback in Python on a Raspberry Pi.
- Diagnosed motor behavior that could not be corrected through controller tuning alone.
- Used an oscilloscope to compare requested PWM against the actual motor-control signal.
- Identified a duty-cycle mismatch caused by the software-timed PWM library, switched libraries, verified the corrected signal, and deployed the fix.
- Performed DH-parameter kinematic modeling and tuned control gains for heterogeneous linear and rotational actuators.

**Result:** completed a deterministic 24-waypoint sequence with smooth transitions and CSV telemetry logging for post-run analysis.

**Key skills:** embedded control, trajectory planning, oscilloscope debugging, PWM generation, closed-loop motor control

[View the full harvester case study](harvester.html)

---

### Robot Visual Tracking and Communication System *(Master's Thesis — In Progress)*

Designed a distributed embedded architecture for real-time perception-to-control data flow across a Raspberry Pi, ESP32, and STM32.

- Defined latency targets from control-loop requirements, with an initial goal below 30 ms.
- Implemented and profiled SPI, UART, and ESP-NOW communication paths.
- Measured end-to-end latency and identified bottlenecks in image capture, processing, and packet transfer.
- Built Python visualization tools for monitoring timing behavior during development.

**Key skills:** distributed embedded systems, latency analysis, communication protocols, Python tooling, hardware integration

---

### Battle Bot Team Lead — 250-lb Combat Robot

Led system-level design and integration for a 250-lb combat robot across mechanical, electrical, and manufacturing workstreams.

- Coordinated architecture and integration across a multidisciplinary team.
- Evaluated drivetrain and weapon tradeoffs under weight, power, reliability, and manufacturability constraints.
- Set execution milestones for design review, manufacturing, assembly, and testing.
- Improved manufacturability through CAD review and machining-sequence planning.

**Key skills:** systems engineering, design tradeoffs, team leadership, manufacturing process planning

## Technical Focus

| Domain | Technologies and Concepts |
|--------|---------------------------|
| Real-Time Control | PID/PI loops, trajectory planning, state feedback, observer design, gain tuning |
| Embedded Systems | STM32, Raspberry Pi, MicroPython, C, real-time constraints |
| Robotics | Kinematics, encoder feedback, motor control, sensor fusion, autonomous navigation |
| Communication | SPI, UART, ESP-NOW, GPIO timing, interrupt-driven I/O |
| Debugging and Profiling | Oscilloscope analysis, latency profiling, CSV logging, Python visualization tools |
| Software | Python, C, NumPy/SciPy, Git |

## Links

- Portfolio site: [index.html](index.html)
- Harvester case study: [harvester.html](harvester.html)
- Autonomous mobile robot documentation: [Read the Docs](https://term-project-me-405.readthedocs.io/en/latest/index.html)
- Email: [andrewmj@outlook.com](mailto:andrewmj@outlook.com)
- LinkedIn: [linkedin.com/in/andrew-jones-aa05802b1](https://www.linkedin.com/in/andrew-jones-aa05802b1/)

## Local Preview

This is a static portfolio site. Open `index.html` in a browser or serve the folder with a local static server before publishing with GitHub Pages.
