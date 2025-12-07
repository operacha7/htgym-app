import React, { useMemo, useState } from "react";
import vendorData from "./data/vendorData.json";
import EquipmentReportModal from "./EquipmentReportModal";
import radarIcon from "./assets/radar2.png";

// Import all images dynamically
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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/// Replace the ReportIcon component with:
const ReportIcon = () => (
  <div
    style={{
      width: "15px",
      height: "15px",
      border: "3px solid #ffff00",
      borderRadius: "50%",
      overflow: "hidden", // This clips the image to the circle
      boxShadow: "0 2px 3px rgba(0,0,0,0.2)",
    }}
  >
    <img
      src={radarIcon}
      alt="View Report"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);
export default function VendorBrandMatrix() {
  // State for the report modal
  const [reportModal, setReportModal] = useState({
    isOpen: false,
    equipmentId: null,
    equipmentName: null,
  });

  // Get the highest score for each equipment to highlight
  const highestScores = useMemo(() => {
    const scores = {};
    vendorData.equipment.forEach((equip) => {
      const productsForEquip = vendorData.products.filter(
        (p) => p.equipmentid === equip.equipmentid
      );
      const maxScore = Math.max(...productsForEquip.map((p) => p.overallScore));
      scores[equip.equipmentid] = maxScore;
    });
    return scores;
  }, []);

  // Get product by equipmentId and vendorId
  const getProduct = (equipmentId, vendorId) => {
    return vendorData.products.find(
      (p) => p.equipmentid === equipmentId && p.vendorid === vendorId
    );
  };

  // Open report modal
  const openReport = (equipmentId, equipmentName) => {
    console.log("openReport called:", equipmentId, equipmentName);
    setReportModal({
      isOpen: true,
      equipmentId,
      equipmentName,
    });
  };

  // Close report modal
  const closeReport = () => {
    setReportModal({
      isOpen: false,
      equipmentId: null,
      equipmentName: null,
    });
  };

  return (
    <div className="w-full pl-[60px] pr-[60px] pb-[100px] pt-[20px]">
      {/* Page intro */}
      <div className="text-[18px] leading-[1.9] text-slate-700 italic font-lexend text-left mb-[30px]">
        This matrix provides a side-by-side comparison of all vendors and their
        quoted equipment. Each cell displays the product image, brand, quoted
        unit price, and overall score. The highest score for each equipment type
        is highlighted. Click the round, yellow bordered icon next to each equipment name to view
        a detailed comparison report.
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table
          className="border-collapse w-full"
          style={{
            borderStyle: "double",
            borderWidth: "4px",
            borderColor: "#bbbbbb",
          }}
        >
          {/* Header Row - Vendor Names */}
          <thead>
            <tr>
              {/* Empty cell for equipment column */}
              <th
                className="p-[10px] bg-gray-50"
                style={{
                  borderRight: "1px dashed #bbbbbb",
                  borderBottom: "1px dashed #bbbbbb",
                  width: "160px",
                }}
              ></th>
              {vendorData.vendors.map((vendor) => (
                <th
                  key={vendor.vendorid}
                  className="p-[10px] bg-gray-50 text-center"
                  style={{
                    borderRight: "1px dashed #bbbbbb",
                    borderBottom: "1px dashed #bbbbbb",
                  }}
                >
                  <span className="font-lexend text-[14px] text-[#00A3A8]  cursor-pointer hover:text-[#007B7F]">
                    {vendor.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body - Equipment Rows */}
          <tbody>
            {vendorData.equipment.map((equip) => (
              <tr key={equip.equipmentid}>
                {/* Equipment Name Cell */}
                <td
                  className="p-[10px] relative"
                  style={{
                    borderRight: "1px dashed #bbbbbb",
                    borderBottom: "1px dashed #bbbbbb",
                    height: "220px",
                  }}
                >
                  {/* Equipment name - absolutely positioned, vertically centered */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-[10px] flex items-center gap-2">
                    <span className="font-lexend text-[14px] text-[#88C828] font-bold">
                      {equip.name}
                    </span>
                    {/* Report Icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openReport(equip.equipmentid, equip.name);
                      }}
                      className="ml-[20px]"
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                      title={`View ${equip.name} comparison report`}
                    >
                      <ReportIcon />
                    </button>
                  </div>

                  {/* Labels - at bottom, right justified */}
                  <div className="absolute bottom-[10px] right-[10px] text-[11px] text-slate-500 font-lexend text-right">
                    <div className="leading-[1.8]">Brand:</div>
                    <div className="leading-[1.8]">Quoted Unit Price:</div>
                    <div className="leading-[1.8]">Overall Score:</div>
                  </div>
                </td>

                {/* Vendor Cells */}
                {vendorData.vendors.map((vendor) => {
                  const product = getProduct(
                    equip.equipmentid,
                    vendor.vendorid
                  );
                  const image = findImage(equip.equipmentid, vendor.vendorid);
                  const isHighestScore =
                    product &&
                    Math.abs(
                      product.overallScore - highestScores[equip.equipmentid]
                    ) < 0.001;

                  return (
                    <td
                      key={vendor.vendorid}
                      className="p-[10px] text-center"
                      style={{
                        borderRight: "1px dashed #bbbbbb",
                        borderBottom: "1px dashed #bbbbbb",
                        height: "220px",
                      }}
                    >
                      {product ? (
                        <div className="flex flex-col h-full justify-between items-center">
                          {/* Product Image - at top */}
                          <div className="flex-1 flex items-center justify-center">
                            {image ? (
                              <img
                                src={image}
                                alt={`${product.brand} ${product.equipment}`}
                                className="h-[130px] w-auto object-contain"
                              />
                            ) : (
                              <div className="h-[130px] w-[130px] bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                                No Image
                              </div>
                            )}
                          </div>

                          {/* Brand, Price, Score - at bottom */}
                          <div className="flex flex-col items-center">
                            {/* Brand - all red */}
                            <span className="font-lexend text-[13px] font-bold text-[#ff8100] leading-[1.8]">
                              {product.brand}
                            </span>

                            {/* Price */}
                            <span className="font-lexend text-[12px] text-slate-700 leading-[1.8]">
                              {formatPrice(product.allInUnitPrice)}
                            </span>

                            {/* Score - highlighted if highest */}
                            <span
                              className={`font-lexend text-[12px] font-semibold leading-[1.8] ${
                                isHighestScore
                                  ? "bg-[#e5fcec] px-[12px] py-[2px] rounded-[8px] text-green-800"
                                  : "text-slate-700"
                              }`}
                            >
                              {product.overallScore.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-[12px] text-gray-400">
                          N/A
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Equipment Report Modal */}
      <EquipmentReportModal
        equipmentId={reportModal.equipmentId}
        equipmentName={reportModal.equipmentName}
        isOpen={reportModal.isOpen}
        onClose={closeReport}
      />
    </div>
  );
}
