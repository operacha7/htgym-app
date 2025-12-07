import React, { useState } from "react";
import vendorData from "./data/vendorData.json";
import EquipmentReportModal from "./EquipmentReportModal";

export default function EquipmentComparison() {
  // Default to first equipment (Dual Pulley)
  const [selectedEquipment, setSelectedEquipment] = useState(
    vendorData.equipment[0]?.equipmentid || "E01"
  );

  // Get the equipment name for display
  const selectedEquipmentData = vendorData.equipment.find(
    (e) => e.equipmentid === selectedEquipment
  );

  return (
    <div className="w-full px-[60px] pb-[100px] pt-[20px]">
      {/* Equipment Selector */}
      <div className="mb-[20px]">
        <label 
          className="font-lexend text-[16px] mr-[10px]"
          style={{ color: "#333" }}
        >
          Select Equipment:
        </label>
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="px-[10px] py-[5px] text-[16px] rounded-lg focus:outline-none cursor-pointer"
          style={{ 
            fontFamily: "Lexend, sans-serif",
            border: "3px solid #000080",
          }}
        >
          {vendorData.equipment.map((equip) => (
            <option key={equip.equipmentid} value={equip.equipmentid}>
              {equip.name}
            </option>
          ))}
        </select>
      </div>

      {/* Report Modal - always open on this page */}
      <EquipmentReportModal
        equipmentId={selectedEquipment}
        equipmentName={selectedEquipmentData?.name || "Equipment"}
        isOpen={true}
        onClose={() => {}} // No-op since we want it always visible
        embedded={true}    // New prop to render without modal overlay
      />
    </div>
  );
}