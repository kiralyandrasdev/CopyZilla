import React from "react";
import { ClipLoader } from "react-spinners";
import "./LoadingIndicator.css";

export default function LoadingIndicator(props) {
  return (
    <ClipLoader
      loading={true}
      color={props.color}
      cssOverride={props.cssOverride || {}}
      speedMultiplier={1}
      size="20px"
    />
  );
}