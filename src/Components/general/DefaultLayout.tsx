import { Outlet } from "react-router-dom";
import MainNavBar from "./MainNavBar";
import { useSnackBar } from "../../Context/SnackBarContext";
import SnackBar from "../ui/SnackBar";
import Footer from "./Footer";
import ScrollUpButton from "./ScrollUpButton";

function DefaultLayout() {
  const { snackBar } = useSnackBar();
  return (
    <>
      <div className=" flex flex-col font-montserrat">
        <MainNavBar />
        <div className=" flex-1 overflow-hidden min-h-[80vh] font-montserrat px-6 break-950px:px-16">
          <Outlet />
        </div>
        <Footer />
      </div>
      {snackBar.display && <SnackBar />}
      <ScrollUpButton />
    </>
  );
}

export default DefaultLayout;
