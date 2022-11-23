import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();

  console.log("Hi");

  const token = localStorage.getItem("jwt");

  console.log(token);
  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <Navigate
          to={process.env.PUBLIC_URL + "/signin"}
          state={{ from: location }}
          replace
        />
      )}
    </>
  );
};

export default PrivateRoutes;
