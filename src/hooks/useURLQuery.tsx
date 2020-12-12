import { useLocation } from "react-router-dom";

/**
 * Query the query params...
 */
export default function useURLQuery() {
  return new URLSearchParams(useLocation().search);
}
