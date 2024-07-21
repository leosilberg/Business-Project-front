// import { useContext } from "react";
// import { Card, CardContent, CardTitle } from "../../components/ui/card";
// import { SnackBarContext } from "../../context/SnackBarContext";
// import SnackBar from "../../components/ui/SnackBar";
// import { Outlet, useLocation } from "react-router-dom";
// export const AUTH_URL = "/auth/";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useAuth } from "../../Context/AuthContext";
import { useSnackBar } from "../../Context/SnackBarContext";
import SnackBar from "../ui/SnackBar";

function AuthLayout() {
  const { loggedInUser } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  if (loggedInUser) {
    navigate("/");
  }
  const { snackBar } = useSnackBar();

  return (
    <>
      <div
        className=" font-montserrat h-screen w-full flex items-center justify-center px-6"
        style={{
          backgroundImage: "linear-gradient(to top left,#3D7EAA,#FFE47A)",
        }}
      >
        <Card className=" py-6 min-h-96 min-w-80 flex flex-col items-center justify-center gap-4">
          <CardTitle className="text-3xl">
            {location.pathname.includes("register") ? "Register" : "Login"}
          </CardTitle>
          <CardContent className="w-full max-w-80 ">
            {/* Context of pages goes down here */}
            <Outlet />
          </CardContent>
        </Card>
        {snackBar.display && <SnackBar />}
      </div>
    </>
  );
}

export default AuthLayout;
