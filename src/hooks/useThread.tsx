import { useContext } from "react";
import ThreadContext from "src/context/ThreadContext";

export const useThread = () => useContext(ThreadContext);