// src/constants.js

// Equipment list
export const EQUIPMENT_LIST = [
  { id: "E01", name: "Dual Pulley" },
  { id: "E02", name: "Leg Ext/Curl" },
  { id: "E03", name: "Chest Press" },
  { id: "E04", name: "Treadmill" },
  { id: "E05", name: "Elliptical" },
  { id: "E06", name: "Recumbent Bike" },
  { id: "E07", name: "Rower" },
  { id: "E08", name: "Bench" },
];

// Score codes and their labels
export const SCORE_LABELS = {
  S01: "Reliability",
  S02: "Ease of Use",
  S03: "Vendor Quality",
  S04: "Price",
  S05: "Aesthetics",
  S06: "Build Quality",
  S07: "Durability",
  S08: "Svc/Parts Availability",
  S09: "Warranty",
  S10: "Footprint",
  S11: "Weight",
  S12: "Overall Score",
};

// S02b labels by equipment type (equipment-specific ease of use factor)
export const S02B_LABELS = {
  "Dual Pulley": "Stack Score",
  "Leg Ext/Curl": "Stack Score",
  "Chest Press": "Stack Score",
  "Treadmill": "Step Up Score",
  "Elliptical": "Step Up Score",
  "Recumbent Bike": "Step Thru Score",
  "Rower": "Accessibility Score",
  "Bench": "Mobility Score",
};

// Default weights (as percentages)
export const DEFAULT_WEIGHTS = {
  S01: 14,
  S02: 14,
  S03: 12,
  S04: 12,
  S05: 12,
  S06: 10,
  S07: 10,
  S08: 5,
  S09: 5,
  S10: 5,
  S11: 1,
};

// Weights as decimals (for calculations)
export const CRITERIA_WEIGHTS = {
  S01: 0.14,
  S02: 0.14,
  S03: 0.12,
  S04: 0.12,
  S05: 0.12,
  S06: 0.10,
  S07: 0.10,
  S08: 0.05,
  S09: 0.05,
  S10: 0.05,
  S11: 0.01,
};

// C-code labels - common to all equipment
export const C_CODE_LABELS_COMMON = {
  C02: "Footprint (sq in)",
  C03: "Weight (lbs)",
  C04: "Build Quality Commentary",
  C06: "Warranty Frame/Parts/Labor (years)",
  C07: "Durability Commentary",
  C08: "Reliability Commentary",
  C09: "Ease of Use Commentary",
  C10: "Svc/Parts Availability Commentary",
  C11: "Aesthetics Commentary",
  C15: "Dimensions (inches)",
};

// C05 labels by equipment type
export const C05_LABELS = {
  "Dual Pulley": "Single Stack Weight (lbs)",
  "Leg Ext/Curl": "Single Stack Weight (lbs)",
  "Chest Press": "Single Stack Weight (lbs)",
  "Treadmill": "Step Up Height (in)",
  "Elliptical": "Step Up Height (in)",
  "Recumbent Bike": "Step Thru Access",
  "Rower": "Accessibility",
  "Bench": "Mobility",
};

// C14 labels by equipment type
export const C14_LABELS = {
  "Dual Pulley": "Cable Ratio",
  "Leg Ext/Curl": "Cable Ratio",
  "Chest Press": "Cable Ratio",
  "Treadmill": "Max Capacity (lbs)",
  "Elliptical": "Stride Length (in)",
  "Recumbent Bike": "Max Capacity (lbs)",
  "Rower": "Max Capacity (lbs)",
  "Bench": "Max Capacity (lbs)",
};

// Vendor colors
export const VENDOR_COLORS = {
  V01: "#059669",
  V02: "#1d4ed8",
  V03: "#dc2626",
  V04: "#9333ea",
  V05: "#f59e0b",
};

// Scenario options
export const SCENARIO_OPTIONS = [
  { id: "highestOverall", label: "Highest Equipment Overall Score", scoreField: "S12", description: "Equipment with the highest overall score" },
  { id: "singleVendor", label: "Highest Vendor Overall Score", scoreField: "S12", description: "Vendor with the highest average score" },
  { id: "selectVendor", label: "Select Specific Vendor", scoreField: "S12", description: "Choose a specific vendor for all equipment" },
  { id: "custom", label: "Custom", scoreField: "S12", description: "Allow the user to select" },
  { id: "mostReliable", label: "Most Reliable", scoreField: "S01", description: "Equipment with the highest reliability score" },
  { id: "greatestEaseOfUse", label: "Greatest Ease of Use", scoreField: "S02", description: "Equipment with the highest ease of use score" },
  { id: "highestVendorQuality", label: "Highest Vendor Quality", scoreField: "S03", description: "Equipment with the highest vendor quality score" },
  { id: "lowestPrice", label: "Lowest Price", scoreField: "S04", description: "Equipment with the highest price score" },
  { id: "bestLooking", label: "Best Looking", scoreField: "S05", description: "Equipment with the highest aesthetics score" },
  { id: "bestBuildQuality", label: "Best Build Quality", scoreField: "S06", description: "Equipment with the highest build quality score" },
  { id: "mostDurable", label: "Most Durable", scoreField: "S07", description: "Equipment with the highest durability score" },
  { id: "bestServiceParts", label: "Best Svc/Parts Availability", scoreField: "S08", description: "Equipment with the highest svc/parts availability score" },
  { id: "bestWarranty", label: "Best Warranty", scoreField: "S09", description: "Equipment with the highest warranty score" },
  { id: "smallestFootprint", label: "Smallest Footprint", scoreField: "S10", description: "Equipment with the highest footprint score" },
];

// Helper function to get all C-code labels for a specific equipment
export const getCCodeLabels = (equipmentName) => ({
  ...C_CODE_LABELS_COMMON,
  C05: C05_LABELS[equipmentName] || "Equipment-specific",
  C14: C14_LABELS[equipmentName] || "Equipment-specific",
});

// Helper function to get criteria labels for a specific equipment
export const getCriteriaLabels = (equipmentName) => ({
  S01: "Reliability Score",
  S02: "Ease of Use Score",
  S02b: S02B_LABELS[equipmentName] || "Equipment-specific Score",
  S03: "Vendor Quality Score",
  S04: "Price Score",
  S05: "Aesthetics Score",
  S06: "Build Quality Score",
  S07: "Durability Score",
  S08: "Svc/Parts Availability Score",
  S09: "Warranty Score",
  S10: "Footprint Score",
  S11: "Weight Score",
  S12: "Overall Score",
});