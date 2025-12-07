import { useEffect } from "react";
import vendorData from "./data/vendorData.json";

// S03 criteria mapping based on equipment (was S05)
const S03_LABELS = {
  "Dual Pulley": "Stack Score",
  "Leg Ext/Curl": "Stack Score",
  "Treadmill": "Step Up Score",
  "Elliptical": "Step Up Score",
  "Recumbent Bike": "Step Thru Score",
  "Rower": "Accessibility Score",
  "Bench": "Mobility Score",
};

// Criteria codes and their labels
const getCriteriaLabels = (equipmentName) => ({
  S01: "Reliability Score",
  S02: "Ease of Use Score",
  S03: S03_LABELS[equipmentName] || "S03 Score",
  S04: "Price Score",
  S05: "Aesthetics Score",
  S06: "Build Quality Score",
  S07: "Durability Score",
  S08: "Svc/Parts Availability Score",
  S09: "Warranty Score",
  S10: "Footprint Score",
  S11: "Weight Score",
});

// Criteria weights
const CRITERIA_WEIGHTS = {
  S01: 0.22,  // Reliability
  S02: 0.18,  // Ease of Use
  S03: 0.06,  // Stack/Step Up/Mobility
  S04: 0.12,  // Price
  S05: 0.12,  // Aesthetics
  S06: 0.08,  // Build Quality
  S07: 0.08,  // Durability
  S08: 0.08,  // Svc/Parts Availability
  S09: 0.04,  // Warranty
  S10: 0.01,  // Footprint
  S11: 0.01,  // Weight
};

// Vendor colors
const VENDOR_COLORS = {
  V01: "#059669",
  V02: "#1d4ed8",
  V03: "#dc2626",
  V04: "#9333ea",
  V05: "#f59e0b",
};

// Equipment list in order
const EQUIPMENT_LIST = [
  { id: "E01", name: "Dual Pulley" },
  { id: "E02", name: "Leg Ext/Curl" },
  { id: "E03", name: "Treadmill" },
  { id: "E04", name: "Elliptical" },
  { id: "E05", name: "Recumbent Bike" },
  { id: "E06", name: "Rower" },
  { id: "E07", name: "Bench" },
];

export function openEquipmentReport(equipmentId, equipmentName, apiKey) {
  const equipmentProducts = vendorData.products.filter((p) => p.equipmentid === equipmentId);
  const criteriaLabels = getCriteriaLabels(equipmentName);
  const criteriaKeys = Object.keys(criteriaLabels);
  const sortedProducts = [...equipmentProducts].sort((a, b) => b.overallScore - a.overallScore);
  const highestScore = Math.max(...equipmentProducts.map((p) => p.overallScore));
  
  // Get all equipment data for the dropdown
  const allEquipmentData = {};
  EQUIPMENT_LIST.forEach(eq => {
    const products = vendorData.products.filter((p) => p.equipmentid === eq.id);
    const sorted = [...products].sort((a, b) => b.overallScore - a.overallScore);
    const labels = getCriteriaLabels(eq.name);
    allEquipmentData[eq.id] = {
      name: eq.name,
      products: sorted,
      criteriaLabels: labels,
      criteriaKeys: Object.keys(labels),
      highestScore: Math.max(...products.map((p) => p.overallScore))
    };
  });

  // Build the HTML content
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${equipmentName} Equipment Comparison</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"><\/script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #f7f7f9; }
  </style>
</head>
<body class="p-4 md:p-8">
  <div class="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
    
    <!-- Header with Dropdown -->
    <header class="text-center mb-8">
      <div class="flex items-center justify-center gap-4 mb-2">
        <label for="equipment-select" class="text-lg text-gray-600">Select Equipment:</label>
        <select id="equipment-select" class="text-2xl md:text-3xl font-extrabold text-gray-900 bg-transparent border-b-2 border-indigo-500 focus:outline-none cursor-pointer px-2 py-1">
          ${EQUIPMENT_LIST.map(eq => `
            <option value="${eq.id}" ${eq.id === equipmentId ? 'selected' : ''}>${eq.name}</option>
          `).join('')}
        </select>
        <span class="text-2xl md:text-3xl font-extrabold text-gray-900">Equipment Comparison</span>
      </div>
      <p class="text-lg text-gray-600">Visual Evaluation of <span id="vendor-count">${sortedProducts.length}</span> Vendors across Weighted Criteria (Total Weight: 1.00)</p>
    </header>

    <!-- Main Content Grid - Sidebar and Chart side by side -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      
      <!-- Sidebar -->
      <div class="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow-inner h-fit">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Vendors & Overall Scores</h2>
        
        <!-- Vendor Checkboxes -->
        <div id="vendor-controls" class="space-y-3">
          ${sortedProducts.map(product => `
            <label class="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-white transition duration-150">
              <input type="checkbox" data-vendor="${product.vendorid}" checked
                class="h-5 w-5 rounded transition duration-150 ease-in-out" 
                style="accent-color: ${VENDOR_COLORS[product.vendorid]};">
              <span class="w-3 h-3 rounded-full" style="background-color: ${VENDOR_COLORS[product.vendorid]};"></span>
              <span class="text-base font-medium text-gray-700">${product.vendor}</span>
            </label>
          `).join('')}
        </div>

        <!-- Overall Scores -->
        <div class="mt-6 pt-4 border-t">
          <p class="text-sm font-medium text-gray-500 mb-2">Overall Scores (Weighted Average)</p>
          <ul id="overall-scores" class="space-y-2">
            ${sortedProducts.map(product => `
              <li class="flex justify-between items-center">
                <span class="text-gray-700 flex items-center">
                  <span class="w-2.5 h-2.5 rounded-full mr-2" style="background-color: ${VENDOR_COLORS[product.vendorid]};"></span>
                  ${product.vendor}
                </span>
                <span class="text-lg font-bold ${product.overallScore === highestScore ? 'text-green-600' : 'text-gray-900'}">${product.overallScore.toFixed(2)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- Radar Chart -->
      <div class="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 h-fit">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">Performance Comparison (0-10 Scale)</h2>
        <div id="radar-chart-container" class="flex justify-center">
          <svg id="radar-svg" width="500" height="500"></svg>
        </div>
      </div>
    </div>

    <!-- LLM Recommendation Section - Full Width -->
    <div class="bg-gray-50 p-6 rounded-xl shadow-inner mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span>✨</span> LLM Decision Rationale
      </h2>
      <button id="generate-recommendation"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition duration-200 shadow-md flex items-center justify-center disabled:opacity-50 mb-4">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd"/>
        </svg>
        Analyze & Recommend
      </button>
      <div id="recommendation-output" class="p-4 bg-white border border-gray-200 rounded-lg text-gray-700 shadow-sm min-h-[80px]">
        Click the button above to generate an AI-powered analysis and recommendation based on scores, specifications, and detailed commentary.
      </div>
    </div>

    <!-- Criteria Weights -->
    <div class="p-4 bg-blue-50 rounded-lg mb-8">
      <h4 class="text-sm font-semibold text-blue-800 mb-2">Criteria Weights</h4>
      <div id="criteria-weights" class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-700">
        ${criteriaKeys.map(key => `<span>${criteriaLabels[key]}: ${(CRITERIA_WEIGHTS[key] * 100).toFixed(0)}%</span>`).join('')}
      </div>
    </div>

    <!-- Detailed Scores Table -->
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Detailed Criteria and Scores</h2>
      <div class="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
        <table id="scores-table" class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Code</th>
              <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Criterion</th>
              <th class="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Weight</th>
              ${sortedProducts.map(product => `
                <th class="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider" style="color: ${VENDOR_COLORS[product.vendorid]};">${product.vendor}</th>
              `).join('')}
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            ${criteriaKeys.map(key => {
              const scores = sortedProducts.map(p => p[key] || 0);
              const maxScore = Math.max(...scores);
              return `
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 text-sm font-mono text-gray-500">${key}</td>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900">${criteriaLabels[key]}</td>
                  <td class="px-4 py-3 text-sm text-center font-mono bg-gray-50 text-gray-600">${(CRITERIA_WEIGHTS[key] * 100).toFixed(0)}%</td>
                  ${sortedProducts.map(product => {
                    const score = product[key] || 0;
                    const isMax = score === maxScore && maxScore > 0;
                    return `<td class="px-4 py-3 text-sm text-center font-semibold ${isMax ? 'bg-green-100 text-green-800' : 'text-gray-700'}">${score.toFixed(2)}</td>`;
                  }).join('')}
                </tr>
              `;
            }).join('')}
            <tr class="bg-gray-200 font-extrabold text-base border-t-2 border-gray-400">
              <td class="px-4 py-3 font-mono">S12</td>
              <td class="px-4 py-3 text-gray-900">Overall Score</td>
              <td class="px-4 py-3 text-center font-mono">100%</td>
              ${sortedProducts.map(product => `
                <td class="px-4 py-3 text-center ${product.overallScore === highestScore ? 'bg-green-200 text-green-900' : 'text-gray-900'}">${product.overallScore.toFixed(2)}</td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    // Data passed from React
    const ALL_EQUIPMENT_DATA = ${JSON.stringify(allEquipmentData)};
    const EQUIPMENT_LIST = ${JSON.stringify(EQUIPMENT_LIST)};
    let currentEquipmentId = "${equipmentId}";
    let VENDOR_DATA = ${JSON.stringify(sortedProducts)};
    let CRITERIA_KEYS = ${JSON.stringify(criteriaKeys)};
    let CRITERIA_LABELS = ${JSON.stringify(criteriaLabels)};
    const CRITERIA_WEIGHTS = ${JSON.stringify(CRITERIA_WEIGHTS)};
    const VENDOR_COLORS = ${JSON.stringify(VENDOR_COLORS)};
    const API_KEY = "${apiKey || ''}";

    let visibleVendors = VENDOR_DATA.map(v => v.vendorid);

    // Draw radar chart
    function drawRadarChart() {
      const svg = d3.select("#radar-svg");
      svg.selectAll("*").remove();

      const width = 500;
      const height = 500;
      const margin = 60;
      const radius = Math.min(width, height) / 2 - margin;
      const centerX = width / 2;
      const centerY = height / 2;

      const numAxes = CRITERIA_KEYS.length;
      const angleSlice = (2 * Math.PI) / numAxes;

      const rScale = d3.scaleLinear().domain([0, 10]).range([0, radius]);

      const g = svg.append("g").attr("transform", "translate(" + centerX + ", " + centerY + ")");

      // Draw circular grid
      const levels = 5;
      for (let i = 1; i <= levels; i++) {
        const levelRadius = (radius / levels) * i;
        g.append("circle")
          .attr("r", levelRadius)
          .attr("fill", "#f3f4f6")
          .attr("stroke", "#d1d5db")
          .attr("stroke-width", 0.5)
          .attr("fill-opacity", i === levels ? 0.1 : 0);

        g.append("text")
          .attr("x", 4)
          .attr("y", -levelRadius + 4)
          .attr("fill", "#9ca3af")
          .attr("font-size", "10px")
          .text((i * 2).toString());
      }

      // Draw axes
      CRITERIA_KEYS.forEach(function(key, i) {
        const angle = i * angleSlice - Math.PI / 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        g.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", x)
          .attr("y2", y)
          .attr("stroke", "#d1d5db")
          .attr("stroke-width", 1);

        const labelRadius = radius + 25;
        const labelX = labelRadius * Math.cos(angle);
        const labelY = labelRadius * Math.sin(angle);

        let textAnchor = "middle";
        if (angle > -Math.PI / 2 && angle < Math.PI / 2) textAnchor = "start";
        else if (angle > Math.PI / 2 || angle < -Math.PI / 2) textAnchor = "end";

        g.append("text")
          .attr("x", labelX)
          .attr("y", labelY)
          .attr("text-anchor", textAnchor)
          .attr("dominant-baseline", "middle")
          .attr("fill", "#374151")
          .attr("font-size", "11px")
          .attr("font-weight", "600")
          .text(CRITERIA_LABELS[key].replace(" Score", ""));
      });

      // Radar line generator with smooth curves
      const radarLine = d3.lineRadial()
        .curve(d3.curveCardinalClosed.tension(0.7))
        .radius(function(d) { return rScale(d.value); })
        .angle(function(d, i) { return i * angleSlice; });

      // Filter visible vendors
      const visibleProducts = VENDOR_DATA.filter(function(p) { return visibleVendors.includes(p.vendorid); });

      // Draw radar areas
      visibleProducts.forEach(function(product) {
        const dataPoints = CRITERIA_KEYS.map(function(key) {
          return {
            axis: key,
            value: product[key] || 0
          };
        });

        const color = VENDOR_COLORS[product.vendorid] || "#6b7280";

        g.append("path")
          .datum(dataPoints)
          .attr("d", radarLine)
          .attr("fill", color)
          .attr("fill-opacity", 0.15)
          .attr("stroke", color)
          .attr("stroke-width", 2.5)
          .attr("stroke-opacity", 0.9);

        dataPoints.forEach(function(d, i) {
          const angle = i * angleSlice - Math.PI / 2;
          const r = rScale(d.value);
          const x = r * Math.cos(angle);
          const y = r * Math.sin(angle);

          g.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 5)
            .attr("fill", color)
            .attr("stroke", "white")
            .attr("stroke-width", 2);
        });
      });
    }

    // Setup vendor checkboxes
    function setupCheckboxes() {
      document.querySelectorAll('#vendor-controls input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function(e) {
          const vendorId = e.target.dataset.vendor;
          if (e.target.checked) {
            if (!visibleVendors.includes(vendorId)) visibleVendors.push(vendorId);
          } else {
            visibleVendors = visibleVendors.filter(function(v) { return v !== vendorId; });
          }
          drawRadarChart();
        });
      });
    }

    // Switch equipment
    function switchEquipment(newEquipmentId) {
      const data = ALL_EQUIPMENT_DATA[newEquipmentId];
      if (!data) return;

      currentEquipmentId = newEquipmentId;
      VENDOR_DATA = data.products;
      CRITERIA_KEYS = data.criteriaKeys;
      CRITERIA_LABELS = data.criteriaLabels;
      visibleVendors = VENDOR_DATA.map(v => v.vendorid);

      // Update vendor count
      document.getElementById('vendor-count').textContent = VENDOR_DATA.length;

      // Update vendor controls
      const controlsHtml = VENDOR_DATA.map(function(product) {
        return '<label class="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-white transition duration-150">' +
          '<input type="checkbox" data-vendor="' + product.vendorid + '" checked class="h-5 w-5 rounded transition duration-150 ease-in-out" style="accent-color: ' + VENDOR_COLORS[product.vendorid] + ';">' +
          '<span class="w-3 h-3 rounded-full" style="background-color: ' + VENDOR_COLORS[product.vendorid] + ';"></span>' +
          '<span class="text-base font-medium text-gray-700">' + product.vendor + '</span>' +
          '</label>';
      }).join('');
      document.getElementById('vendor-controls').innerHTML = controlsHtml;

      // Update overall scores
      const scoresHtml = VENDOR_DATA.map(function(product) {
        const isHighest = product.overallScore === data.highestScore;
        return '<li class="flex justify-between items-center">' +
          '<span class="text-gray-700 flex items-center">' +
          '<span class="w-2.5 h-2.5 rounded-full mr-2" style="background-color: ' + VENDOR_COLORS[product.vendorid] + ';"></span>' +
          product.vendor + '</span>' +
          '<span class="text-lg font-bold ' + (isHighest ? 'text-green-600' : 'text-gray-900') + '">' + product.overallScore.toFixed(2) + '</span>' +
          '</li>';
      }).join('');
      document.getElementById('overall-scores').innerHTML = scoresHtml;

      // Update criteria weights
      const weightsHtml = CRITERIA_KEYS.map(function(key) {
        return '<span>' + CRITERIA_LABELS[key] + ': ' + (CRITERIA_WEIGHTS[key] * 100).toFixed(0) + '%</span>';
      }).join('');
      document.getElementById('criteria-weights').innerHTML = weightsHtml;

      // Update table
      updateTable();

      // Reset recommendation output
      document.getElementById('recommendation-output').innerHTML = 'Click the button above to generate an AI-powered analysis and recommendation based on scores, specifications, and detailed commentary.';

      // Redraw chart and setup checkboxes
      drawRadarChart();
      setupCheckboxes();
    }

    function updateTable() {
      const data = ALL_EQUIPMENT_DATA[currentEquipmentId];
      
      // Update header
      const headerHtml = '<tr>' +
        '<th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Code</th>' +
        '<th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Criterion</th>' +
        '<th class="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Weight</th>' +
        VENDOR_DATA.map(function(product) {
          return '<th class="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider" style="color: ' + VENDOR_COLORS[product.vendorid] + ';">' + product.vendor + '</th>';
        }).join('') +
        '</tr>';
      document.querySelector('#scores-table thead').innerHTML = headerHtml;

      // Update body
      let bodyHtml = CRITERIA_KEYS.map(function(key) {
        const scores = VENDOR_DATA.map(function(p) { return p[key] || 0; });
        const maxScore = Math.max.apply(null, scores);
        return '<tr class="hover:bg-gray-50 transition-colors">' +
          '<td class="px-4 py-3 text-sm font-mono text-gray-500">' + key + '</td>' +
          '<td class="px-4 py-3 text-sm font-medium text-gray-900">' + CRITERIA_LABELS[key] + '</td>' +
          '<td class="px-4 py-3 text-sm text-center font-mono bg-gray-50 text-gray-600">' + (CRITERIA_WEIGHTS[key] * 100).toFixed(0) + '%</td>' +
          VENDOR_DATA.map(function(product) {
            const score = product[key] || 0;
            const isMax = score === maxScore && maxScore > 0;
            return '<td class="px-4 py-3 text-sm text-center font-semibold ' + (isMax ? 'bg-green-100 text-green-800' : 'text-gray-700') + '">' + score.toFixed(2) + '</td>';
          }).join('') +
          '</tr>';
      }).join('');

      // Add overall row
      bodyHtml += '<tr class="bg-gray-200 font-extrabold text-base border-t-2 border-gray-400">' +
        '<td class="px-4 py-3 font-mono">S12</td>' +
        '<td class="px-4 py-3 text-gray-900">Overall Score</td>' +
        '<td class="px-4 py-3 text-center font-mono">100%</td>' +
        VENDOR_DATA.map(function(product) {
          const isHighest = product.overallScore === data.highestScore;
          return '<td class="px-4 py-3 text-center ' + (isHighest ? 'bg-green-200 text-green-900' : 'text-gray-900') + '">' + product.overallScore.toFixed(2) + '</td>';
        }).join('') +
        '</tr>';

      document.querySelector('#scores-table tbody').innerHTML = bodyHtml;
    }

    // LLM Recommendation with enhanced data
    async function generateRecommendation() {
      const button = document.getElementById('generate-recommendation');
      const output = document.getElementById('recommendation-output');
      
      if (!API_KEY) {
        output.innerHTML = '<p class="text-red-500">API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file.</p>';
        return;
      }

      const equipmentName = EQUIPMENT_LIST.find(e => e.id === currentEquipmentId)?.name || 'Equipment';

      button.disabled = true;
      output.innerHTML = '<div class="flex items-center justify-center py-4"><svg class="animate-spin h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="text-indigo-600 font-semibold">Analyzing...</span></div>';

      // Build detailed product information including comments and specs
      const productDetails = VENDOR_DATA.map(function(p) {
        const scores = CRITERIA_KEYS.map(function(key) { 
          return CRITERIA_LABELS[key] + ": " + (p[key] ? p[key].toFixed(2) : 'N/A'); 
        }).join(", ");
        
        // Gather all comments/specifications
        const comments = [];
        if (p.C02) comments.push("Build Quality Notes: " + p.C02);
        if (p.C03) comments.push("Weight/Specs: " + p.C03);
        if (p.C04) comments.push("Stack/Feature Info: " + p.C04);
        if (p.C05) comments.push("Additional Specs: " + p.C05);
        if (p.C06) comments.push("Warranty Details: " + p.C06);
        if (p.C07) comments.push("Durability Assessment: " + p.C07);
        if (p.C08) comments.push("Reliability Notes: " + p.C08);
        if (p.C09) comments.push("Ease of Use: " + p.C09);
        if (p.C10) comments.push("Service/Parts Availability: " + p.C10);
        if (p.C11) comments.push("Aesthetics: " + p.C11);
        if (p.C14) comments.push("Additional Notes: " + p.C14);
        if (p.C15) comments.push("Dimensions: " + p.C15);
        
        let details = "VENDOR: " + p.vendor + "\\n";
        details += "Brand: " + p.brand + "\\n";
        details += "Model: " + p.model + "\\n";
        details += "Overall Score: " + p.overallScore.toFixed(2) + "\\n";
        details += "Price: $" + p.allInUnitPrice.toLocaleString() + "\\n";
        details += "Scores: " + scores + "\\n";
        if (comments.length > 0) {
          details += "\\nDetailed Commentary:\\n" + comments.join("\\n");
        }
        if (p.url) {
          details += "\\nProduct URL: " + p.url;
        }
        return details;
      }).join("\\n\\n---\\n\\n");

      const weightsInfo = CRITERIA_KEYS.map(function(key) { 
        return CRITERIA_LABELS[key] + ": " + (CRITERIA_WEIGHTS[key] * 100).toFixed(0) + "%"; 
      }).join(", ");

      const prompt = "You are a procurement analyst specializing in commercial gym equipment for a condominium fitness center (Highland Tower). Analyze the following " + equipmentName + " equipment options and provide a recommendation.\\n\\nCRITERIA WEIGHTS (Total 100%):\\n" + weightsInfo + "\\n\\nThe most heavily weighted criteria are Reliability (22%), Ease of Use (18%), Price (12%), and Aesthetics (12%). These are critical for a shared condo gym environment.\\n\\nEQUIPMENT OPTIONS WITH DETAILED DATA:\\n" + productDetails + "\\n\\nPlease provide:\\n1. Your top recommendation with a clear justification based on the scores AND the detailed commentary provided\\n2. A comparison highlighting key trade-offs between the top 2-3 options, referencing specific details from the commentary\\n3. Important considerations for a condo gym environment (durability for shared use, ease of maintenance, warranty coverage, service availability)\\n\\nKeep your response focused and actionable. Start with the recommended vendor name followed by a colon.";

      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true"
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1500,
            messages: [{ role: "user", content: prompt }]
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(function() { return {}; });
          throw new Error(errorData.error ? errorData.error.message : "API error: " + response.status);
        }

        const data = await response.json();
        const text = data.content && data.content[0] ? data.content[0].text : "No recommendation could be generated.";

        const vendorMatch = text.match(/^([^:]+):/);
        const recommendedVendorName = vendorMatch ? vendorMatch[1].trim() : null;
        const recommendedProduct = recommendedVendorName 
          ? VENDOR_DATA.find(function(p) { return p.vendor.toLowerCase().includes(recommendedVendorName.toLowerCase()); })
          : VENDOR_DATA[0];

        let html = '';
        if (recommendedProduct) {
          html += '<div class="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">';
          html += '<div class="flex items-center justify-between">';
          html += '<div>';
          html += '<p class="text-lg font-bold text-indigo-700">Recommended: ' + recommendedProduct.vendor + '</p>';
          html += '<p class="text-sm text-indigo-600">' + recommendedProduct.brand + ' - ' + recommendedProduct.model + '</p>';
          html += '<p class="text-sm text-indigo-600">Price: $' + recommendedProduct.allInUnitPrice.toLocaleString() + ' | Score: ' + recommendedProduct.overallScore.toFixed(2) + '</p>';
          html += '</div>';
          html += '</div>';
          html += '</div>';
        }
        html += '<div class="prose prose-sm max-w-none">';
        html += '<p class="font-bold text-gray-800 mb-2">Analysis & Rationale:</p>';
        html += '<div class="text-gray-700 whitespace-pre-wrap leading-relaxed">' + text + '</div>';
        html += '</div>';

        output.innerHTML = html;
      } catch (error) {
        output.innerHTML = '<p class="text-red-500">Error: ' + error.message + '</p>';
      } finally {
        button.disabled = false;
      }
    }

    // Initialize
    window.onload = function() {
      drawRadarChart();
      setupCheckboxes();
      document.getElementById('generate-recommendation').addEventListener('click', generateRecommendation);
      document.getElementById('equipment-select').addEventListener('change', function(e) {
        switchEquipment(e.target.value);
      });
    };
  <\/script>
</body>
</html>
  `;

  // Open in new window
  const newWindow = window.open('', '_blank', 'width=1200,height=900');
  if (newWindow) {
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  } else {
    alert('Please allow popups for this site to view the report.');
  }
}

// Component that triggers the new window when opened
export default function EquipmentReportModal({ equipmentId, equipmentName, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen && equipmentId && equipmentName) {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || '';
      openEquipmentReport(equipmentId, equipmentName, apiKey);
      onClose(); // Close immediately since we opened a new window
    }
  }, [isOpen, equipmentId, equipmentName, onClose]);

  return null; // This component doesn't render anything
}