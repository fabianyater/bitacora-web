import { Suspense } from "react";
import { useAuthContext } from "./hooks/useAuth";
import { AdminLayout } from "./ui/layouts/private/AdminLayout";
import { UserLayout } from "./ui/layouts/private/UserLayout";
import { PublicLayout } from "./ui/layouts/public/PublicLayout";
import { Outlet } from "react-router-dom";

function App() {
  const { auth } = useAuthContext();

  let LayoutComponent;

  if (auth.token) {
    LayoutComponent = auth.role === "admin" ? AdminLayout : UserLayout;
  } else {
    LayoutComponent = PublicLayout;
  }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <LayoutComponent>
        <Outlet />
      </LayoutComponent>
    </Suspense>
  );
}

export default App;
