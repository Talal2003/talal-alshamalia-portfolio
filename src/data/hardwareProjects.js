export default {
  heading: '/ hardware-projects',
  items: [
    {
      id: 'polarized-window',
      title: 'Automated Polarized Sunlight-Blocking Film System',
      description:
        'A window film system that cuts glare and heat by rolling polarizer segments to different angles, then auto-adjusts from light sensors with a low-power energy-saving mode.',
      image: '/hardware-projects/polarized-window/polarized-window.webp',
      imageAlt: 'Automated polarized sunlight-blocking film system mounted on a window prototype',
      tags: ['Arduino', 'Polarizers', 'BH1750', 'Stepper', 'TB6600', 'Bluetooth'],
      youtubeId: 'https://youtu.be/5rJg1NCwWi4',
      githubUrl:
        'https://github.com/Talal2003/automated_polarized_sunlight-blocking_film_system',
      award: {
        title:
          'Finalist in the Innovation & Product Development Competition at the University of Toledo College of Engineering Senior Design Capstone KEEN Project Competition.',
        image: '/hardware-projects/polarized-window/award.webp',
        imageAlt:
          'Award recognition as a finalist in the University of Toledo College of Engineering Senior Design Capstone KEEN Project Competition',
      },
      overview: [
        'This project is a polarized sunlight-blocking film system for windows that reduces glare and heat while still allowing adjustable light control. One polarizer stays fixed on the window. A second film is mounted on two rollers and is divided into segments oriented at different polarization angles, such as 0°, 30°, 45°, 60°, and 90°. Rolling a specific segment into the light path changes how much sunlight gets through.',
        'Brightness and glare are measured with BH1750 lux sensors. Those readings drive automatic film movement so the window can adapt in real time, even when nobody is home. An Auto Energy-Saving path disables the stepper driver when the system is not moving, and automatic adjustments can be turned off when they are not needed.',
        'The work is an innovation more than a brand-new invention. Polarized films and smart windows already exist. This design combines sensors, automatic roller control, and energy-saving features in one system. Ordinary blinds and curtains block light completely, and many smart-glass options are expensive and power-hungry. This film is a more flexible, lower-power alternative.',
      ],
      details: [
        {
          id: 'polarizers',
          title: 'Polarizers Layers',
          tools: ['Polarizing film', 'Malus’s law', 'Segmented roller layout', 'Physical prototyping'],
          images: [
            {
              src: '/hardware-projects/polarized-window/polarizers-layers-1.webp',
              alt: 'Polarizer layer stack: fixed film on the window with the segmented moving film in front'
            },
            {
              src: '/hardware-projects/polarized-window/polarizers-layers-2.webp',
              alt: 'Segmented polarizer film layout showing the angled bands'
            },
          ],
          paragraphs: [
            'The optical stack uses two polarizer layers. The first is a fixed film on the window. The second is a moving film on a two-roller assembly. Light that passes both layers follows Malus’s law: transmitted intensity falls as the relative polarization angle grows, so crossed segments cut glare and heat while aligned segments keep the room brighter.',
            'The moving film is cut into angular segments rather than using one uniform sheet. Example orientations are 0°, 30°, 45°, 60°, and 90°. Rolling a chosen segment in front of the fixed polarizer sets the tint without fully blocking the view the way blinds or curtains would.',
            'Firmware tracks six indexed segments on the roller. That extra index covers travel between optical bands and a parked position so the motor can land on a known band instead of stopping mid-segment. Layout and cut lines were planned from those angles, then transferred onto the physical film for the prototype.',
          ],
        },
        {
          id: 'circuit',
          title: 'Circuit Diagram',
          tools: ['Fritzing', 'Arduino IDE', 'C++', 'TB6600 stepper driver', 'BH1750 library', 'SoftwareSerial'],
          pdf: '/hardware-projects/polarized-window/circuit-diagram-pinout.pdf',
          pdfLabel: 'Open circuit diagram and pinout PDF',
          images: [
            {
              src: '/hardware-projects/polarized-window/circuit-diagram.webp',
              alt: 'Circuit diagram connecting the Arduino, TB6600 driver, two BH1750 sensors and Bluetooth module'
            },
          ],
          paragraphs: [
            'Control runs on an Arduino-class board. A TB6600 driver handles the stepper, two BH1750 lux sensors sit on I2C, and a ZS-040 Bluetooth module (HC-05 class) takes phone commands. After each move the driver enable line is released so the motor is not held under power.',
            'The pinout below matches the firmware in the GitHub sketch. The schematic PDF is the full circuit diagram and annotated connector map.',
          ],
          pinout: [
            { pin: 'D2', signal: 'DIR', dest: 'TB6600 direction input' },
            { pin: 'D3', signal: 'STEP', dest: 'TB6600 step pulse' },
            { pin: 'D4', signal: 'ENA', dest: 'TB6600 enable (LOW = drive, HIGH = disabled / energy-save)' },
            { pin: 'D10', signal: 'BT RX', dest: 'ZS-040 Bluetooth TX (SoftwareSerial)' },
            { pin: 'D11', signal: 'BT TX', dest: 'ZS-040 Bluetooth RX (SoftwareSerial)' },
            { pin: 'A4 / SDA', signal: 'I2C data', dest: 'BH1750 #1 (0x23) and BH1750 #2 (0x5C)' },
            { pin: 'A5 / SCL', signal: 'I2C clock', dest: 'Shared I2C clock for both lux sensors' },
            { pin: '5V / GND', signal: 'Power / return', dest: 'Logic power for sensors, Bluetooth, and driver interface' },
          ],
        },
        {
          id: 'motor',
          title: 'Motor Rod Gear System',
          tools: ['NEMA stepper (200 steps/rev)', 'TB6600', '32× microstepping', 'Roller / rod / gear train'],
          images: [
            {
              src: '/hardware-projects/polarized-window/motor-rod-gear.webp',
              alt: 'Stepper motor, rod and gear system driving the film rollers'
            },
          ],
          paragraphs: [
            'A stepper motor turns a rod and gear train that drives the two film rollers. The firmware assumes 200 steps per revolution, 32× microstepping, and a cruise speed of 60 RPM. Each film segment is 2450° of motor travel, so the roller winds a long strip of film rather than rotating a single optical disk by a few degrees.',
            'Direction and step pulses come from Arduino pins D2 and D3. The enable pin is held HIGH (driver off) except while stepping, which is the mechanical side of Auto Energy-Saving: the motor is not left in a holding torque all day.',
            'Bluetooth commands UP and DOWN jog about 250° for fine alignment. AUTO maps average lux (0–4000) onto the six segments. MANUAL lets a phone pick a segment index. KILL aborts mid-move and disables the driver immediately.',
          ],
        },
        {
          id: 'frame',
          title: 'Structural Frame',
          tools: ['Autodesk Fusion', 'Plywood', 'Metal mounting clips'],
          images: [
            {
              src: '/hardware-projects/polarized-window/frame.webp',
              alt: 'Finalized and initial versions of the integrated plywood frame housing the rollers, motor, and electronics'
            },
          ],
          paragraphs: [
            'The frame was designed in Autodesk Fusion before any wood was cut. Modeling it first made it possible to check that the rods, gears, couplers, and bearings line up so the film rolls smoothly, and to catch fit problems on screen instead of on plywood.',
            'The model lays out the rod mounting points, the slits for the light sensors, the slots for the metal mounting clips, the electronics compartment, and the power opening below the frame. Wiring paths were planned along the shell so cables stay clear of the rods and gears.',
            'The finished CAD layout served as the reference for cutting and assembling the plywood sections, which were then joined with screws and a nail gun.',
          ],
        },
        {
          id: 'architecture',
          title: 'System Architecture',
          tools: ['Arduino C++', 'EEPROM state', 'Bluetooth command protocol', 'Closed-loop lux control'],
          images: [
            {
              src: '/hardware-projects/polarized-window/system-architecture.webp',
              alt: 'System architecture: sensors to Arduino to stepper driver to rollers, with Bluetooth control'
            },
          ],
          paragraphs: [
            'Sensors feed the microcontroller. The microcontroller decides a target film segment, then the stepper driver and roller mechanics move the moving polarizer. Bluetooth is a parallel control path for AUTO, MANUAL, RESET, KILL, and segment numbers. EEPROM stores the last segment so a reboot does not lose roller position.',
            'In AUTO mode the two BH1750 readings are averaged and mapped to a segment. If the target already matches the current segment, the motor stays off. MANUAL mode stops those automatic moves so the window holds a chosen tint. That is how the system avoids wasting motion when the occupant wants a fixed setting or when automatic updates are not needed.',
            'The unique part of the architecture is the combination: optical control from polarizer angles, automatic sensing, roller actuation, and driver shutdown between moves. Fixed tint and electrochromic glass do not give this mix of real-time adjustment and low idle power.',
          ],
        },
        {
          id: 'github',
          title: 'GitHub Code',
          tools: ['Arduino IDE', 'C++', 'Wire.h', 'BH1750', 'EEPROM', 'SoftwareSerial'],
          githubUrl:
            'https://github.com/Talal2003/automated_polarized_sunlight-blocking_film_system',
          paragraphs: [
            'The public sketch lives in Arduino C++. It initializes both BH1750 sensors in continuous high-resolution mode, restores the last segment from EEPROM, and then either follows lux in AUTO or waits for Bluetooth in MANUAL.',
            'Command set: AUTO, MANUAL, RESET (clear EEPROM and park at segment 0), KILL (stop and disable the driver), UP / DOWN (250° jog in MANUAL), and a numeric segment index 0–6. Motion can be interrupted mid-step if KILL arrives on the serial line.',
            'Libraries used are Wire for I2C, the BH1750 driver, EEPROM for position memory, and SoftwareSerial on pins 10 and 11 for the ZS-040 module at 9600 baud.',
          ],
        },
        {
          id: 'report',
          title: 'Final Report',
          tools: ['Technical writing', 'Capstone documentation'],
          pdf: '/hardware-projects/polarized-window/final-report.pdf',
          pdfLabel: 'Open final report PDF',
          paragraphs: [
            'The final report is the written record of the senior design capstone: problem framing, optical approach, electronics, mechanical roller design, control software, energy-saving behavior, and comparison with blinds, curtains, tint, and smart glass.',
            'It also covers why this is positioned as an innovation on existing polarizer and smart-window ideas, plus the KEEN Innovation & Product Development Competition outcome at the University of Toledo College of Engineering.',
            'Open the PDF for the full write-up, figures, and competition summary.',
          ],
        },
      ],
    },
  ],
}