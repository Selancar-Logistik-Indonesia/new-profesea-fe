import { useContext } from "react"; 
import AlumniContext from "src/context/AlumniContext";

export const useAlumni = () => useContext(AlumniContext);