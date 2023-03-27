import React from "react";
import { LeapFrog } from "@uiball/loaders";

function Loader() {
  return (
    <div className="loader-container">
      <LeapFrog size={80} speed={0.9} color="white" />
    </div>
  );
}

export default Loader;
