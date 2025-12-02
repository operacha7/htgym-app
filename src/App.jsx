import Header from './Header';
import NavBar from './NavBar';
import RightSidebar from './RightSidebar';

const HEADER_TOP = 30;      // top margin for header
const HEADER_HEIGHT = 72;   // header bar height
const HEADER_GAP = 10;      // small gap before content starts
const HEADER_OFFSET = HEADER_TOP + HEADER_HEIGHT + HEADER_GAP;

function App() {
  return (
    <div className="min-h-screen flex bg-white relative">
      {/* ABSOLUTE HEADER, OVERLAYS NAV + CONTENT */}
      <Header />

      {/* LEFT NAV COLUMN */}
      <aside className="w-[400px] bg-[#4C5270] flex flex-col justify-between">
        {/* Push buttons down so they sit clearly below header */}
        <div className="flex justify-center mt-[140px]">
          <NavBar />
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
          className="flex flex-1 bg-white"
          style={{ paddingTop: `${HEADER_OFFSET}px` }}
        >
          {/* Main white content area */}
          <main className="flex-1" />

          {/* Collapsible reference sidebar whose top aligns with header bottom */}
          <RightSidebar />
        </div>
      </section>
    </div>
  );
}

export default App;