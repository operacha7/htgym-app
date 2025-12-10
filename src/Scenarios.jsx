import React, { useState, useMemo, useEffect } from "react";
import vendorData from "./data/vendorData.json";
import { 
  EQUIPMENT_LIST,
  SCENARIO_OPTIONS, 
  DEFAULT_WEIGHTS, 
  SCORE_LABELS,
  VENDOR_COLORS
} from "./constants";

// Helper to format price (whole dollars)
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Function to calculate custom overall score
const calculateCustomOverallScore = (product, weights) => {
  if (!weights) return product.S12 || product.overallScore || 0;
  
  const scoreKeys = Object.keys(DEFAULT_WEIGHTS);
  let weightedScore = 0;
  
  scoreKeys.forEach(key => {
    weightedScore += (product[key] || 0) * (weights[key] / 100);
  });
  
  return weightedScore;
};

export default function Scenarios() {
  // State
  const [selectedScenario, setSelectedScenario] = useState("highestOverall");
  const [quantities, setQuantities] = useState({});
  const [customVendorSelections, setCustomVendorSelections] = useState({}); // For Custom mode vendor dropdown
  const [isWeightsSectionOpen, setIsWeightsSectionOpen] = useState(false);
  const [selectedSpecificVendor, setSelectedSpecificVendor] = useState(null);
  const isSelectVendorMode = selectedScenario === "selectVendor";
  
  // Custom weights state
  const [customWeightsInput, setCustomWeightsInput] = useState(() => {
    const initial = {};
    Object.keys(DEFAULT_WEIGHTS).forEach(key => {
      initial[key] = "";
    });
    return initial;
  });
  const [appliedCustomWeights, setAppliedCustomWeights] = useState(null);

  const hasCustomWeights = appliedCustomWeights !== null;
  const isCustomMode = selectedScenario === "custom";

  // Get default quantities from JSON
  const defaultQuantities = useMemo(() => {
    const defaults = {};
    EQUIPMENT_LIST.forEach((equip) => {
      const product = vendorData.products.find((p) => p.equipmentid === equip.id);
      defaults[equip.id] = product?.qty || 1;
    });
    return defaults;
  }, []);

  // Initialize quantities on mount
  useEffect(() => {
    setQuantities(defaultQuantities);
  }, [defaultQuantities]);

  // Get the current scenario config
  const currentScenario = useMemo(() => {
    return SCENARIO_OPTIONS.find((s) => s.id === selectedScenario) || SCENARIO_OPTIONS[0];
  }, [selectedScenario]);

  // Get the display score for a product based on scenario and custom weights
  const getDisplayScore = (product, useCustomWeightsOverride = null) => {
    if (!product) return 0;
    
    const scoreField = currentScenario.scoreField;
    const useCustom = useCustomWeightsOverride !== null ? useCustomWeightsOverride : hasCustomWeights;
    
    // For S12 (Overall Score), use custom weights if applied
    if (scoreField === "S12" && useCustom && appliedCustomWeights) {
      return calculateCustomOverallScore(product, appliedCustomWeights);
    }
    
    // For all other scenarios, return the specific criterion score
    return product[scoreField] || 0;
  };

  // Get overall score (always S12, respecting custom weights)
  const getOverallScore = (product) => {
    if (!product) return 0;
    if (hasCustomWeights && appliedCustomWeights) {
      return calculateCustomOverallScore(product, appliedCustomWeights);
    }
    return product.S12 || product.overallScore || 0;
  };

 // Calculate which vendor wins for each equipment based on scenario
const scenarioWinners = useMemo(() => {
  const winners = {};

  if (isCustomMode) {
    return {}; // No auto-selection in custom mode
  }

  if (selectedScenario === "selectVendor") {
    // Select all equipment from the specifically selected vendor
    if (selectedSpecificVendor) {
      EQUIPMENT_LIST.forEach((equip) => {
        const product = vendorData.products.find(
          (p) => p.equipmentid === equip.id && p.vendorid === selectedSpecificVendor
        );
        if (product) {
          winners[equip.id] = selectedSpecificVendor;
        }
      });
    }
    return winners;
  }

  if (selectedScenario === "singleVendor") {
    // Find vendor with highest average score
    let maxAvg = -1;
    let winningVendorId = null;
    
    vendorData.vendors.forEach((vendor) => {
      let totalScore = 0;
      let count = 0;
      EQUIPMENT_LIST.forEach((equip) => {
        const product = vendorData.products.find(
          (p) => p.equipmentid === equip.id && p.vendorid === vendor.vendorid
        );
        if (product) {
          totalScore += getDisplayScore(product);
          count++;
        }
      });
      const avg = count > 0 ? totalScore / EQUIPMENT_LIST.length : 0;
      if (avg > maxAvg) {
        maxAvg = avg;
        winningVendorId = vendor.vendorid;
      }
    });

    // Select all equipment from winning vendor
    if (winningVendorId) {
      EQUIPMENT_LIST.forEach((equip) => {
        const product = vendorData.products.find(
          (p) => p.equipmentid === equip.id && p.vendorid === winningVendorId
        );
        if (product) {
          winners[equip.id] = winningVendorId;
        }
      });
    }
  } else {
    // Standard scenario: select highest score for the relevant field
    EQUIPMENT_LIST.forEach((equip) => {
      const productsForEquip = vendorData.products.filter(
        (p) => p.equipmentid === equip.id
      );
      if (productsForEquip.length === 0) return;

      const maxScore = Math.max(...productsForEquip.map(p => getDisplayScore(p)));
      const winner = productsForEquip.find(
        (p) => Math.abs(getDisplayScore(p) - maxScore) < 0.001
      );
      if (winner) {
        winners[equip.id] = winner.vendorid;
      }
    });
  }

  return winners;
}, [selectedScenario, currentScenario, appliedCustomWeights, hasCustomWeights, isCustomMode, selectedSpecificVendor]);

  // Get product for equipment/vendor combination
  const getProduct = (equipmentId, vendorId) => {
    return vendorData.products.find(
      (p) => p.equipmentid === equipmentId && p.vendorid === vendorId
    );
  };

  // Get the selected vendor for an equipment (from scenario or custom selection)
  const getSelectedVendorId = (equipmentId) => {
    if (isCustomMode) {
      return customVendorSelections[equipmentId] || null;
    }
    return scenarioWinners[equipmentId] || null;
  };

// Handle scenario change
const handleScenarioChange = (e) => {
  setSelectedScenario(e.target.value);
  if (e.target.value !== "custom") {
    setCustomVendorSelections({});
  }
  if (e.target.value !== "selectVendor") {
    setSelectedSpecificVendor(null);
  }
};

  // Handle quantity change
  const handleQuantityChange = (equipmentId, newQty) => {
    setQuantities((prev) => ({
      ...prev,
      [equipmentId]: parseInt(newQty, 10),
    }));
  };

  // Handle custom vendor selection
  const handleCustomVendorChange = (equipmentId, vendorId) => {
    setCustomVendorSelections((prev) => ({
      ...prev,
      [equipmentId]: vendorId || null,
    }));
  };

  // Calculate main results table data
  const mainTableData = useMemo(() => {
    const rows = [];
    let totalCost = 0;
    let totalScore = 0;
    let countForAvg = 0;

    EQUIPMENT_LIST.forEach((equip) => {
      const qty = quantities[equip.id] || 0;
      const selectedVendorId = getSelectedVendorId(equip.id);
      const product = selectedVendorId ? getProduct(equip.id, selectedVendorId) : null;

      let score = null;
      let cost = null;
      let brand = null;
      let vendor = null;
      let vendorId = null;

      if (product) {
        score = getDisplayScore(product);
        cost = qty * product.allInUnitPrice;
        brand = product.brand;
        vendor = product.vendor;
        vendorId = product.vendorid;

        totalCost += cost;
        if (qty > 0) {
          totalScore += score;
          countForAvg++;
        }
      }

      rows.push({
        equipmentId: equip.id,
        equipmentName: equip.name,
        score,
        qty,
        cost,
        brand,
        vendor,
        vendorId,
      });
    });

    const avgScore = countForAvg > 0 ? totalScore / countForAvg : 0;

    return { rows, totalCost, avgScore };
  }, [quantities, selectedScenario, scenarioWinners, customVendorSelections, appliedCustomWeights, hasCustomWeights, isCustomMode]);

  // Calculate vendor averages for Table 1
  const vendorAverageScores = useMemo(() => {
    const scores = {};
    vendorData.vendors.forEach((vendor) => {
      let totalScore = 0;
      let count = 0;
      EQUIPMENT_LIST.forEach((equip) => {
        const product = vendorData.products.find(
          (p) => p.equipmentid === equip.id && p.vendorid === vendor.vendorid
        );
        if (product) {
          totalScore += getDisplayScore(product);
          count++;
        }
      });
      scores[vendor.vendorid] = count > 0 ? totalScore / EQUIPMENT_LIST.length : 0;
    });
    return scores;
  }, [currentScenario, appliedCustomWeights, hasCustomWeights]);

 // Get vendor options for "Select Specific Vendor" dropdown
  const getSpecificVendorOptions = useMemo(() => {
    return vendorData.vendors.map(vendor => {
      // Calculate total cost for this vendor
      let totalCost = 0;
      EQUIPMENT_LIST.forEach((equip) => {
        const product = getProduct(equip.id, vendor.vendorid);
        if (product) {
          const qty = quantities[equip.id] || 0;
          totalCost += qty * product.allInUnitPrice;
        }
      });
      
      // Get average score
      const avgScore = vendorAverageScores[vendor.vendorid] || 0;
      
      return {
        vendorid: vendor.vendorid,
        name: vendor.name,
        totalCost,
        avgScore,
        label: `${vendor.name} - ${formatPrice(totalCost)} - ${avgScore.toFixed(2)}`,
      };
    });
  }, [quantities, vendorAverageScores]);

  // Find vendor with highest average score
  const highestVendorId = useMemo(() => {
    let maxScore = -1;
    let maxVendorId = null;
    Object.entries(vendorAverageScores).forEach(([vendorId, score]) => {
      if (score > maxScore) {
        maxScore = score;
        maxVendorId = vendorId;
      }
    });
    return maxVendorId;
  }, [vendorAverageScores]);

  // Custom weights handlers
  const handleCustomWeightChange = (key, value) => {
    if (value === "" || /^\d*$/.test(value)) {
      const numVal = value === "" ? "" : Math.min(100, parseInt(value, 10) || 0);
      setCustomWeightsInput(prev => ({ ...prev, [key]: numVal }));
    }
  };

  const customWeightsSum = useMemo(() => {
    return Object.values(customWeightsInput).reduce((sum, val) => {
      const num = parseInt(val, 10);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
  }, [customWeightsInput]);

  const hasAnyCustomInput = Object.values(customWeightsInput).some(val => val !== "");
  const isValidCustomSum = customWeightsSum === 100;

  const handleApplyCustomWeights = () => {
    if (!isValidCustomSum) {
      alert(`Weights must total 100%. Current total: ${customWeightsSum}%`);
      return;
    }
    const weights = {};
    Object.keys(customWeightsInput).forEach(key => {
      weights[key] = parseInt(customWeightsInput[key], 10) || 0;
    });
    setAppliedCustomWeights(weights);
  };

  const handleResetDefault = () => {
    setAppliedCustomWeights(null);
    const reset = {};
    Object.keys(DEFAULT_WEIGHTS).forEach(key => {
      reset[key] = "";
    });
    setCustomWeightsInput(reset);
  };

  // Get vendor options for custom mode dropdown
  const getVendorOptions = (equipmentId) => {
    return vendorData.vendors.map(vendor => {
      const product = getProduct(equipmentId, vendor.vendorid);
      if (!product) return null;
      const score = getOverallScore(product);
      return {
        vendorid: vendor.vendorid,
        label: `${vendor.name} - ${formatPrice(product.allInUnitPrice)} - ${score.toFixed(2)}`,
        vendor: vendor.name,
      };
    }).filter(Boolean);
  };

  return (
    <div className="w-full px-[60px] pb-[100px] pt-[20px]">
      
      {/* Custom Weights Applied Indicator */}
      {hasCustomWeights && (
        <div 
          style={{ 
            textAlign: "right", 
            marginBottom: "10px",
            fontFamily: "Lexend, sans-serif",
            fontSize: "18px",
            fontWeight: "700",
            color: "#FF073A",
          }}
        >
          Custom Weights Applied
        </div>
      )}

     {/* Scenario Dropdown */}
<div className="mb-[20px] flex items-center gap-[15px]">
  <select
    value={selectedScenario}
    onChange={handleScenarioChange}
    className="w-[350px] px-[10px] py-[8px] text-[18px] font-semibold rounded-lg focus:outline-none cursor-pointer"
    style={{ 
      fontFamily: "Lexend, sans-serif",
      color: "#000080",
      border: "3px solid #000080",
    }}
  >
    {SCENARIO_OPTIONS.map((option) => (
      <option key={option.id} value={option.id}>
        {option.label}
      </option>
    ))}
  </select>

  {/* Specific Vendor Dropdown - only shown when "Select Specific Vendor" is selected */}
  {isSelectVendorMode && (
    selectedSpecificVendor ? (
      // Vendor selected - show name only with option to change
      <div className="flex items-center gap-[8px] ml-[60px]">
        <span 
          style={{ 
            color: VENDOR_COLORS[selectedSpecificVendor] || "#333",
            fontSize: "18px",
            fontWeight: "600",
            fontFamily: "Lexend, sans-serif",
          }}
        >
          {vendorData.vendors.find(v => v.vendorid === selectedSpecificVendor)?.name || ""}
        </span>
        <button
          onClick={() => setSelectedSpecificVendor(null)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#999",
            cursor: "pointer",
            fontSize: "14px",
            padding: "2px 6px",
          }}
          title="Change vendor"
        >
          ✕
        </button>
      </div>
    ) : (
      // No vendor selected - show dropdown
      <select
        value=""
        onChange={(e) => setSelectedSpecificVendor(e.target.value)}
        className="px-[10px] py-[8px] text-[14px] rounded-lg focus:outline-none cursor-pointer"
        style={{ 
          fontFamily: "Lexend, sans-serif",
          color: "#666",
          border: "3px solid #000080",
          backgroundColor: "#fff",
          minWidth: "300px",
        }}
      >
        <option value="">-- Select a Vendor --</option>
        {getSpecificVendorOptions.map(opt => (
          <option key={opt.vendorid} value={opt.vendorid}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  )}
</div>

      {/* Main Results Table */}
      <div 
        className="mb-[5px] p-[20px] rounded-lg"
        style={{ 
          border: "3px solid #000080",
          backgroundColor: "#fff",
        }}
      >
        <table className="w-full" style={{ fontFamily: "Lexend, sans-serif", fontSize: "18px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th className="text-center p-[10px]" style={{ width: "160px" }}>Equipment</th>
              <th className="text-center p-[10px]" style={{ width: "100px" }}>
                <div>Score</div>
                <div style={{ fontSize: "10px", fontWeight: "400", color: "#666" }}>
                  ({SCORE_LABELS[currentScenario.scoreField] || "Overall"})
                </div>
              </th>
              <th className="text-center p-[10px]" style={{ width: "60px" }}>Qty</th>
              <th className="text-center p-[10px]" style={{ width: "80px" }}>Cost</th>
              <th className="text-center p-[10px]" style={{ width: "140px" }}>Brand</th>
              <th className="text-center p-[10px]" style={{ width: "200px" }}>Vendor</th>
            </tr>
          </thead>
          <tbody>
            {mainTableData.rows.map((row, index) => (
  <React.Fragment key={row.equipmentId}>
    <tr>
                {/* Equipment */}
                <td className="p-[10px] font-medium" style={{ color: "#333" }}>
                  {row.equipmentName}
                </td>

                {/* Score */}
                <td className="p-[10px] text-center">
                  {row.score !== null ? row.score.toFixed(2) : ""}
                </td>

                {/* Qty - Always editable with white background */}
                <td className="p-[10px] text-center">
                  <select
                    value={row.qty}
                    onChange={(e) => handleQuantityChange(row.equipmentId, e.target.value)}
                    className="w-[50px] px-[5px] py-[3px] rounded cursor-pointer text-center"
                    style={{ 
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </td>

                {/* Cost */}
                <td className="p-[10px] text-right">
                  {row.cost !== null ? formatPrice(row.cost) : ""}
                </td>

                {/* Brand */}
                <td className="p-[10px]">
                  {row.brand || ""}
                </td>

                {/* Vendor */}
<td className="p-[10px]">
  {isCustomMode ? (
    row.vendorId ? (
      // Vendor selected - show name only with option to change
      <div className="flex items-center gap-[8px]">
        <span 
          style={{ 
            color: VENDOR_COLORS[row.vendorId] || "#333",
            fontSize: "18px",
          }}
        >
          {row.vendor}
        </span>
        <button
          onClick={() => handleCustomVendorChange(row.equipmentId, null)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#999",
            cursor: "pointer",
            fontSize: "12px",
            padding: "2px 6px",
          }}
          title="Change vendor"
        >
          ✕
        </button>
      </div>
    ) : (
      // No vendor selected - show dropdown
      <select
        value=""
        onChange={(e) => handleCustomVendorChange(row.equipmentId, e.target.value)}
        className="w-full px-[8px] py-[5px] rounded cursor-pointer"
        style={{ 
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          fontFamily: "Lexend, sans-serif",
          fontSize: "13px",
          color: "#666",
        }}
      >
        <option value="">-- Select Vendor --</option>
        {getVendorOptions(row.equipmentId).map(opt => (
          <option key={opt.vendorid} value={opt.vendorid}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  ) : (
    <span style={{ color: row.vendorId ? (VENDOR_COLORS[row.vendorId] || "#333") : "#333" }}>
      {row.vendor || ""}
    </span>
  )}
</td>
              </tr>
              {index < mainTableData.rows.length - 1 && (
      <tr>
        <td colSpan={6} style={{ padding: 0 }}>
          <div 
            style={{ 
              borderBottom: "1px solid #ddd",
              marginLeft: "10px",
              marginRight: "10px",
            }} 
          />
        </td>
      </tr>
    )}
  </React.Fragment>
            ))}

            {/* Totals Row */}
            <tr style={{ borderTop: "2px solid #333", fontWeight: "600" }}>
              <td className="p-[10px]"></td>
              <td className="p-[10px] text-center">
                {mainTableData.avgScore > 0 ? mainTableData.avgScore.toFixed(2) : ""}
              </td>
              <td className="p-[10px]"></td>
              <td className="p-[10px] text-right">
                {mainTableData.totalCost > 0 ? formatPrice(mainTableData.totalCost) : ""}
              </td>
              <td className="p-[10px]"></td>
              <td className="p-[10px]"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footnote */}
      <div className="mb-[30px] text-[11px] text-gray-600 italic" style={{ fontFamily: "Lexend, sans-serif" }}>
        * Costs are based on "All In Unit Costs" which include the base quoted price for the
        equipment plus an allocated amount for delivery, installation, and sales tax.
      </div>

{/* Yellow/Red Expandable Bar */}
<div
  onClick={() => setIsWeightsSectionOpen(!isWeightsSectionOpen)}
  className="cursor-pointer transition-all duration-200"
  style={{
    backgroundColor: hasCustomWeights 
      ? "#A94442"  // Subdued red when custom weights applied
      : (isWeightsSectionOpen ? "#90EE90" : "#FFD700"),
    padding: "15px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "Lexend, sans-serif",
    fontSize: "18px",
    fontWeight: "600",
    color: hasCustomWeights ? "#fff" : "#333",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.opacity = "0.85";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.opacity = "1";
  }}
>
  {hasCustomWeights
    ? "Custom Weights Applied. Click Here to Change or Revert Back to Default Weights"
    : (isWeightsSectionOpen 
        ? "Hide Custom Weights" 
        : "Click Here to Assign Your Own Weights to Evaluation Criteria"
      )
  }
</div>

      {/* Expandable Section: Custom Weights + Table 1 */}
      {isWeightsSectionOpen && (
        <div 
          className="flex gap-[30px]"
          style={{ 
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          {/* Left: Custom Weights Table */}
          <div style={{ minWidth: "320px" }}>
            <table style={{ fontFamily: "Lexend, sans-serif", fontSize: "14px", width: "100%" }}>
              <thead>
                <tr>
                  <th className="text-left p-[8px]"></th>
                  <th className="text-center p-[8px]" style={{ color: "#007BFF" }}>
                    Default<br/>Weight
                  </th>
                  <th className="text-center p-[8px]" style={{ color: "#28A745" }}>
                    Custom<br/>Weight
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(DEFAULT_WEIGHTS).map((key) => (
                  <tr key={key} style={{ borderBottom: "1px solid #ddd" }}>
                    <td className="p-[8px]" style={{ fontWeight: "500" }}>
                      {key} - {SCORE_LABELS[key]}
                    </td>
                    <td className="p-[8px] text-center" style={{ color: "#007BFF" }}>
                      {DEFAULT_WEIGHTS[key]}%
                    </td>
                    <td className="p-[8px] text-center">
                      <input
                        type="text"
                        value={customWeightsInput[key]}
                        onChange={(e) => handleCustomWeightChange(key, e.target.value)}
                        className="w-[50px] text-center rounded"
                        style={{
                          border: "1px solid #ccc",
                          padding: "4px",
                          fontSize: "14px",
                        }}
                      />
                    </td>
                  </tr>
                ))}
                {/* S12 Overall Score Row */}
                <tr style={{ borderTop: "2px solid #333" }}>
                  <td className="p-[8px]" style={{ fontWeight: "600" }}>
                    S12 - Overall Score
                  </td>
                  <td className="p-[8px] text-center" style={{ color: "#007BFF", fontWeight: "600" }}>
                    100%
                  </td>
                  <td className="p-[8px] text-center">
                    <div
                      className="w-[50px] mx-auto rounded"
                      style={{
                        padding: "4px",
                        minWidth: "50px",
                        minHeight: "18px",
                        backgroundColor: !hasAnyCustomInput ? "#fff" : (isValidCustomSum ? "#28A745" : "#DC3545"),
                        color: !hasAnyCustomInput ? "#999" : "#fff",
                        fontWeight: "600",
                        border: "1px solid #ccc",
                      }}
                    >
                      {hasAnyCustomInput ? `${customWeightsSum}%` : ""}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Buttons */}
            <div className="flex gap-[10px] mt-[15px]">
              <button
                onClick={handleResetDefault}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "Lexend, sans-serif",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                Reset to Default
              </button>
              <button
                onClick={handleApplyCustomWeights}
                style={{
                  padding: "8px 16px",
                  backgroundColor: isValidCustomSum ? "#28A745" : "#999",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: isValidCustomSum ? "pointer" : "not-allowed",
                  fontFamily: "Lexend, sans-serif",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                Apply Custom
              </button>
            </div>
          </div>

          {/* Right: Table 1 (Comparison Grid) */}
          <div style={{ flex: 1, overflowX: "auto" }}>
            <table
              className="border-collapse"
              style={{ fontSize: "12px", fontFamily: "Lexend, sans-serif", width: "100%" }}
            >
              <thead>
                <tr>
                  <th
                    className="p-[5px] text-left bg-gray-50"
                    style={{ borderBottom: "1px solid #BBBBBB", width: "100px" }}
                  >
                    {/* Empty for equipment */}
                  </th>
                  {vendorData.vendors.map((vendor) => (
                    <th
                      key={vendor.vendorid}
                      className="p-[5px] text-center bg-gray-50"
                      style={{
                        borderBottom: "1px solid #BBBBBB",
                        color: VENDOR_COLORS[vendor.vendorid] || "#00A3A8",
                        fontWeight: 500,
                        fontSize: "11px",
                      }}
                    >
                      {vendor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EQUIPMENT_LIST.map((equip) => (
                  <tr key={equip.id}>
                    {/* Equipment Name */}
                    <td
                      className="p-[5px] font-medium"
                      style={{
                        borderBottom: "1px solid #ddd",
                        color: "#88C828",
                        fontWeight: 500,
                        fontSize: "11px",
                      }}
                    >
                      {equip.name}
                    </td>

                    {/* Vendor Cells */}
                    {vendorData.vendors.map((vendor) => {
                      const product = getProduct(equip.id, vendor.vendorid);
                      const isSelected = scenarioWinners[equip.id] === vendor.vendorid;

                      return (
                        <td
                          key={vendor.vendorid}
                          className="p-[5px]"
                          style={{ borderBottom: "1px solid #ddd" }}
                        >
                          {product ? (
                            <div className="flex items-start gap-[4px] justify-center">
                              {/* Checkbox (display only) */}
                              <div 
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  border: isSelected ? "2px solid #064f20" : "2px solid #999",
                                  borderRadius: "3px",
                                  backgroundColor: isSelected ? "#3fad5d" : "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                {isSelected && (
                                  <span style={{ color: "#fff", fontSize: "8px", fontWeight: "bold" }}>✓</span>
                                )}
                              </div>

                              {/* Brand, Price, Score */}
                              <div className="text-center" style={{ fontSize: "10px" }}>
                                <div style={{ color: "#ff8100", fontWeight: 500 }}>
                                  {product.brand}
                                </div>
                                <div className="text-gray-700">
                                  {formatPrice(product.allInUnitPrice)}
                                </div>
                                <div className="text-gray-700">
                                  {getDisplayScore(product).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-center text-[10px]">N/A</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Vendor Average Score Row */}
                <tr>
                  <td
                    className="p-[5px] font-medium"
                    style={{
                      borderBottom: "1px solid #ddd",
                      color: "#000",
                      fontWeight: 500,
                      fontSize: "11px",
                    }}
                  >
                    Vendor Average Score
                  </td>
                  {vendorData.vendors.map((vendor) => {
                    const isHighest = vendor.vendorid === highestVendorId;
                    return (
                      <td
                        key={vendor.vendorid}
                        className="p-[5px]"
                        style={{ borderBottom: "1px solid #ddd" }}
                      >
                        <div className="flex items-center gap-[4px] justify-center">
                          <div 
                            style={{
                              width: "12px",
                              height: "12px",
                              border: isHighest ? "2px solid #064f20" : "2px solid #999",
                              borderRadius: "3px",
                              backgroundColor: isHighest ? "#3fad5d" : "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isHighest && (
                              <span style={{ color: "#fff", fontSize: "8px", fontWeight: "bold" }}>✓</span>
                            )}
                          </div>
                          <div className="text-gray-700 font-semibold" style={{ fontSize: "11px" }}>
                            {vendorAverageScores[vendor.vendorid].toFixed(2)}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
                
                {/* Total Vendor Cost Row */}
                <tr>
                  <td
                    className="p-[5px] font-medium"
                    style={{
                      borderBottom: "1px solid #ddd",
                      color: "#FF073A",
                      fontWeight: 500,
                      fontSize: "11px",
                    }}
                  >
                    Total Vendor Cost
                  </td>
                  {vendorData.vendors.map((vendor) => {
                    // Calculate total cost for this vendor (all equipment, qty from state)
                    let vendorTotalCost = 0;
                    EQUIPMENT_LIST.forEach((equip) => {
                      const product = getProduct(equip.id, vendor.vendorid);
                      if (product) {
                        const qty = quantities[equip.id] || 0;
                        vendorTotalCost += qty * product.allInUnitPrice;
                      }
                    });
                    
                    return (
                      <td
                        key={vendor.vendorid}
                        className="p-[5px]"
                        style={{ borderBottom: "1px solid #ddd" }}
                      >
                        <div className="flex items-center justify-center">
                          <div className="font-semibold" style={{ color: "#FF073A", fontSize: "11px" }}>
                            {formatPrice(vendorTotalCost)}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      )}

      
    </div>
  );
}