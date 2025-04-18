import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
