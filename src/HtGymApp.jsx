import Header from './Header';
import NavBar from './NavBar';
import RightSidebar from './RightSidebar';

function HtGymApp() {
  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT NAV COLUMN */}
      <aside className="w-[530px] bg-[#4C5270] flex flex-col justify-between py-6">
        {/* Nav buttons */}
        <div className="flex justify-center">
          <NavBar />
        </div>

        {/* Copyright at bottom */}
        <div className="flex justify-center mt-4">
          <p className="font-lexend text-[10px] sm:text-xs text-[#FFC06C]">
            © 2026 Peracha. All Rights Reserved
          </p>
        </div>
      </aside>

      {/* CENTER / RIGHT AREA */}
      <section className="flex-1 flex flex-col">
        {/* Header bar */}
        <Header />

        {/* Main white content area + right sidebar */}
        <div className="flex flex-1 bg-white">
          {/* Main white area (we’ll fill this later) */}
          <main className="flex-1" />

          {/* Collapsible reference sidebar */}
          <RightSidebar />
        </div>
      </section>
    </div>
  );
}

export default HtGymApp;