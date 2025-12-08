import React, { useState, useMemo, useEffect } from "react";
import vendorData from "./data/vendorData.json";

// Scenario options with their corresponding score field
const SCENARIO_OPTIONS = [
  { id: "highestOverall", label: "Highest Equipment Overall Score", scoreField: "S12" },
  { id: "singleVendor", label: "Highest Vendor Overall Score", scoreField: "S12" },
  { id: "mostReliable", label: "Most Reliable", scoreField: "S01" },
  { id: "greatestEaseOfUse", label: "Greatest Ease of Use", scoreField: "S02" },
  { id: "lowestPrice", label: "Lowest Price", scoreField: "S04" },
  { id: "bestLooking", label: "Best Looking", scoreField: "S05" },
  { id: "bestBuildQuality", label: "Best Build Quality", scoreField: "S06" },
  { id: "mostDurable", label: "Most Durable", scoreField: "S07" },
  { id: "bestServiceParts", label: "Best Svc/Parts Availability", scoreField: "S08" },
  { id: "bestWarranty", label: "Best Warranty", scoreField: "S09" },
  { id: "smallestFootprint", label: "Smallest Footprint", scoreField: "S10" },
  { id: "custom", label: "Custom", scoreField: "S12" },
];

// Default weights
const DEFAULT_WEIGHTS = {
  S01: 22,
  S02: 18,
  S03: 6,
  S04: 12,
  S05: 12,
  S06: 8,
  S07: 8,
  S08: 8,
  S09: 4,
  S10: 1,
  S11: 1,
};

// Score field labels for display
const SCORE_LABELS = {
  S01: "Reliability",
  S02: "Ease of Use",
  S03: "Stack/Step Up",
  S04: "Price",
  S05: "Aesthetics",
  S06: "Build Quality",
  S07: "Durability",
  S08: "Svc/Parts Avail.",
  S09: "Warranty",
  S10: "Footprint",
  S11: "Weight",
  S12: "Overall",
};

// Helper to format price (whole dollars)
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Summary table box component
const SummaryBox = ({ children, width, isHeader = false, align = "left", height = 35 }) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`,
      border: "2px solid #BBBBBB",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
      padding: "0 12px",
      fontWeight: isHeader ? "600" : "400",
      backgroundColor: "#f1f1f0",
    }}
  >
    {children}
  </div>
);

// Function to calculate custom overall score
const calculateCustomOverallScore = (product, weights) => {
  if (!weights) return product.S12 || product.overallScore || 0;
  
  const weightedScore = 
    (product.S01 || 0) * (weights.S01 / 100) +
    (product.S02 || 0) * (weights.S02 / 100) +
    (product.S03 || 0) * (weights.S03 / 100) +
    (product.S04 || 0) * (weights.S04 / 100) +
    (product.S05 || 0) * (weights.S05 / 100) +
    (product.S06 || 0) * (weights.S06 / 100) +
    (product.S07 || 0) * (weights.S07 / 100) +
    (product.S08 || 0) * (weights.S08 / 100) +
    (product.S09 || 0) * (weights.S09 / 100) +
    (product.S10 || 0) * (weights.S10 / 100) +
    (product.S11 || 0) * (weights.S11 / 100);
  
  return weightedScore;
};

// Weights Box Component
const WeightsBox = ({ 
  customWeights, 
  setCustomWeights, 
  hasCustomWeights, 
  onApplyCustom, 
  onResetDefault 
}) => {
  const scoreKeys = ["S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10", "S11"];
  
  // Calculate custom weights sum
  const customSum = useMemo(() => {
    return scoreKeys.reduce((sum, key) => {
      const val = parseInt(customWeights[key], 10);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [customWeights]);

  const isValidSum = customSum === 100;

  // Handle custom weight input change
  const handleCustomChange = (key, value) => {
    // Allow empty string or numbers only
    if (value === "" || /^\d*$/.test(value)) {
      const numVal = value === "" ? "" : Math.min(100, parseInt(value, 10) || 0);
      setCustomWeights(prev => ({ ...prev, [key]: numVal }));
    }
  };

  // Handle Apply Custom click
  const handleApplyClick = () => {
    if (!isValidSum) {
      alert(`Weights must total 100%. Current total: ${customSum}%`);
      return;
    }
    onApplyCustom();
  };

  return (
    <div
      style={{
        backgroundColor: "#BBBBBB",
        border: "2px solid #000080",
        borderRadius: "10px",
        padding: "15px 20px",
        marginBottom: "20px",
        width: "fit-content"
      }}
    >
      {/* Header Row - S01 to S12 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ width: "130px" }}></div>
        {scoreKeys.map(key => (
          <div
            key={key}
            style={{
              width: "60px",
              textAlign: "center",
              color: "#000080",
              fontWeight: "400",
              fontSize: "14px",
              fontFamily: "Lexend, sans-serif",
            }}
          >
            {key}
          </div>
        ))}
        <div
          style={{
            width: "60px",
            textAlign: "center",
            color: "#000080",
            fontWeight: "400",
            fontSize: "14px",
            fontFamily: "Lexend, sans-serif",
          }}
        >
          S12
        </div>
        <div style={{ width: "120px" }}></div>
      </div>

      {/* Default Weights Row */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <div
          style={{
            width: "100px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "8px 15px",
            textAlign: "center",
            color: "#007BFF",
            fontWeight: "400",
            fontSize: "14px",
            fontFamily: "Lexend, sans-serif",
          }}
        >
          Default Weight
        </div>
        {scoreKeys.map(key => (
          <div
            key={key}
            style={{
              width: "50px",
              margin: "0 5px",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "8px 0",
              textAlign: "center",
              color: hasCustomWeights ? "white" : "#000080",
              fontWeight: "400",
              fontSize: "14px",
              fontFamily: "Lexend, sans-serif",
            }}
          >
            {DEFAULT_WEIGHTS[key]}%
          </div>
        ))}
        <div
          style={{
            width: "50px",
            margin: "0 5px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "8px 0",
            textAlign: "center",
            color: hasCustomWeights ? "white" : "#000080",
            fontWeight: "400",
            fontSize: "14px",
            fontFamily: "Lexend, sans-serif",
          }}
        >
          100%
        </div>
        <button
          onClick={onResetDefault}
          style={{
            width: "120px",
            marginLeft: "10px",
            backgroundColor: "#005abe",
            color: "white",
            borderRadius: "20px",
            padding: "8px 15px",
            border: "none",
            cursor: "pointer",
            fontWeight: "400",
            fontSize: "14px",
            fontFamily: "Lexend, sans-serif",
          }}
        >
          Reset Default
        </button>
      </div>

      {/* Custom Weights Row */}
<div style={{ display: "flex", alignItems: "center" }}>
  <div
    style={{
      width: "100px",
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "8px 15px",
      textAlign: "center",
      color: "#28A745",
      fontWeight: 400,
      fontSize: "14px",
      fontFamily: "Lexend, sans-serif",
    }}
  >
    Custom Weight
  </div>
  {scoreKeys.map(key => (
    <input
      key={key}
      type="text"
      value={customWeights[key]}
      onChange={(e) => handleCustomChange(key, e.target.value)}
      placeholder=""
      style={{
        width: "50px",
        margin: "0 5px",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "8px 0",
        textAlign: "center",
        color: "#000080",
        fontWeight: 400,
        fontSize: "14px",
        fontFamily: "Lexend, sans-serif",
        border: "none",
        outline: "none",
      }}
    />
  ))}
  <div
    style={{
      width: "50px",
      margin: "0 5px",
      backgroundColor: customSum === 0 ? "white" : (isValidSum ? "#28A745" : "#DC3545"),
      borderRadius: "20px",
      padding: "8px 0",
      textAlign: "center",
      color: customSum === 0 ? "white" : "white",
      fontWeight: 400,
      fontSize: "14px",
      fontFamily: "Lexend, sans-serif",
      minHeight: "16px",
    }}
  >
    {customSum === 0 ? "" : `${customSum}%`}
  </div>
  <button
    onClick={handleApplyClick}
    style={{
      width: "120px",
      marginLeft: "10px",
      backgroundColor: "#28A745",
      color: "white",
      borderRadius: "20px",
      padding: "8px 15px",
      border: "none",
      cursor: "pointer",
      fontWeight: 400,
      fontSize: "14px",
      fontFamily: "Lexend, sans-serif",
    }}
  >
    Apply Custom
  </button>
</div>
    </div>
  );
};

export default function Scenarios() {
  // State
  const [selectedScenario, setSelectedScenario] = useState("highestOverall");
  const [quantities, setQuantities] = useState({});
  const [selections, setSelections] = useState({}); // { equipmentId: vendorId }
  
  // Custom weights state
  const [customWeightsInput, setCustomWeightsInput] = useState({
    S01: "", S02: "", S03: "", S04: "", S05: "", S06: "", S07: "", S08: "", S09: "", S10: "", S11: ""
  });
  const [appliedCustomWeights, setAppliedCustomWeights] = useState(null);

  const hasCustomWeights = appliedCustomWeights !== null;

  // Get default quantities from JSON
  const defaultQuantities = useMemo(() => {
    const defaults = {};
    vendorData.equipment.forEach((equip) => {
      const product = vendorData.products.find((p) => p.equipmentid === equip.equipmentid);
      defaults[equip.equipmentid] = product?.qty || 1;
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

  // Get the display score for a product based on scenario
  const getDisplayScore = (product) => {
    if (!product) return 0;
    
    const scoreField = currentScenario.scoreField;
    
    // For S12 (Overall Score), use custom weights if applied
    if (scoreField === "S12" && hasCustomWeights) {
      return calculateCustomOverallScore(product, appliedCustomWeights);
    }
    
    // For all other scenarios, return the specific criterion score
    return product[scoreField] || 0;
  };

  // Calculate vendor average scores based on current scenario
  const vendorAverageScores = useMemo(() => {
    const scores = {};
    vendorData.vendors.forEach((vendor) => {
      let totalScore = 0;
      let count = 0;
      vendorData.equipment.forEach((equip) => {
        const product = vendorData.products.find(
          (p) => p.equipmentid === equip.equipmentid && p.vendorid === vendor.vendorid
        );
        if (product) {
          totalScore += getDisplayScore(product);
          count++;
        }
      });
      scores[vendor.vendorid] = count > 0 ? totalScore / 7 : 0; // Always divide by 7
    });
    return scores;
  }, [currentScenario, appliedCustomWeights, hasCustomWeights]);

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

  // Calculate which vendor wins for each equipment based on scenario
  const calculateSelections = useMemo(() => {
    const newSelections = {};

    if (selectedScenario === "custom") {
      // Custom mode: no auto-selections
      return {};
    }

    if (selectedScenario === "singleVendor") {
      // Select all equipment from the vendor with highest average score
      if (highestVendorId) {
        vendorData.equipment.forEach((equip) => {
          const product = vendorData.products.find(
            (p) => p.equipmentid === equip.equipmentid && p.vendorid === highestVendorId
          );
          if (product) {
            newSelections[equip.equipmentid] = highestVendorId;
          }
        });
      }
    } else {
      // Standard scenario: select highest score for the relevant field
      vendorData.equipment.forEach((equip) => {
        const productsForEquip = vendorData.products.filter(
          (p) => p.equipmentid === equip.equipmentid
        );
        if (productsForEquip.length === 0) return;

        const maxScore = Math.max(...productsForEquip.map(p => getDisplayScore(p)));
        const winner = productsForEquip.find(
          (p) => Math.abs(getDisplayScore(p) - maxScore) < 0.001
        );
        if (winner) {
          newSelections[equip.equipmentid] = winner.vendorid;
        }
      });
    }

    return newSelections;
  }, [selectedScenario, currentScenario, appliedCustomWeights, hasCustomWeights, highestVendorId]);

  // Update selections when scenario changes
  useEffect(() => {
    if (selectedScenario !== "custom") {
      setSelections(calculateSelections);
      setQuantities(defaultQuantities);
    } else {
      // Custom mode: clear selections but keep quantities at defaults
      setSelections({});
    }
  }, [selectedScenario, calculateSelections, defaultQuantities]);

  // Handle scenario change
  const handleScenarioChange = (e) => {
    setSelectedScenario(e.target.value);
  };

  // Handle quantity change (only in custom mode)
  const handleQuantityChange = (equipmentId, newQty) => {
    if (selectedScenario !== "custom") return;
    setQuantities((prev) => ({
      ...prev,
      [equipmentId]: parseInt(newQty, 10),
    }));
  };

  // Handle checkbox change (only in custom mode)
  const handleCheckboxChange = (equipmentId, vendorId) => {
    if (selectedScenario !== "custom") return;

    // Check if already selected for this equipment
    if (selections[equipmentId] && selections[equipmentId] !== vendorId) {
      alert("You can only select one vendor per equipment. Please uncheck the current selection first.");
      return;
    }

    setSelections((prev) => {
      const newSelections = { ...prev };
      if (newSelections[equipmentId] === vendorId) {
        // Uncheck
        delete newSelections[equipmentId];
      } else {
        // Check
        newSelections[equipmentId] = vendorId;
      }
      return newSelections;
    });
  };

  // Get product for equipment/vendor combination
  const getProduct = (equipmentId, vendorId) => {
    return vendorData.products.find(
      (p) => p.equipmentid === equipmentId && p.vendorid === vendorId
    );
  };

  // Calculate summary data
  const summaryData = useMemo(() => {
    const data = [];
    let totalCost = 0;
    let totalScore = 0;
    let checkedCount = 0;

    vendorData.equipment.forEach((equip) => {
      const selectedVendorId = selections[equip.equipmentid];
      const qty = quantities[equip.equipmentid] || 1;

      if (selectedVendorId) {
        const product = getProduct(equip.equipmentid, selectedVendorId);
        if (product) {
          const cost = qty * product.allInUnitPrice;
          const score = getDisplayScore(product);

          data.push({
            equipment: equip.name,
            score: score,
            cost: cost,
            brand: product.brand,
            vendor: product.vendor,
            hasSelection: true,
          });

          totalCost += cost;
          totalScore += score;
          checkedCount++;
        }
      } else {
        // No selection for this equipment
        data.push({
          equipment: equip.name,
          score: null,
          cost: null,
          brand: null,
          vendor: null,
          hasSelection: false,
        });
      }
    });

    const avgScore = checkedCount > 0 ? totalScore / checkedCount : 0;

    return { rows: data, totalCost, avgScore, checkedCount };
  }, [selections, quantities, currentScenario, appliedCustomWeights, hasCustomWeights]);

  const isCustomMode = selectedScenario === "custom";

  // Handle applying custom weights
  const handleApplyCustomWeights = () => {
    const weights = {};
    Object.keys(customWeightsInput).forEach(key => {
      weights[key] = parseInt(customWeightsInput[key], 10) || 0;
    });
    setAppliedCustomWeights(weights);
  };

  // Handle resetting to default weights
  const handleResetDefault = () => {
    setAppliedCustomWeights(null);
    setCustomWeightsInput({
      S01: "", S02: "", S03: "", S04: "", S05: "", S06: "", S07: "", S08: "", S09: "", S10: "", S11: ""
    });
  };

  return (
    <div 
      className="w-full px-[80px] pb-[100px] pt-[20px]"
      style={{
        backgroundColor: hasCustomWeights ? "#FFFDE7" : "transparent",
        minHeight: "100%",
      }}
    >
      {/* Custom Weights Applied Indicator */}
      {hasCustomWeights && (
        <div 
          style={{ 
            textAlign: "right", 
            marginBottom: "15px",
            fontFamily: "Lexend, sans-serif",
            fontSize: "18px",
            fontWeight: "700",
            color: "#FF073A",
          }}
        >
          Custom Weights Applied
        </div>
      )}

      {/* Weights Box */}
      <WeightsBox
        customWeights={customWeightsInput}
        setCustomWeights={setCustomWeightsInput}
        hasCustomWeights={hasCustomWeights}
        onApplyCustom={handleApplyCustomWeights}
        onResetDefault={handleResetDefault}
      />

      {/* Dropdown */}
      <div className="mb-[30px]">
        <select
          value={selectedScenario}
          onChange={handleScenarioChange}
          className="w-[350px] px-[10px] py-[5px] mt-[20px] text-[18px] font-bold rounded-lg focus:outline-none cursor-pointer"
          style={{ 
            fontFamily: "Lexend, sans-serif",
            color: "#000000",
            border: "3px solid #000080",
          }}
        >
          {SCENARIO_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Selection Table */}
      <div className="mb-[10px] overflow-x-auto">
        <table
          className="border-collapse"
          style={{ fontSize: "14px", fontFamily: "Lexend, sans-serif" }}
        >
          <thead>
            <tr>
              <th
                className="p-[3px] text-left bg-gray-50"
                style={{ borderBottom: "1px solid #BBBBBB", width: "120px" }}
              >
                {/* Empty for equipment */}
              </th>
              <th
                className="p-[3px] text-center bg-gray-50"
                style={{ borderBottom: "1px solid #BBBBBB", width: "70px", fontWeight: 400 }}
              >
                Quantity
              </th>
              {vendorData.vendors.map((vendor) => (
                <th
                  key={vendor.vendorid}
                  className="p-[3px] text-center bg-gray-50"
                  style={{
                    borderBottom: "1px solid #BBBBBB",
                    color: "#00A3A8",
                    fontWeight: 400,
                    width: "10px",
                  }}
                >
                  {vendor.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vendorData.equipment.map((equip) => (
              <tr key={equip.equipmentid}>
                {/* Equipment Name */}
                <td
                  className="p-[3px] font-medium"
                  style={{
                    borderBottom: "1px solid #BBBBBB",
                    color: "#88C828",
                    fontWeight: 400,
                    width: "130px",
                  }}
                >
                  {equip.name}
                </td>

                {/* Quantity Dropdown */}
                <td
                  className="p-[3px] text-center"
                  style={{ borderBottom: "1px solid #BBBBBB", width: "90px" }}
                >
                  <select
                    value={quantities[equip.equipmentid] || 1}
                    onChange={(e) => handleQuantityChange(equip.equipmentid, e.target.value)}
                    disabled={!isCustomMode}
                    className={`w-14 px-[2px] py-[1px] border rounded text-center ${
                      isCustomMode ? "cursor-pointer" : "cursor-not-allowed bg-gray-100"
                    }`}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </td>

                {/* Vendor Cells */}
                {vendorData.vendors.map((vendor) => {
                  const product = getProduct(equip.equipmentid, vendor.vendorid);
                  const isSelected = selections[equip.equipmentid] === vendor.vendorid;

                  return (
                    <td
                      key={vendor.vendorid}
                      className="p-[7px]"
                      style={{ borderBottom: "1px solid #BBBBBB", width: "175px" }}
                    >
                      {product ? (
                        <div className="flex items-start gap-[5px] justify-center">
                          {/* Checkbox */}
                          <div 
                            onClick={() => isCustomMode && handleCheckboxChange(equip.equipmentid, vendor.vendorid)}
                            style={{
                              width: "14px",
                              height: "14px",
                              border: isSelected ? "2px solid #064f20" : "2px solid #999",
                              borderRadius: "3px",
                              backgroundColor: isSelected ? "#3fad5d" : "#fff",
                              cursor: isCustomMode ? "pointer" : "not-allowed",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isSelected && (
                              <span style={{ color: "#fff", fontSize: "10px", fontWeight: "bold" }}>✓</span>
                            )}
                          </div>

                          {/* Brand, Price, Score */}
                          <div className="text-center">
                            <div
                              className="font-medium"
                              style={{ color: "#ff8100" }}
                            >
                              {product.brand}
                            </div>
                            <div className="text-sm text-gray-700">
                              {formatPrice(product.allInUnitPrice)}
                            </div>
                            <div className="text-sm text-gray-700">
                              {getDisplayScore(product).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-center">N/A</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Vendor Average Score Row */}
            <tr>
              <td
                className="p-[10px] font-medium"
                style={{
                  borderBottom: "1px solid #BBBBBB",
                  color: "#000000",
                  fontWeight: 500,
                  width: "140px",
                }}
              >
                Vendor Average Score
              </td>
              <td
                className="p-[3px text-center"
                style={{ borderBottom: "1px solid #BBBBBB", width: "90px" }}
              >
                {/* Empty - no quantity for this row */}
              </td>
              {vendorData.vendors.map((vendor) => {
                const isHighest = vendor.vendorid === highestVendorId;
                return (
                  <td
                    key={vendor.vendorid}
                    className="p-[3px]"
                    style={{ borderBottom: "1px solid #BBBBBB", width: "175px" }}
                  >
                    <div className="flex items-center gap-[5px] justify-center">
                      {/* Checkbox (display only) */}
                      <div 
                        style={{
                          width: "14px",
                          height: "14px",
                          border: isHighest ? "2px solid #064f20" : "2px solid #999",
                          borderRadius: "3px",
                          backgroundColor: isHighest ? "#3fad5d" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isHighest && (
                          <span style={{ color: "#fff", fontSize: "10px", fontWeight: "bold" }}>✓</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-700 font-semibold">
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
    className="p-[10px] font-medium"
    style={{
      borderBottom: "1px solid #BBBBBB",
      color: "#FF073A",
      fontWeight: 400,
      width: "140px",
    }}
  >
    Total Vendor Cost
  </td>
  <td
    className="p-[3px] text-center"
    style={{ borderBottom: "1px solid #BBBBBB", width: "90px" }}
  >
    {/* Empty - no quantity for this row */}
  </td>
  {vendorData.vendors.map((vendor) => {
    // Calculate total cost for this vendor
    let vendorTotalCost = 0;
    vendorData.equipment.forEach((equip) => {
      const product = getProduct(equip.equipmentid, vendor.vendorid);
      if (product) {
        const qty = quantities[equip.equipmentid] || 1;
        
        if (isCustomMode) {
          // In custom mode, only include if ANY vendor is selected for this equipment
          const hasAnySelection = selections[equip.equipmentid] !== undefined;
          if (hasAnySelection) {
            vendorTotalCost += qty * product.allInUnitPrice;
          }
        } else {
          // In non-custom mode, include all equipment
          vendorTotalCost += qty * product.allInUnitPrice;
        }
      }
    });
    
    return (
      <td
        key={vendor.vendorid}
        className="p-[3px]"
        style={{ borderBottom: "1px solid #BBBBBB", width: "175px" }}
      >
        <div className="flex items-center justify-center">
          <div className="text-sm font-semibold" style={{ color: "#FF073A" }}>
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

      {/* Table 1 Footnote */}
      <div className="mb-[40px] text-[10px] text-gray-600 italic" style={{ fontFamily: "Lexend, sans-serif" }}>
        
      </div>

      {/* Summary Table */}
      <div
        className="inline-block p-4 rounded-lg"
        style={{
          border: "4px solid #000080",
        }}
      >
        <div
          className="flex flex-col gap-[2px]"
          style={{ fontSize: "18px", fontFamily: "Lexend, sans-serif" }}
        >
          {/* Header Row */}
          <div className="flex gap-[10px] mt-[20px] ml-[20px] mr-[20px] mb-[2px]">
            <SummaryBox width={220} isHeader align="center" height={50}>Equipment</SummaryBox>
            <SummaryBox width={100} isHeader align="center" height={50}>
              <div className="flex flex-col items-center">
                <span>Score</span>
                <span style={{ fontSize: "10px", fontWeight: "400", color: "#666" }}>
                  ({SCORE_LABELS[currentScenario.scoreField] || "Overall"})
                </span>
              </div>
            </SummaryBox>
            <SummaryBox width={140} isHeader align="center" height={50}>Cost*</SummaryBox>
            <SummaryBox width={200} isHeader align="center" height={50}>Brand</SummaryBox>
            <SummaryBox width={240} isHeader align="center" height={50}>Vendor</SummaryBox>
          </div>

          {/* Data Rows */}
          {summaryData.rows.map((row) => (
            <div key={row.equipment} className="flex gap-[10px] mt-[8px] ml-[20px] mr-[20px] mb-[-4px]">
              <SummaryBox width={220}>{row.equipment}</SummaryBox>
              <SummaryBox width={100} align="center">
                {row.hasSelection ? row.score.toFixed(2) : ""}
              </SummaryBox>
              <SummaryBox width={140} align="right">
                {row.hasSelection ? formatPrice(row.cost) : ""}
              </SummaryBox>
              <SummaryBox width={200}>{row.brand || ""}</SummaryBox>
              <SummaryBox width={240}>{row.vendor || ""}</SummaryBox>
            </div>
          ))}

          {/* Totals Row */}
          <div className="flex gap-[10px] mt-[8px] ml-[47px] mr-[20px] mb-[20px]">
             <div style={{ width: "220px" }}></div>
                <SummaryBox width={100} align="center">
                    {summaryData.checkedCount > 0 ? summaryData.avgScore.toFixed(2) : ""}
                </SummaryBox>
                <SummaryBox width={140} align="right">
                    {summaryData.checkedCount > 0 ? formatPrice(summaryData.totalCost) : ""}
                </SummaryBox>
          </div>
        </div>
      </div>

      {/* Footnote */}
      <div className="mt-[8px] text-[10px] text-gray-600 italic" style={{ fontFamily: "Lexend, sans-serif" }}>
        * Costs are based on "All In Unit Costs" which include the base quoted price for the
        equipment plus an allocated amount for delivery, installation, and sales tax.<br />
      </div>
    </div>
  );
}