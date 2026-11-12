import assert from 'node:assert/strict';
import { generateStringlineSvg } from '../src/index.js';

console.log('🧪 Testing transit-stringline-diagram-generator...');

const stops = [
  { stop_id: 'S1', stop_name: 'Ahmedabad Junction', distance_km: 0 },
  { stop_id: 'S2', stop_name: 'Sabarmati Bridge', distance_km: 8.5 },
  { stop_id: 'S3', stop_name: 'Gandhinagar Capital', distance_km: 30.0 }
];

const trips = [
  {
    trip_id: 'EXP_1',
    route_color: '#dc2626',
    stops: [
      { stop_id: 'S1', time: '06:30' },
      { stop_id: 'S2', time: '06:45' },
      { stop_id: 'S3', time: '07:15' }
    ]
  },
  {
    trip_id: 'LOCAL_2',
    route_color: '#16a34a',
    stops: [
      { stop_id: 'S1', time: '07:00' },
      { stop_id: 'S2', time: '07:25' },
      { stop_id: 'S3', time: '08:05' }
    ]
  }
];

const svg = generateStringlineSvg({
  corridorName: 'Ahmedabad - Gandhinagar Rapid Rail',
  stops,
  trips,
  timeRange: ['06:00', '09:00']
});

assert.ok(svg.includes('<svg'), 'Output should be valid SVG');
assert.ok(svg.includes('polyline'), 'Output should render polylines for trips');
assert.ok(svg.includes('Ahmedabad Junction'), 'Output should contain station labels');
assert.ok(svg.includes('#dc2626'), 'Output should preserve route colors');

console.log('  ✓ SVG Marey stringline diagram generated successfully');
console.log('🎉 All tests passed successfully!');
