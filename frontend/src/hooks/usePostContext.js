import { postContext } from "../contexts/postContext";
import { useContext } from "react";

export const usePostContext = () => {
  const context = useContext(postContext);

  if(!context) {
    throw Error('usePostContext must be done inside the provider')
  };

  return context;
}
