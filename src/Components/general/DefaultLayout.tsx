import { Outlet } from "react-router-dom";
import MainNavBar from "./MainNavBar";
import { useSnackBar } from "../../Context/SnackBarContext";
import SnackBar from "../ui/SnackBar";

function DefaultLayout() {
  const { snackBar } = useSnackBar();
  return (
    <>
      <div className=" flex flex-col min-h-screen font-montserrat relative">
        <MainNavBar />
        <div className=" flex-1 px-6 pb-6">
          <Outlet />
        </div>
      </div>
      {snackBar.display && <SnackBar />}
    </>
  );
}

export default DefaultLayout;
