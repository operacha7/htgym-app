import React, { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import RightSidebar from "./RightSidebar";
import Introduction from "./Introduction.jsx";
import Criteria from "./Criteria";
import VendorBrandOverview from "./VendorBrandOverview";
import VendorBrandMatrix from "./VendorBrandMatrix.jsx";
import EquipmentReport from "./EquipmentReportModal.jsx";
import Scenarios from "./Scenarios.jsx";
import EquipmentComparison from "./EquipmentComparison.jsx";
import EquipmentDetails from "./EquipmentDetails";
import ExistingEquipment from "./ExistingEquipment";
import PasscodeProtection from "./PasscodeProtection";
import FloorPlan from "./FloorPlan";

const HEADER_TOP = 30; // top margin for header
const HEADER_HEIGHT = 72; // header bar height
const HEADER_GAP = 60; // gap between header bottom and content
const HEADER_OFFSET = HEADER_TOP + HEADER_HEIGHT + HEADER_GAP;

function App() {
  // Track which section is active in the center content area
  const [activeSection, setActiveSection] = useState("Introduction");
  
  // Track sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderCenterContent = () => {
    switch (activeSection) {
      case "Introduction":
          return <Introduction />;
      case "Scenarios":
          return <Scenarios />;
      case "Floor Plan":
          return <FloorPlan />;
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
        <aside className="w-[400px] bg-[#4C5270] flex flex-col">
          {/* Push buttons down so they sit clearly below header */}
          <div className="flex justify-center mt-[140px]">
            <NavBar
              activeSection={activeSection}
              onChangeSection={setActiveSection}
              onToggleSidebar={handleToggleSidebar}
            />
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
            <RightSidebar 
              isOpen={isSidebarOpen} 
              onClose={handleCloseSidebar} 
            />
          </div>
        </section>
      </div>
    </PasscodeProtection>
  );
}

export default App;