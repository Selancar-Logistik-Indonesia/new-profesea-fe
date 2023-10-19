import { useContext } from "react"; 
import GroupContext from "src/context/GroupContext";

export const useGroup = () => useContext(GroupContext);