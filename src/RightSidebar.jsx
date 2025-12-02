import { useEffect, useRef, useState } from 'react';

const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <aside
      ref={containerRef}
      className={`
        bg-[#4C5270]
        h-full
        transition-all
        duration-200
        flex
        ${isOpen ? 'w-[320px]' : 'w-[60px]'}
      `}
    >
      <div className="w-[80px] flex flex-col mt-[15px]">
        <button
  type="button"
  onClick={() => setIsOpen((v) => !v)}
  className="
    ml-auto
    w-[40px]
    h-[40px]
    bg-[#ECE8E8]
    shadow-button-ht
    rounded-tl-[8px]
    rounded-bl-[8px]
    flex
    items-center
    justify-center
    hover:scale-[1.1]
    hover:shadow-lg
    active:scale-[0.98]
  "
>
  <span className="text-black text-[25px]">
    {isOpen ? '»»' : '««'}
  </span>
</button>
      </div>

      {isOpen && (
        <div className="flex-1 p-4 text-sm text-[white]">
          <h2 className="font-lexend mb-2">Reference List</h2>
          <p className="text-xs opacity-80">
            Placeholder for references. We&apos;ll fill this in later.
          </p>
        </div>
      )}
    </aside>
  );
};

export default RightSidebar;