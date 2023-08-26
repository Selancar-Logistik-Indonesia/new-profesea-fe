import { useContext } from "react";
import FriendSuggestionContext from "src/context/FriendSuggestionContext";

export const useFriendSuggestion = () => useContext(FriendSuggestionContext);