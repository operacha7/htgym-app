const Header = () => {
  return (
    <header
      className="
        absolute
        top-[30px]
        left-[50px]
        right-[440px]
        z-20
        flex
      "
    >
      <div className="bg-[#B95915] h-[80px] shadow-header flex items-center justify-end w-full">
  <h1
    className="
      font-commissioner
      text-[32px]
      tracking-[0.7em]
      uppercase
      text-[#818284]
      text-shadow-soft
      mr-[46px]
    "
  >
    <span className="text-[40px] align-bottom">H</span>
    <span className="align-bottom">ighland&nbsp;</span>
    <span className="text-[40px] align-bottom">T</span>
    <span className="align-bottom">ower</span>
  </h1>
</div>
    </header>
  );
};

export default Header;