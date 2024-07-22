import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./Components/general/DefaultLayout";
import HomePage from "./Pages/HomePage";
import AuthLayout from "./Components/auth/AuthLayout";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import BusinessesPage from "./Pages/BusinessesPage";
import BussinessDetailsPage from "./Pages/BussinessDetailsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import UserPage from "./Pages/UserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/businesses">
            <Route index element={<BusinessesPage />} />
            <Route path=":bussinessID" element={<BussinessDetailsPage />} />
          </Route>
          <Route path="/user">
            <Route index element={<UserPage />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

// full crud on users review
// sort the reviews - userFirst
// add date to review
// improve light layout

// decide the layout after click a bussiness
// filters
// pagination
