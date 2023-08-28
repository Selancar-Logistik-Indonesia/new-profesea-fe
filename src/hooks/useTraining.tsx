import { useContext } from "react";
import TrainingContext from "src/context/TrainingContext";

export const useTraining = () => useContext(TrainingContext);