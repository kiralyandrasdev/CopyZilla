import React from "react";
import { ClipLoader } from "react-spinners";
import "./LoadingIndicator.css";

export default function LoadingIndicator(props) {
  return (
    <ClipLoader
      loading={true}
      color="black"
      cssOverride={props.cssOverride || {}}
      speedMultiplier={1}
      size="20px"
    />
  );
}