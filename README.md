# Transit Stringline Diagram Generator

[![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/shivrajsinhzala/transit-stringline-diagram-generator/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Visualization: SVG](https://img.shields.io/badge/Visualization-SVG_Marey_Chart-blueviolet.svg)](https://headway.shivrajsinh.in)
[![Transit Engine](https://img.shields.io/badge/Ecosystem-Headway_&_Stopwatch-orange.svg)](https://headway.shivrajsinh.in)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/shivrajsinhzala/transit-stringline-diagram-generator/pulls)

> High-performance SVG stringline chart renderer (Marey time-distance diagrams) for corridor timetables, train dispatching, headway conflict detection, and transit network planning.

---

## 📈 What is a Marey Stringline Diagram?

Invented by French polymath Étienne-Jules Marey in 1885 for the Paris-Lyon railway, a **stringline diagram** plots time along the horizontal axis and station distances along the vertical axis.
- **Lines**: Each line represents the trajectory of an individual train or bus.
- **Slope**: Indicates vehicle travel speed ($v = \Delta \text{distance} / \Delta \text{time}$).
- **Horizontal Segments**: Indicate dwell time at stations.
- **Intersections**: Represent vehicle passes or single-track meets/conflicts.
- **Spacing**: Directly visualizes headway regularity and vehicle bunching!

This dispatch visualization engine powers:
- ⏱️ **[Headway](https://headway.shivrajsinh.in)**: Corridor headway analysis, headway violation detection, and bunching prediction.
- 🚆 **[Stopwatch Transit](https://transit.shivrajsinh.in)**: Public transit tracking, corridor scheduling, and live timetable PWA.

---

## 📦 Installation

```bash
npm install transit-stringline-diagram-generator
```

---

## 🚀 Usage Example

```javascript
import { generateStringlineSvg } from 'transit-stringline-diagram-generator';

const stops = [
  { stop_id: 'ADI', stop_name: 'Ahmedabad Junction', distance_km: 0 },
  { stop_id: 'SBT', stop_name: 'Sabarmati', distance_km: 8.5 },
  { stop_id: 'GNC', stop_name: 'Gandhinagar Capital', distance_km: 30.0 }
];

const trips = [
  {
    trip_id: 'EXP_01',
    route_color: '#dc2626',
    stops: [
      { stop_id: 'ADI', time: '07:00' },
      { stop_id: 'SBT', time: '07:12' },
      { stop_id: 'GNC', time: '07:40' }
    ]
  },
  {
    trip_id: 'LOCAL_02',
    route_color: '#2563eb',
    stops: [
      { stop_id: 'ADI', time: '07:20' },
      { stop_id: 'SBT', time: '07:45' },
      { stop_id: 'GNC', time: '08:25' }
    ]
  }
];

const svgMarkup = generateStringlineSvg({
  corridorName: 'Ahmedabad - Gandhinagar Corridor',
  stops,
  trips,
  timeRange: ['06:30', '09:00'],
  width: 960,
  height: 520
});

document.getElementById('diagram-container').innerHTML = svgMarkup;
```

---

## 🔗 Related Transit Projects

- **[Headway](https://headway.shivrajsinh.in)**: Commuter wait-time optimization, Welch-Paull headway calculation, and regularity benchmarking.
- **[Stopwatch Transit](https://transit.shivrajsinh.in)**: Real-time public transit tracking, live bus telemetry, and zero-latency timetable PWA.
- **[Transit Matrix Timetable Renderer](https://github.com/shivrajsinhzala/transit-matrix-timetable-renderer)**: Accessible HTML5 timetable matrix generator.

---

## 📄 License

MIT © [Shivrajsinh Zala](https://github.com/shivrajsinhzala)
