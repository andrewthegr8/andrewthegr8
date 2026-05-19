# Andrew Jones

**Robotics Engineer • Embedded Systems • Real-Time Control**

> Building reliable autonomous systems through rigorous control design, embedded software optimization, and rapid iteration. Experienced with multi-microcontroller architectures, real-time operating systems, and closing the gap between theory and hardware.

---

## Featured Projects

### 1) Robot Visual Tracking and Communication System *(Master’s Thesis — In Progress)*
- Designed a multi-microcontroller architecture: **Raspberry Pi → ESP32 → STM32** for real-time perception-to-control data flow.
- Defined latency requirements from control constraints with a target of **< 30 ms**.
- Implemented and profiled **SPI, UART, and ESP-NOW** to optimize end-to-end latency (**currently ~50 ms**).
- Identified bottlenecks in the image capture/processing pipeline and developed optimization strategies.
- Built Python-based real-time visualization tools for performance monitoring and debugging.

**Key Skills:** Distributed embedded systems, latency analysis, Python tooling, hardware integration

---

### ⚙️ Autonomous Mobile Robot (2024)
**Challenge:** Design a mobile robot that autonomously navigates a course faster than competing teams while maintaining stable control under sensor noise and model uncertainty.

**Approach:**
- Developed real-time embedded controller in **MicroPython + STM32** with IMU, quadrature encoders, and IR proximity sensors
- Designed state observer and model-based controller for robust autonomous navigation
- Met strict **25 ms** real-time control deadline through profiling and optimization
- **Achieved 2x speedup**: reduced completion time from ~30s to ~15s (fastest of 12 teams) via iterative control tuning

**Key Skills:** Real-time control, state estimation, embedded optimization, sensor fusion

---

### 🤖 3-DOF Robotic Harvester System (Featured)
**Challenge:** Build a 5-motor manipulator arm that executes a complex 24-waypoint task sequence with smooth, repeatable motion. The harvester had to smoothly pick, transport, and release objects—no jerky movements.

**Approach:**
- Implemented full control stack in **Python (Raspberry Pi)**: cubic spline trajectory generation, cascaded PI/PID motor controllers, real-time encoder feedback
- Debugged motor instability via oscilloscope analysis; traced root cause to software-timed PWM
- Switched to **DMA-based PWM** to eliminate jitter and stabilize closed-loop performance
- Performed DH-parameter kinematic modeling and empirically tuned control gains for 5 heterogeneous motors (3 linear + 2 rotational)

**Result:** Deterministic 24-waypoint sequence with smooth 3-6s transitions, logged all telemetry to CSV for post-analysis

**Key Skills:** Real-time embedded control, trajectory planning, hardware debugging, closed-loop system design

[→ View full case study with control flow diagrams](harvester.html)

---

### 🏆 Battle Bot Team Lead (250-lb Combat Robot)
**Challenge:** Lead design and integration of a 250-pound autonomous combat robot across mechanical and electrical subsystems in a competitive team environment.

**Approach:**
- Owned system-level architecture and cross-functional coordination between 15+ team members
- Conducted trade studies for drivetrain (speed vs. torque) and weapon (reliability vs. power) under weight/power budget constraints
- Defined team vision, execution milestones, and manufacturing workflows
- Improved design manufacturability through CAD validation and optimized machining sequences for complex components

**Result:** Delivered functional robot on schedule; competed in official BattleBots competition

**Key Skills:** Systems engineering, team leadership, design tradeoffs, manufacturing process optimization

---

## Technical Focus

| Domain | Technologies & Concepts |
|--------|------------------------|
| **Real-Time Control** | Embedded PID/PI loops, trajectory planning, state feedback, control gain tuning |
| **Embedded Systems** | STM32, Raspberry Pi, MicroPython, bare-metal C, real-time constraints |
| **Robotics** | Forward/inverse kinematics, DH parameters, encoder feedback, motor control, sensor fusion |
| **Communication** | SPI, UART, ESP-NOW, GPIO timing, interrupt-driven I/O |
| **Debugging & Profiling** | Oscilloscope analysis, latency profiling, CSV logging, Python visualization tools |
| **Software** | Python, C, numpy/scipy, git version control |

---

## Repository Structure

```
website/              # Portfolio site (GitHub Pages)
├── harvester.html    # 3-DOF harvester case study with control flow diagrams
├── index.html        # Portfolio home
├── styles.css        # Shared styling
└── 3-DOF/            # Project artifacts (PDFs, videos, images)
```

**To run locally:** This is a static site—open `index.html` in your browser or deploy via GitHub Pages.

---

## Quick Links

- **Case Studies**: [3-DOF Harvester Control System](harvester.html)
- **Repository**: This GitHub Pages site
- **Academic Work**: See project reports and presentations in individual case studies
