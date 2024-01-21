import { useContext } from "react"; 
import NewsContext from "src/context/NewsContext";

export const useNews = () => useContext(NewsContext);