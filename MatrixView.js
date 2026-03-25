const renderAges = (center, radius) => {
  const years = [
    { a: 180, t: "0" }, { a: 225, t: "10" }, { a: 270, t: "20" },
    { a: 315, t: "30" }, { a: 0, t: "40" }, { a: 45, t: "50" },
    { a: 90, t: "60" }, { a: 135, t: "70" }
  ];
  return years.map(y => {
    const rad = (y.a * Math.PI) / 180;
    const x = center + (radius + 75) * Math.cos(rad);
    const yPos = center + (radius + 75) * Math.sin(rad);
    return `<text x="${x}" y="${yPos}" fill="#333" font-size="20" font-weight="bold" text-anchor="middle">${y.t} лет</text>`;
  }).join('');
};

const renderPeripheralDots = (center, radius, data) => {
  let elements = [];
  const totalPoints = 80;
  const ageLabelsMap = { 2: "1-2", 3: "2-3", 4: "3-4", 5: "5", 6: "6-7", 7: "7-8", 8: "8-9" };

  elements.push(`<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#d1d1d1" stroke-width="1" stroke-dasharray="4 4" />`);

  for (let i = 0; i < totalPoints; i++) {
    const isMainNode = i % 10 === 0;
    const sectorIdx = i % 10;
    const sectorNum = Math.floor(i / 10);
    const angle = (180 + (i * 360 / totalPoints)) * Math.PI / 180;

    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    if (!isMainNode) {
      elements.push(`<circle cx="${x}" cy="${y}" r="2.5" fill="#5e5e5eff" />`);
    }

    const val = data.peripheral ? data.peripheral[i] : '';
    const shouldShowArcana = isMainNode || (sectorIdx >= 2 && sectorIdx <= 8);

    if (val && shouldShowArcana) {
      const arcanaDist = isMainNode ? 35 : 22;
      const ax = center + (radius + arcanaDist) * Math.cos(angle);
      const ay = center + (radius + arcanaDist) * Math.sin(angle);

      let ageLabelHTML = '';
      if (!isMainNode && ageLabelsMap[sectorIdx]) {
        const baseAge = sectorNum * 10;
        const label = ageLabelsMap[sectorIdx].split('-').map(n => parseInt(n) + baseAge).join('-');
        const ageDist = radius - 20;
        const ageX = center + ageDist * Math.cos(angle);
        const ageY = center + ageDist * Math.sin(angle);
        ageLabelHTML = `<text x="${ageX}" y="${ageY}" text-anchor="middle" dominant-baseline="central" font-size="6" fill="#515151ff">${label}</text>`;
      }

      elements.push(`
        <g style="font-family: sans-serif; pointer-events: none;">
          <text x="${ax}" y="${ay}" text-anchor="middle" dominant-baseline="central"
                fill="${isMainNode ? '#333' : '#313131ff'}" 
                font-size="${isMainNode ? 11 : 9}" 
                font-weight="bold">${val}</text>
          ${ageLabelHTML}
        </g>
      `);
    }
  }
  return elements.join('');
};

export const drawMatrix = (data) => {
  if (!data || !data.pointA) return '';

  const size = 1000;
  const center = size / 2;
  const radius = 360;
  const offset = radius * 0.707;

  const allNodes = [
    { x: center, y: center, val: data.pointX, r: 40, fontSize: '38px', color: '#3F51B5' },
    { x: center - radius, y: center, val: data.pointA, r: 40, fontSize: '36px', color: '#E91E63' },
    { x: center, y: center - radius, val: data.pointB, r: 40, fontSize: '36px', color: '#9C27B0' },
    { x: center + radius, y: center, val: data.pointC, r: 40, fontSize: '36px', color: '#FF9800' },
    { x: center, y: center + radius, val: data.pointD, r: 40, fontSize: '36px', color: '#FFEB3B' },
    { x: center - offset, y: center - offset, val: data.pointE, r: 40, fontSize: '36px', color: '#8BC34A' },
    { x: center + offset, y: center - offset, val: data.pointF, r: 40, fontSize: '36px', color: '#03A9F4' },
    { x: center + offset, y: center + offset, val: data.pointG, r: 40, fontSize: '36px', color: '#4CAF50' },
    { x: center - offset, y: center + offset, val: data.pointH, r: 40, fontSize: '36px', color: '#009688' },

    { x: center - radius * 0.8, y: center, val: data.pointAverA, r: 30, fontSize: '28px', color: '#E91E63' },
    { x: center, y: center - radius * 0.8, val: data.pointAverB, r: 30, fontSize: '28px', color: '#9C27B0' },
    { x: center + radius * 0.8, y: center, val: data.pointAverC, r: 30, fontSize: '28px', color: '#FF9800' },
    { x: center, y: center + radius * 0.8, val: data.pointAverD, r: 30, fontSize: '28px', color: '#FFEB3B' },
    { x: center - offset * 0.8, y: center - offset * 0.8, val: data.pointAverE, r: 30, fontSize: '28px', color: '#8BC34A' },
    { x: center + offset * 0.8, y: center - offset * 0.8, val: data.pointAverF, r: 30, fontSize: '28px', color: '#03A9F4' },
    { x: center + offset * 0.8, y: center + offset * 0.8, val: data.pointAverG, r: 30, fontSize: '28px', color: '#4CAF50' },
    { x: center - offset * 0.8, y: center + offset * 0.8, val: data.pointAverH, r: 30, fontSize: '28px', color: '#009688' },

    { x: center - radius * 0.65, y: center, val: data.pointSmallA, r: 22, fontSize: '18px', color: '#E91E63' },
    { x: center, y: center - radius * 0.65, val: data.pointSmallB, r: 22, fontSize: '18px', color: '#9C27B0' },
    { x: center + radius * 0.65, y: center, val: data.pointSmallC, r: 22, fontSize: '18px', color: '#FF9800' },
    { x: center, y: center + radius * 0.65, val: data.pointSmallD, r: 22, fontSize: '18px', color: '#FFEB3B' },
    { x: center - offset * 0.65, y: center - offset * 0.65, val: data.pointSmallE, r: 22, fontSize: '18px', color: '#8BC34A' },
    { x: center + offset * 0.65, y: center - offset * 0.65, val: data.pointSmallF, r: 22, fontSize: '18px', color: '#03A9F4' },
    { x: center + offset * 0.65, y: center + offset * 0.65, val: data.pointSmallG, r: 22, fontSize: '18px', color: '#4CAF50' },
    { x: center - offset * 0.65, y: center + offset * 0.65, val: data.pointSmallH, r: 22, fontSize: '18px', color: '#009688' },

    { x: center + 92, y: center + 90, val: data.pointHrtM, r: 18, fontSize: '16px', color: '#f0f0f0', textColor: '#333' },
    { x: center + 140, y: center + 82, val: data.pointHrtO, r: 18, fontSize: '16px', color: '#f0f0f0', textColor: '#333' },
    { x: center + 82, y: center + 140, val: data.pointHrtN, r: 18, fontSize: '16px', color: '#f0f0f0', textColor: '#333' },

    { x: center + (radius * 0.2), y: center, val: data.socialPoint, r: 22, fontSize: '18px', color: '#f0f0f0', textColor: '#333' },
    { x: center + (radius * 0.35), y: center, val: data.spiritPoint, r: 22, fontSize: '18px', color: '#f0f0f0', textColor: '#333' },

    { x: center - 100, y: center, val: data.pointWomen, r: 22, fontSize: '18px', color: '#fbffb6ff', textColor: '#333' },
    { x: center, y: center - 100, val: data.pointMen, r: 22, fontSize: '18px', color: '#fbffb6ff', textColor: '#333' }
  ];

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#2196F3" />
        </marker>
      </defs>

      <g class="grid-layer">${renderPeripheralDots(center, radius, data)}</g>
      
      <g fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="1.5">
        <path d="M ${center} ${center - radius} L ${center + radius} ${center} L ${center} ${center + radius} L ${center - radius} ${center} Z" />
        <path d="M ${center - offset} ${center - offset} L ${center + offset} ${center - offset} L ${center + offset} ${center + offset} L ${center - offset} ${center + offset} Z" />
        <line x1="${center - radius}" y1="${center}" x2="${center + radius}" y2="${center}" />
        <line x1="${center}" y1="${center - radius}" x2="${center}" y2="${center + radius}" />
        <line x1="${center - offset}" y1="${center - offset}" x2="${center + offset}" y2="${center + offset}" />
        <line x1="${center + offset}" y1="${center - offset}" x2="${center - offset}" y2="${center + offset}" />
      </g>

      <g font-size="32" text-anchor="middle" dominant-baseline="central">
          <text x="${center + 50}" y="${center + 100}">❤️</text>
          <text x="${center + 100}" y="${center + 50}" fill="#4CAF50" font-weight="bold">$</text>
      </g>

      ${renderAges(center, radius)}

      ${allNodes.map(p => {
    let currentTextColor = 'white';
    if (p.textColor) {
      currentTextColor = p.textColor;
    } else if (p.color === '#FFEB3B') {
      currentTextColor = '#333';
    }

    const isHrtNode = p.textColor !== undefined;

    return `
          <g style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.1))">
            <circle cx="${p.x}" cy="${p.y}" r="${p.r}" 
                    fill="${p.color}" 
                    stroke="${isHrtNode ? '#d1d1d1' : 'white'}" 
                    stroke-width="${isHrtNode ? 1 : 2}" />
                    <text x="${p.x}" y="${p.y}" 
                      fill="${currentTextColor}" 
                      text-anchor="middle" 
                      dominant-baseline="central" 
                      font-weight="bold" 
                      font-size="${p.fontSize || (p.r * (isHrtNode ? 0.7 : 0.6))}">
                      ${p.val || ''}
                    </text>
           </g>`;
  }).join('')}
    </svg>`;
};