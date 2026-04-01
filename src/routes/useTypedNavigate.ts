import { useNavigate } from "react-router-dom";
import type { RoutePath } from "./routes";

export function useTypedNavigate() {
  const navigate = useNavigate();

  return (path: RoutePath) => {
    navigate(path);
  };
}