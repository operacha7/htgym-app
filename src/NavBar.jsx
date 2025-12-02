const NAV_ITEMS = [
  'Introduction',
  'Vendor & Brand',
  'Criteria',
  'Existing Equipment',
];

const NavBar = () => {
  const activeItem = 'Introduction';

  return (
    <nav className="w-full flex flex-col items-center mt-[20px] gap-[15px]">
      {NAV_ITEMS.map((label) => {
        const isActive = label === activeItem;

        return (
          <button
            key={label}
            className={`
              font-lexend
              text-[16px]
              tracking-[0.16em]
              rounded-[8px]
              w-[260px]
              py-[10px]
              shadow-button-ht
              transition
              duration-150
              ${isActive ? 'bg-[#706A4C] text-[white]' : 'bg-[#ECE8E8] text-black'}
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