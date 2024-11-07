import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuth";
import { AdminLayout } from "./ui/layouts/private/AdminLayout";
import { UserLayout } from "./ui/layouts/private/UserLayout";
import { PublicLayout } from "./ui/layouts/public/PublicLayout";

function App() {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  let LayoutComponent;

  useEffect(() => {
    if (auth.token) {
      if (auth.role === "admin") {
        navigate("/dashboard");
      } else if (auth.role === "researcher" || auth.role === "partner") {
        navigate("/logbooks");
      }
    }
  }, [auth, navigate]);

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
