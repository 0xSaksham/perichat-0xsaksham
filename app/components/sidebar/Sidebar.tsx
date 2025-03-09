import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

import { getCurrentUser } from "@/app/actions/getCurrentUser";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-screen">
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className="lg:pl-20 h-screen">{children}</main>
    </div>
  );
}

export default Sidebar;
