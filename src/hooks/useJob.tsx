import { useContext } from "react";
import JobContext from "src/context/JobContext";

export const useJob = () => useContext(JobContext);