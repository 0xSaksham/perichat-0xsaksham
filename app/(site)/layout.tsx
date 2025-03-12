import { AuthProvider } from "@/utils/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="flex h-screen">
          <Sidebar />

          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar />
            <div className="flex-1 overflow-auto bg-white">{children}</div>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default MainLayout;
