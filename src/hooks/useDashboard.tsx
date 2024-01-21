import { useContext } from "react";
import DashboardContext from "src/context/DashboardContext";

export const useDashboard = () => useContext(DashboardContext);