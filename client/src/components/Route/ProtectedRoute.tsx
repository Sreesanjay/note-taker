import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
     const { user } = useAppSelector((state) => state.auth);
     return <>{user ? <Outlet /> : <Navigate to="/signin" />}</>;
};
export default ProtectedRoute;
