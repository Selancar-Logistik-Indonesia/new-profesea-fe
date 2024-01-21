import { useContext } from "react";
import CandidateContext from "src/context/CandidateContext";

export const useCandidate = () => useContext(CandidateContext);