import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuth";
import { UserLayout } from "./ui/layouts/private/UserLayout";
import { PublicLayout } from "./ui/layouts/public/PublicLayout";
import LoadingPage from "./ui/pages/public/LoadingPage/LoadingPage";

function App() {
  const { auth } = useAuthContext();

  return (
    <Suspense fallback={<LoadingPage />}>
      {auth.token ? (
        <UserLayout>
          <Outlet />
        </UserLayout>
      ) : (
        <PublicLayout>
          <Outlet />
        </PublicLayout>
      )}
    </Suspense>
  );
}

export default App;
