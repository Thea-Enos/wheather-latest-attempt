import React from "react";

const rainMessage = "Looks like it's gonna rain! Bring an umbrella.";
const shouldShowRainMessage = true;

const jacketMessage = "It's chilly outside. Wear a jacket.";
const shouldShowJacketMessage = false;

const coatMessage = "It's cold outside. Wear a coat.";
const shouldShowCoatMessage = true;

const Recommendations = () => (
  <div>
    Here's how to be prepared ...
    {shouldShowRainMessage ? <div>{rainMessage}</div> : null}
    {shouldShowJacketMessage ? <div>{jacketMessage}</div> : null}
    {shouldShowCoatMessage ? <div>{coatMessage}</div> : null}
  </div>
);

export default Recommendations;
