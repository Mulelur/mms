import "./App.css";
import DashBoard from "./views/dashboard";
import SingIn from "./views/auth/signin";

import { Helmet } from "react-helmet-async";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import PrivateRoutes from "./routes/privateRoutes";
import SingUp from "./views/auth/signup";

function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - MMS" defaultTitle="MMS">
        <meta name="description" content="A MMS" />
      </Helmet>

      {/* Public Routes  */}
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/signin"} element={<SingIn />} />

        <Route path={process.env.PUBLIC_URL + "/signup"} element={<SingUp />} />

        {/* <Route element={<NotFoundPage />} /> */}

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path={process.env.PUBLIC_URL + "/"} element={<DashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
