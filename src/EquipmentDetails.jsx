import React, { useState, useMemo } from "react";
import vendorData from "./data/vendorData.json";
import { 
  EQUIPMENT_LIST, 
  SCORE_LABELS, 
  S02B_LABELS,
  C_CODE_LABELS_COMMON, 
  C05_LABELS, 
  C14_LABELS 
} from "./constants";

// Import all images dynamically (same as VendorBrandMatrix)
const imageModules = import.meta.glob("./assets/E*V*-*.png", { eager: true });

// Helper function to find image by E##V## prefix
const findImage = (equipmentId, vendorId) => {
  const prefix = `${equipmentId}${vendorId}`;
  for (const [path, module] of Object.entries(imageModules)) {
    if (path.includes(prefix)) {
      return module.default;
    }
  }
  return null;
};

// Helper to format price
const formatPrice = (price) => {
  if (!price) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// C-code label helper using constants
const getCCodeLabel = (code, equipmentName) => {
  if (code === "C05") {
    return `${code} - ${C05_LABELS[equipmentName] || "Equipment-specific"}`;
  }
  if (code === "C14") {
    return `${code} - ${C14_LABELS[equipmentName] || "Equipment-specific"}`;
  }
  return `${code} - ${C_CODE_LABELS_COMMON[code] || code}`;
};

// S-code label helper using constants
const getSCodeLabel = (code, equipmentName) => {
  if (code === "S02b") {
    return `S02b - ${S02B_LABELS[equipmentName] || "Equipment-specific Score"}`;
  }
  return `${code} - ${SCORE_LABELS[code] || code}`;
};

// Row component for consistent styling
const DetailRow = ({ label, value, isLink = false }) => (
  <div
    className="flex"
    style={{
      borderBottom: "1px solid #EEEEEE",
      minHeight: "40px",
    }}
  >
    <div
      className="flex items-center"
      style={{
        width: "380px",
        padding: "10px 15px",
        color: "#666666",
        fontSize: "14px",
        fontFamily: "Lexend, sans-serif",
      }}
    >
      {label}
    </div>
    <div
      className="flex items-center flex-1"
      style={{
        padding: "10px 15px",
        color: "#333333",
        fontSize: "14px",
        fontFamily: "Lexend, sans-serif",
      }}
    >
      {isLink && value ? (
        <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", textDecoration: "underline" }}>{value}</a>
      ) : (
        value || ""
      )}
    </div>
  </div>
);

// Image row component
const ImageRow = ({ label, imageSrc, altText }) => (
  <div
    className="flex"
    style={{
      borderBottom: "1px solid #EEEEEE",
      minHeight: "150px",
    }}
  >
    <div
      className="flex items-center"
      style={{
        width: "280px",
        padding: "10px 15px",
        color: "#666666",
        fontSize: "14px",
        fontFamily: "Lexend, sans-serif",
      }}
    >
      {label}
    </div>
    <div
      className="flex items-center flex-1"
      style={{
        padding: "10px 15px",
      }}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={altText}
          style={{ height: "530px", width: "auto", objectFit: "contain" }}
        />
      ) : (
        <div
          style={{
            height: "430px",
            width: "130px",
            backgroundColor: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            fontSize: "12px",
          }}
        >
          No Image
        </div>
      )}
    </div>
  </div>
);

// Score row component (formats to 2 decimal places)
const ScoreRow = ({ label, value }) => (
  <DetailRow
    label={label}
    value={value !== undefined && value !== null ? value.toFixed(2) : ""}
  />
);

export default function EquipmentDetails() {
  // State for dropdowns
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(
    EQUIPMENT_LIST[0]?.id || ""
  );
  const [selectedVendorId, setSelectedVendorId] = useState("");

  // Get selected equipment name
  const selectedEquipment = useMemo(() => {
    return EQUIPMENT_LIST.find((e) => e.id === selectedEquipmentId);
  }, [selectedEquipmentId]);

  // Get available vendors/brands for selected equipment
  const availableProducts = useMemo(() => {
    return vendorData.products.filter(
      (p) => p.equipmentid === selectedEquipmentId
    );
  }, [selectedEquipmentId]);

  // Set default vendor when equipment changes
  useMemo(() => {
    if (availableProducts.length > 0 && !availableProducts.find(p => p.vendorid === selectedVendorId)) {
      setSelectedVendorId(availableProducts[0].vendorid);
    }
  }, [availableProducts, selectedVendorId]);

  // Get selected product
  const selectedProduct = useMemo(() => {
    return vendorData.products.find(
      (p) => p.equipmentid === selectedEquipmentId && p.vendorid === selectedVendorId
    );
  }, [selectedEquipmentId, selectedVendorId]);

  // Get image for selected product
  const productImage = useMemo(() => {
    if (selectedEquipmentId && selectedVendorId) {
      return findImage(selectedEquipmentId, selectedVendorId);
    }
    return null;
  }, [selectedEquipmentId, selectedVendorId]);

  // Handle equipment change
  const handleEquipmentChange = (e) => {
    setSelectedEquipmentId(e.target.value);
    setSelectedVendorId(""); // Reset vendor selection
  };

  // Handle vendor change
  const handleVendorChange = (e) => {
    setSelectedVendorId(e.target.value);
  };

  const equipmentName = selectedEquipment?.name || "";

  return (
    <div className="w-full pl-[60px] pr-[60px] pb-[100px] pt-[20px]">
      {/* Page intro */}
      <div
        className="text-[18px] leading-[1.9] text-slate-700 italic font-lexend text-left mb-[30px]"
        style={{ width: "950px" }}
      >
        View detailed specifications, commentary, and scores for each piece of
        equipment by vendor. Select an equipment type and vendor/brand from the
        dropdowns below.
      </div>

      {/* Dropdowns */}
      <div className="flex gap-[20px] mb-[40px]">
        {/* Equipment Dropdown */}
        <select
          value={selectedEquipmentId}
          onChange={handleEquipmentChange}
          className="w-[250px] px-[15px] py-[10px] text-[16px] rounded-lg focus:outline-none cursor-pointer"
          style={{
            fontFamily: "Lexend, sans-serif",
            color: "#000000",
            border: "2px solid #BBBBBB",
            backgroundColor: "#FFFFFF",
          }}
        >
          {EQUIPMENT_LIST.map((equip) => (
            <option key={equip.id} value={equip.id}>
              {equip.name}
            </option>
          ))}
        </select>

        {/* Vendor/Brand Dropdown */}
        <select
          value={selectedVendorId}
          onChange={handleVendorChange}
          className="w-[350px] px-[15px] py-[10px] text-[16px] rounded-lg focus:outline-none cursor-pointer"
          style={{
            fontFamily: "Lexend, sans-serif",
            color: "#000000",
            border: "2px solid #BBBBBB",
            backgroundColor: "#FFFFFF",
          }}
        >
          {availableProducts.map((product) => (
            <option key={product.vendorid} value={product.vendorid}>
              {product.vendor} - {product.brand}
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <div style={{ maxWidth: "900px" }}>
          {/* Section 1: Basic Info */}
          <div
            className="rounded-lg mb-[30px]"
            style={{ border: "1px solid #DDDDDD", overflow: "hidden" }}
          >
            <DetailRow label="Vendor" value={selectedProduct.vendor} />
            <DetailRow label="Equipment" value={selectedProduct.equipment} />
            <ImageRow
              label="Image"
              imageSrc={productImage}
              altText={`${selectedProduct.brand} ${selectedProduct.equipment}`}
            />
            <DetailRow label="Brand" value={selectedProduct.brand} />
            <DetailRow label="Model" value={selectedProduct.model} />
            <DetailRow
              label="Base Unit Price"
              value={formatPrice(selectedProduct.baseUnitPrice)}
            />
            <DetailRow
              label="All In Unit Price"
              value={formatPrice(selectedProduct.allInUnitPrice)}
            />
            <DetailRow label="URL" value={selectedProduct.url} isLink={true} />
          </div>

          {/* Section 2: Physical Specs (C15, C02, C03, C05, C06, C14) */}
          <div
            className="rounded-lg mb-[30px]"
            style={{ border: "1px solid #DDDDDD", overflow: "hidden" }}
          >
            <DetailRow
              label={getCCodeLabel("C15", equipmentName)}
              value={selectedProduct.C15}
            />
            <DetailRow
              label={getCCodeLabel("C02", equipmentName)}
              value={selectedProduct.C02}
            />
            <DetailRow
              label={getCCodeLabel("C03", equipmentName)}
              value={selectedProduct.C03}
            />
            <DetailRow
              label={getCCodeLabel("C05", equipmentName)}
              value={selectedProduct.C05}
            />
            <DetailRow
              label={getCCodeLabel("C06", equipmentName)}
              value={selectedProduct.C06}
            />
            <DetailRow
              label={getCCodeLabel("C14", equipmentName)}
              value={selectedProduct.C14}
            />
          </div>

          {/* Section 3: Commentary (C04, C07, C08, C09, C10, C11) */}
          <div
            className="rounded-lg mb-[30px]"
            style={{ border: "1px solid #DDDDDD", overflow: "hidden" }}
          >
            <DetailRow
              label={getCCodeLabel("C04", equipmentName)}
              value={selectedProduct.C04}
            />
            <DetailRow
              label={getCCodeLabel("C07", equipmentName)}
              value={selectedProduct.C07}
            />
            <DetailRow
              label={getCCodeLabel("C08", equipmentName)}
              value={selectedProduct.C08}
            />
            <DetailRow
              label={getCCodeLabel("C09", equipmentName)}
              value={selectedProduct.C09}
            />
            <DetailRow
              label={getCCodeLabel("C10", equipmentName)}
              value={selectedProduct.C10}
            />
            <DetailRow
              label={getCCodeLabel("C11", equipmentName)}
              value={selectedProduct.C11}
            />
          </div>

          {/* Section 4: Scores (S01-S12) */}
          <div
            className="rounded-lg mb-[30px]"
            style={{ border: "1px solid #DDDDDD", overflow: "hidden" }}
          >
            <ScoreRow
              label={getSCodeLabel("S01", equipmentName)}
              value={selectedProduct.S01}
            />
            <ScoreRow
              label={getSCodeLabel("S02", equipmentName)}
              value={selectedProduct.S02}
            />
            <ScoreRow
              label={getSCodeLabel("S02b", equipmentName)}
              value={selectedProduct.S02b}
            />
            <ScoreRow
              label={getSCodeLabel("S03", equipmentName)}
              value={selectedProduct.S03}
            />
            <ScoreRow
              label={getSCodeLabel("S04", equipmentName)}
              value={selectedProduct.S04}
            />
            <ScoreRow
              label={getSCodeLabel("S05", equipmentName)}
              value={selectedProduct.S05}
            />
            <ScoreRow
              label={getSCodeLabel("S06", equipmentName)}
              value={selectedProduct.S06}
            />
            <ScoreRow
              label={getSCodeLabel("S07", equipmentName)}
              value={selectedProduct.S07}
            />
            <ScoreRow
              label={getSCodeLabel("S08", equipmentName)}
              value={selectedProduct.S08}
            />
            <ScoreRow
              label={getSCodeLabel("S09", equipmentName)}
              value={selectedProduct.S09}
            />
            <ScoreRow
              label={getSCodeLabel("S10", equipmentName)}
              value={selectedProduct.S10}
            />
            <ScoreRow
              label={getSCodeLabel("S11", equipmentName)}
              value={selectedProduct.S11}
            />
            <ScoreRow
              label={getSCodeLabel("S12", equipmentName)}
              value={selectedProduct.S12 || selectedProduct.overallScore}
            />
          </div>
        </div>
      )}
    </div>
  );
}