/**
 * Generates an SVG Marey stringline time-distance diagram from GTFS stop sequence and trip times.
 */

function parseTimeToMinutes(timeStr) {
  const parts = timeStr.split(':').map(Number);
  return parts[0] * 60 + parts[1] + (parts[2] ? parts[2] / 60 : 0);
}

export function generateStringlineSvg({
  corridorName = 'Transit Corridor',
  stops = [], // { stop_id, stop_name, distance_km }
  trips = [], // { trip_id, route_color, stops: [{ stop_id, time }] }
  timeRange = ['06:00', '10:00'],
  width = 900,
  height = 500
}) {
  const minTime = parseTimeToMinutes(timeRange[0]);
  const maxTime = parseTimeToMinutes(timeRange[1]);
  const timeSpan = maxTime - minTime || 1;

  const padding = { top: 40, right: 30, bottom: 50, left: 140 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const totalDist = stops.length > 1 ? (stops[stops.length - 1].distance_km || stops.length - 1) : 1;

  function timeToX(tMinutes) {
    return padding.left + ((tMinutes - minTime) / timeSpan) * chartWidth;
  }

  function distToY(dist) {
    return padding.top + (dist / totalDist) * chartHeight;
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff; font-family:sans-serif;">\n`;
  svg += `  <title>${corridorName} - Stringline Diagram</title>\n`;

  // Draw Grid Lines for Stops (Horizontal)
  stops.forEach((stop, idx) => {
    const dist = stop.distance_km !== undefined ? stop.distance_km : idx;
    const y = distToY(dist);
    svg += `  <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="2,2" />\n`;
    svg += `  <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#475569">${stop.stop_name}</text>\n`;
  });

  // Draw Time Axis Markers (Vertical)
  const hourStep = 60; // Every 1 hour
  for (let t = Math.ceil(minTime / 60) * 60; t <= maxTime; t += hourStep) {
    const x = timeToX(t);
    const hours = Math.floor(t / 60);
    const label = `${String(hours).padStart(2, '0')}:00`;
    svg += `  <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${height - padding.bottom}" stroke="#cbd5e1" stroke-width="1" />\n`;
    svg += `  <text x="${x}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="11" fill="#64748b">${label}</text>\n`;
  }

  // Draw Trip Stringlines
  trips.forEach((trip) => {
    const color = trip.route_color || '#2563eb';
    const points = [];

    (trip.stops || []).forEach((st) => {
      const stopInfo = stops.find((s) => s.stop_id === st.stop_id);
      if (stopInfo && st.time) {
        const tMinutes = parseTimeToMinutes(st.time);
        if (tMinutes >= minTime && tMinutes <= maxTime) {
          const dist = stopInfo.distance_km !== undefined ? stopInfo.distance_km : stops.indexOf(stopInfo);
          points.push(`${timeToX(tMinutes).toFixed(1)},${distToY(dist).toFixed(1)}`);
        }
      }
    });

    if (points.length >= 2) {
      svg += `  <polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />\n`;
    }
  });

  svg += `</svg>`;
  return svg;
}
