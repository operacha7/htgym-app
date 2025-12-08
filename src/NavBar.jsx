import { openEquipmentReport } from "./EquipmentReportModal";
import whatIfButtonImg from "./assets/whatifbutton.jpeg";

const NAV_ITEMS = [
  'Introduction',
  'Scenarios',
  'Criteria',
  'Vendor & Brand Overview',
  'Vendor & Brand Matrix',
  'Equipment Comparison',
  'Equipment Details',
  'Existing Equipment',
];

const NavBar = ({ activeSection, onChangeSection, onToggleSidebar }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Navigation Buttons */}
      <nav className="flex flex-col items-center mt-[20px] gap-[15px]">
        {NAV_ITEMS.map((label) => {
          const isActive = label === activeSection;

          return (
            <button
              key={label}
              onClick={() => {
                if (label === "Equipment Comparison") {
                  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || '';
                  openEquipmentReport("E01", "Dual Pulley", apiKey);
                } else {
                  onChangeSection(label);
                }
              }}
              className={`
                font-lexend
                text-[16px]
                tracking-[0.16em]
                rounded-[8px]
                w-[300px]
                py-[10px]
                shadow-button-ht
                transition duration-150
                ${isActive ? 'bg-[#706A4C] text-white' : 'bg-[#ECE8E8] text-black'}
                hover:scale-[1.03]
                hover:shadow-lg
                active:scale-[0.98]
              `}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {/* What-If Button and Copyright - 100px below last nav button */}
      <div className="mt-[100px] flex flex-col items-center">
        {/* What-If Button */}
        <button
          onClick={onToggleSidebar}
          className={`
            what-if-button
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
            mb-[10px]
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

        {/* Copyright */}
        <p className="font-lexend text-[10px] sm:text-xs text-[#FFC06C]">
          © 2026 Peracha. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default NavBar;