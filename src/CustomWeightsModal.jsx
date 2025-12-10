import React, { useState, useMemo, useEffect } from "react";
import { DEFAULT_WEIGHTS, SCORE_LABELS } from "./constants";

// Build criteria labels array from constants
const CRITERIA_LABELS = Object.entries(SCORE_LABELS)
  .filter(([id]) => id !== "S12") // Exclude Overall Score
  .map(([id, name]) => ({ id, name }));

export default function CustomWeightsModal({ isOpen, onClose, onApply, onReset, currentWeights }) {
  // Initialize with current weights if they exist, otherwise use defaults
  const [weights, setWeights] = useState(currentWeights || { ...DEFAULT_WEIGHTS });

  // Update local state when modal opens with new currentWeights
  useEffect(() => {
    if (isOpen) {
      setWeights(currentWeights || { ...DEFAULT_WEIGHTS });
    }
  }, [isOpen, currentWeights]);

  // Calculate total
  const total = useMemo(() => {
    return Object.values(weights).reduce((sum, val) => sum + (val || 0), 0);
  }, [weights]);

  const isValidTotal = total === 100;

  // Handle weight change
  const handleWeightChange = (criteriaId, value) => {
    // Allow empty string for clearing
    if (value === "") {
      setWeights((prev) => ({ ...prev, [criteriaId]: 0 }));
      return;
    }

    // Parse and validate
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

    setWeights((prev) => ({ ...prev, [criteriaId]: numValue }));
  };

  // Reset to defaults and close
  const handleReset = () => {
    setWeights({ ...DEFAULT_WEIGHTS });
    onReset(); // This will clear customWeights in Scenarios and close modal
  };

  // Apply weights
  const handleApply = () => {
    if (isValidTotal) {
      onApply(weights);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
      }}
    >
      <div
        className="rounded-lg shadow-xl"
        style={{
          width: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          fontFamily: "Lexend, sans-serif",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          padding: "40px",
        }}
      >
        {/* Header */}
        <h2
          className="text-xl font-bold mb-[2px] text-center"
          style={{ color: "#000080" }}
        >
          Custom Criteria Weights
        </h2>

        <p className="text-sm text-gray-600 mb-[20px] text-center">
          Adjust the weights for each criterion. Weights must total exactly 100.
        </p>

        {/* Criteria Table */}
        <div className="mb-[4px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className="text-left p-[5px] border-b-2"
                  style={{ borderColor: "#BBBBBB" }}
                >
                  Criterion
                </th>
                <th
                  className="text-center p-[5px] border-b-2"
                  style={{ borderColor: "#BBBBBB", width: "80px" }}
                >
                  Default
                </th>
                <th
                  className="text-center p-[2px] border-b-2"
                  style={{ borderColor: "#BBBBBB", width: "100px" }}
                >
                  Custom
                </th>
              </tr>
            </thead>
            <tbody>
              {CRITERIA_LABELS.map((criteria) => (
                <tr key={criteria.id}>
                  <td
                    className="p-[3px] border-b"
                    style={{ borderColor: "#EEEEEE" }}
                  >
                    {criteria.name}
                  </td>
                  <td
                    className="p-[10px] border-b text-center text-gray-500"
                    style={{ borderColor: "#EEEEEE" }}
                  >
                    {DEFAULT_WEIGHTS[criteria.id]}%
                  </td>
                  <td
                    className="p-[3px] border-b text-center"
                    style={{ borderColor: "#EEEEEE" }}
                  >
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={weights[criteria.id] || ""}
                      onChange={(e) =>
                        handleWeightChange(criteria.id, e.target.value)
                      }
                      onFocus={(e) => e.target.select()}
                      className="w-16 px-[8px] py-[4px]"
                      style={{ 
                        borderColor: "#BBBBBB",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderRadius: "4px",
                        textAlign: "right",
                        fontSize: "14px",
                        MozAppearance: "textfield",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Row */}
        <div
          className="flex justify-between items-center mt-[10px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-lg"
          style={{
            backgroundColor: isValidTotal ? "#dcfce7" : "#fee2e2",
            border: isValidTotal ? "2px solid #16a34a" : "2px solid #dc2626",
          }}
        >
          <span className="font-semibold">Total:</span>
          <span
            className="font-bold text-lg"
            style={{ color: isValidTotal ? "#16a34a" : "#dc2626" }}
          >
            {total}%
          </span>
        </div>

        {!isValidTotal && (
          <p
            className="text-sm text-center mb-[5px]"
            style={{ color: "#dc2626" }}
          >
            {total < 100
              ? `Add ${100 - total}% more to reach 100%`
              : `Remove ${total - 100}% to reach 100%`}
          </p>
        )}

        {/* Buttons */}
        <div 
          className="flex justify-center"
          style={{
            marginTop: "20px",
            gap: "12px",
          }}
        >
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            style={{ 
              width: "120px",
              height: "60px",
              backgroundColor: "#E5E5E5",
              border: "2px solid #CCCCCC",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#333333",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Cancel
          </button>
          
          {/* Reset Default Weights Button */}
          <button
            type="button"
            onClick={handleReset}
            style={{ 
              width: "120px",
              height: "60px",
              backgroundColor: "#DBEAFE",
              border: "2px solid #3B82F6",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1E40AF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            Reset Default<br/>Weights
          </button>
          
          {/* Apply Custom Weights Button */}
          <button
            type="button"
            onClick={handleApply}
            disabled={!isValidTotal}
            style={{ 
              width: "120px",
              height: "60px",
              backgroundColor: isValidTotal ? "#22C55E" : "#999999",
              border: isValidTotal ? "2px solid #16A34A" : "2px solid #777777",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#FFFFFF",
              cursor: isValidTotal ? "pointer" : "not-allowed",
              opacity: isValidTotal ? 1 : 0.6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            Apply Custom<br/>Weights
          </button>
        </div>
      </div>
    </div>
  );
}