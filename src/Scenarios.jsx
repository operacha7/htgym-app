import React, { useState, useMemo, useEffect } from "react";
import vendorData from "./data/vendorData.json";
import whatIfButtonImg from "./assets/whatifbutton.jpeg";
import CustomWeightsModal from "./CustomWeightsModal.jsx";

// Scenario options with their corresponding score field
const SCENARIO_OPTIONS = [
  { id: "highestOverall", label: "Highest Equipment Overall Score", scoreField: "S12", allowedWithCustomWeights: true },
  { id: "singleVendor", label: "Highest Vendor Overall Score", scoreField: "S12", allowedWithCustomWeights: true },
  { id: "mostReliable", label: "Most Reliable", scoreField: "S01", allowedWithCustomWeights: false },
  { id: "greatestEaseOfUse", label: "Greatest Ease of Use", scoreField: "S02", allowedWithCustomWeights: false },
  { id: "lowestPrice", label: "Lowest Price", scoreField: "S04", allowedWithCustomWeights: false },
  { id: "bestLooking", label: "Best Looking", scoreField: "S05", allowedWithCustomWeights: false },
  { id: "bestBuildQuality", label: "Best Build Quality", scoreField: "S06", allowedWithCustomWeights: false },
  { id: "mostDurable", label: "Most Durable", scoreField: "S07", allowedWithCustomWeights: false },
  { id: "bestServiceParts", label: "Best Svc/Parts Availability", scoreField: "S08", allowedWithCustomWeights: false },
  { id: "bestWarranty", label: "Best Warranty", scoreField: "S09", allowedWithCustomWeights: false },
  { id: "smallestFootprint", label: "Smallest Footprint", scoreField: "S10", allowedWithCustomWeights: false },
  { id: "custom", label: "Custom", scoreField: "S12", allowedWithCustomWeights: true },
];

// Score field labels for display (shorter versions for Table 2 header)
const SCORE_LABELS = {
  S01: "Reliability",
  S02: "Ease of Use",
  S04: "Price",
  S05: "Aesthetics",
  S06: "Build Quality",
  S07: "Durability",
  S08: "Svc/Parts Avail.",
  S09: "Warranty",
  S10: "Footprint",
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

export default function Scenarios() {
  // State
  const [selectedScenario, setSelectedScenario] = useState("highestOverall");
  const [quantities, setQuantities] = useState({});
  const [selections, setSelections] = useState({}); // { equipmentId: vendorId }
  
  // Custom weights state
  const [customWeights, setCustomWeights] = useState(null);
  const [isWeightsModalOpen, setIsWeightsModalOpen] = useState(false);

  const hasCustomWeights = customWeights !== null;

  // Reset to allowed scenario if custom weights are applied and current scenario is not allowed
  useEffect(() => {
    if (hasCustomWeights) {
      const currentOption = SCENARIO_OPTIONS.find(s => s.id === selectedScenario);
      if (currentOption && !currentOption.allowedWithCustomWeights) {
        setSelectedScenario("highestOverall");
      }
    }
  }, [hasCustomWeights, selectedScenario]);

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

  // Calculate vendor overall scores (average of all equipment scores for each vendor)
  const vendorOverallScores = useMemo(() => {
    const scores = {};
    vendorData.vendors.forEach((vendor) => {
      let totalScore = 0;
      let count = 0;
      vendorData.equipment.forEach((equip) => {
        const product = vendorData.products.find(
          (p) => p.equipmentid === equip.equipmentid && p.vendorid === vendor.vendorid
        );
        if (product) {
          const score = hasCustomWeights 
            ? calculateCustomOverallScore(product, customWeights)
            : (product.overallScore || product.S12 || 0);
          totalScore += score;
          count++;
        }
      });
      scores[vendor.vendorid] = count > 0 ? totalScore / 7 : 0; // Always divide by 7
    });
    return scores;
  }, [customWeights, hasCustomWeights]);

  // Calculate which vendor wins for each equipment based on scenario
  const calculateSelections = useMemo(() => {
    const newSelections = {};

    if (selectedScenario === "custom") {
      // Custom mode: no auto-selections
      return {};
    }

    if (selectedScenario === "singleVendor") {
      // Find vendor with most highest scores
      const vendorWins = {};
      vendorData.vendors.forEach((v) => {
        vendorWins[v.vendorid] = 0;
      });

      vendorData.equipment.forEach((equip) => {
        const productsForEquip = vendorData.products.filter(
          (p) => p.equipmentid === equip.equipmentid
        );
        if (productsForEquip.length === 0) return;

        // Use custom weights if available
        const getScore = (p) => hasCustomWeights 
          ? calculateCustomOverallScore(p, customWeights)
          : (p.S12 || 0);

        const maxScore = Math.max(...productsForEquip.map(getScore));
        const winner = productsForEquip.find((p) => Math.abs(getScore(p) - maxScore) < 0.001);
        if (winner) {
          vendorWins[winner.vendorid]++;
        }
      });

      // Find vendor with most wins
      let topVendor = null;
      let maxWins = 0;
      Object.entries(vendorWins).forEach(([vendorid, wins]) => {
        if (wins > maxWins) {
          maxWins = wins;
          topVendor = vendorid;
        }
      });

      // Select all equipment from that vendor
      if (topVendor) {
        vendorData.equipment.forEach((equip) => {
          const product = vendorData.products.find(
            (p) => p.equipmentid === equip.equipmentid && p.vendorid === topVendor
          );
          if (product) {
            newSelections[equip.equipmentid] = topVendor;
          }
        });
      }
    } else {
      // Standard scenario: select highest score for the relevant field
      const scoreField = currentScenario.scoreField;

      vendorData.equipment.forEach((equip) => {
        const productsForEquip = vendorData.products.filter(
          (p) => p.equipmentid === equip.equipmentid
        );
        if (productsForEquip.length === 0) return;

        // Use custom weights for S12 scenarios
        const getScore = (p) => {
          if (scoreField === "S12" && hasCustomWeights) {
            return calculateCustomOverallScore(p, customWeights);
          }
          return p[scoreField] || 0;
        };

        const maxScore = Math.max(...productsForEquip.map(getScore));
        const winner = productsForEquip.find(
          (p) => Math.abs(getScore(p) - maxScore) < 0.001
        );
        if (winner) {
          newSelections[equip.equipmentid] = winner.vendorid;
        }
      });
    }

    return newSelections;
  }, [selectedScenario, currentScenario, customWeights, hasCustomWeights]);

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

  // Get the display score for a product (uses custom weights if active)
  const getDisplayScore = (product) => {
    if (!product) return 0;
    if (hasCustomWeights) {
      return calculateCustomOverallScore(product, customWeights);
    }
    return product.overallScore || product.S12 || 0;
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
          
          // Use custom weights for score if active, otherwise use scenario score field
          let score;
          if (hasCustomWeights) {
            score = calculateCustomOverallScore(product, customWeights);
          } else {
            score = product[currentScenario.scoreField] || product.S12 || 0;
          }

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
  }, [selections, quantities, currentScenario, customWeights, hasCustomWeights]);

  const isCustomMode = selectedScenario === "custom";

  // Handle applying custom weights
  const handleApplyWeights = (weights) => {
    setCustomWeights(weights);
    setIsWeightsModalOpen(false);
  };

  // Handle clearing custom weights
  const handleClearWeights = () => {
    setCustomWeights(null);
  };

  return (
    <div 
      className="w-full px-[80px] pb-[100px] pt-[20px]"
      style={{
        backgroundColor: hasCustomWeights ? "#FFFDE7" : "transparent",
        minHeight: "100%",
      }}
    >
      {/* Dropdown and What-If Button Row */}
      <div className="mb-[30px] flex justify-between items-start">
        {/* Dropdown on the left */}
        <select
          value={selectedScenario}
          onChange={handleScenarioChange}
          className="w-[350px] px-[10px] py-[5px] text-[18px] font-bold rounded-lg focus:outline-none cursor-pointer"
          style={{ 
            fontFamily: "Lexend, sans-serif",
            color: "#000000",
            border: "3px solid #000080",
          }}
        >
          {SCENARIO_OPTIONS.map((option) => {
            const isDisabled = hasCustomWeights && !option.allowedWithCustomWeights;
            return (
              <option 
                key={option.id} 
                value={option.id}
                disabled={isDisabled}
                style={{
                  color: isDisabled ? "#BBBBBB" : "#000000",
                }}
              >
                {option.label}
              </option>
            );
          })}
        </select>

        {/* What-If Button container with label */}
        <div className="flex flex-col items-center">
          {/* Custom Weights label - only shows when active */}
          {hasCustomWeights && (
            <span 
              style={{ 
                fontFamily: "Lexend, sans-serif", 
                color: "#FF000D", 
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "14px",
              }}
            >
              Custom Weights
            </span>
          )}
          
          {/* What-If Button */}
          <button
            onClick={() => setIsWeightsModalOpen(true)}
className={`
  w-[300px] 
  h-[42px] 
  p-0 
  m-0
  rounded-[8px]
  transition duration-150
  hover:scale-[1.03]
  active:scale-[0.98]
  relative 
  overflow-hidden
  shadow-[0_0_25px_#FFC066]
`}
          >
            <img 
              src={whatIfButtonImg} 
              alt="What If"
              className="
                -ml-[6px] 
                -mt-[1px]
                w-[300px] 
                h-[42px]
                object-cover 
                block
              "
            />
          </button>
        </div>
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
                style={{ borderBottom: "1px solid #BBBBBB", width: "70px", fontWeight: "400" }}
              >
                Quantity
              </th>
              {vendorData.vendors.map((vendor) => (
                <th
                  key={vendor.vendorid}
                  className="p-[3px] text-center bg-gray-50 font-medium"
                  style={{
                    borderBottom: "1px solid #BBBBBB",
                    color: "#00A3A8",
                    fontWeight: "400",
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
                  className="p-3 font-medium"
                  style={{
                    borderBottom: "1px solid #BBBBBB",
                    color: "#88C828",
                    fontWeight: "400",
                    width: "130px",
                  }}
                >
                  {equip.name}
                </td>

                {/* Quantity Dropdown */}
                <td
                  className="p-3 text-center"
                  style={{ borderBottom: "1px solid #BBBBBB", width: "90px" }}
                >
                  <select
                    value={quantities[equip.equipmentid] || 1}
                    onChange={(e) => handleQuantityChange(equip.equipmentid, e.target.value)}
                    disabled={!isCustomMode}
                    className={`w-14 px-2 py-1 border rounded text-center ${
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
                      className="p-3"
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

            {/* Vendor Overall Score Row */}
            <tr>
              <td
                className="p-[8px]"
                style={{
                  borderBottom: "1px solid #BBBBBB",
                  color: "#000000",
                  fontWeight: "400",
                  width: "145px",
                }}
              >
                Vendor Overall Score
              </td>
              <td
                className="p-3 text-center"
                style={{ borderBottom: "1px solid #BBBBBB", width: "90px" }}
              >
                {/* Empty - no quantity for this row */}
              </td>
              {vendorData.vendors.map((vendor) => (
                <td
                  key={vendor.vendorid}
                  className="p-3 text-center"
                  style={{ borderBottom: "1px solid #BBBBBB", width: "175px" }}
                >
                  <div className="text-sm text-gray-700 font-semibold">
                    {vendorOverallScores[vendor.vendorid].toFixed(2)}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table 1 Footnote */}
      <div className="mb-[40px] text-[10px] text-gray-600 italic" style={{ fontFamily: "Lexend, sans-serif" }}>
        † Only Overall Scores (S12) are shown in the above table.  But selection of brand (green checkmarks)
        is based on the scenario selected from the dropdown.
      </div>

      {/* Summary Table */}
      <div
        className="inline-block p-4 rounded-lg"
        style={{
          border: "4px solid #000080",
        }}
      >
        <div
          className="flex flex-col gap-2 "
          style={{ fontSize: "18px", fontFamily: "Lexend, sans-serif" }}
        >
          {/* Header Row */}
          <div className="flex gap-[10px] mt-[20px] ml-[23px] mr-[23px] mb-[8px]">
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
            <div key={row.equipment} className="flex gap-[10px] mt-[8px] ml-[23px] mr-[23px] mb-[2px]">
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
        †† In this table the Score shown is based on the scenario selected from the dropdown list.
      </div>

      {/* Custom Weights Modal */}
      {isWeightsModalOpen && (
        <CustomWeightsModal
          isOpen={isWeightsModalOpen}
          onClose={() => setIsWeightsModalOpen(false)}
          onApply={handleApplyWeights}
          onReset={() => {
            setCustomWeights(null);
            setIsWeightsModalOpen(false);
          }}
          currentWeights={customWeights}
        />
      )}
    </div>
  );
}