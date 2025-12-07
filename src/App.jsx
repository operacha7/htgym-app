import React, { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import RightSidebar from "./RightSidebar";
import Metholdology from "./Methodology.jsx";
import Criteria from "./Criteria";
import VendorBrandOverview from "./VendorBrandOverview";
import VendorBrandMatrix from "./VendorBrandMatrix.jsx";
import EquipmentReport from "./EquipmentReportModal.jsx";
import Scenarios from "./Scenarios.jsx";
import EquipmentComparison from "./EquipmentComparison.jsx";
import EquipmentDetails from "./EquipmentDetails";
import ExistingEquipment from "./ExistingEquipment";
import PasscodeProtection from "./PasscodeProtection";

const HEADER_TOP = 30; // top margin for header
const HEADER_HEIGHT = 72; // header bar height
const HEADER_GAP = 60; // gap between header bottom and content
const HEADER_OFFSET = HEADER_TOP + HEADER_HEIGHT + HEADER_GAP;

function App() {
  // Track which section is active in the center content area
  const [activeSection, setActiveSection] = useState("Scenarios");

  const renderCenterContent = () => {
    switch (activeSection) {
        case "Scenarios":
          return <Scenarios />;
        case "Methodology":
          return <Metholdology />;
      case "Criteria":
        return <Criteria />;
      case "Vendor & Brand Overview":
        return <VendorBrandOverview />;
      case "Vendor & Brand Matrix":
        return <VendorBrandMatrix />;
      case "Equipment Comparison":
        return <EquipmentComparison />;
      case "Equipment Details":
        return <EquipmentDetails />;
      case "Existing Equipment":
         return <ExistingEquipment />;
      default:
        return (
          <div className="text-slate-400 text-[20px] font-lexend italic">
            Content coming soon...
          </div>
        );
    }
  };

  return (
    <PasscodeProtection>
      <div className="min-h-screen flex bg-white relative">
        {/* ABSOLUTE HEADER, OVERLAYS NAV + CONTENT */}
        <Header />

        {/* LEFT NAV COLUMN */}
        <aside className="w-[400px] bg-[#4C5270] flex flex-col justify-between">
          {/* Push buttons down so they sit clearly below header */}
          <div className="flex justify-center mt-[140px]">
            <NavBar
              activeSection={activeSection}
              onChangeSection={setActiveSection}
            />
          </div>

          {/* Copyright at bottom */}
          <div className="flex justify-center mb-4">
            <p className="font-lexend text-[10px] sm:text-xs text-[#FFC06C]">
              © 2026 Peracha. All Rights Reserved
            </p>
          </div>
        </aside>

        {/* CENTER / RIGHT AREA */}
        <section className="flex-1 flex flex-col">
          {/* Content + right sidebar start at bottom of header */}
          <div
            className="flex flex-1 bg-white justify-end"
            style={{ paddingTop: `${HEADER_OFFSET}px` }}
          >
            {/* Main center content area between NavBar and RightSidebar */}
            <main className="flex-1 flex justify-center items-start px-[60px]">
              {renderCenterContent()}
            </main>

            {/* Collapsible reference sidebar whose top aligns with header bottom */}
            <RightSidebar />
          </div>
        </section>
      </div>
    </PasscodeProtection>
  );
}

export default App;