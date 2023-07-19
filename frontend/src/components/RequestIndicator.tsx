import { useSelector } from "react-redux";
import { isNumber, isObject } from "../utils/typeGuards";
import { CircularProgress } from "@mui/material";

const RequestIndicator = () => {
  const runningRequests: number = useSelector((state) => {
    if (
      state &&
      isObject(state) &&
      "requests" in state &&
      state.requests &&
      isNumber(state.requests)
    ) {
      return state.requests;
    } else return 0;
  });

  if (runningRequests == 0) return <></>;

  return (
    <>
      <CircularProgress sx={{ mr: 2 }} /> Scraping... Requests:{" "}
      {runningRequests}
    </>
  );
};

export default RequestIndicator;
