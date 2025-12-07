import { openEquipmentReport } from "./EquipmentReportModal";

const NAV_ITEMS = [
  'Scenarios',
  'Methodology',
  'Criteria',
  'Vendor & Brand Overview',
  'Vendor & Brand Matrix',
  'Equipment Comparison',
  'Equipment Details',
  'Existing Equipment',
];

const NavBar = ({ activeSection, onChangeSection }) => {
  return (
    <nav className="w-full flex flex-col items-center mt-[20px] gap-[15px]">
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
  );
};

export default NavBar;