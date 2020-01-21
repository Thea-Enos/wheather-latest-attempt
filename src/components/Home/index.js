import React from "react";
import LocationSection from "../LocationSection";
import NavigationButton from "../NavigationButton";
import Forecast from "../Forecast";
import TimeSlider from "../TimeSlider";
import styled from "styled-components";
import Recommendations from "../Recommendations";

const Title = styled.h1`
  color: palevioletred;
`;

const Home = () => (
  <div className="App">
    <NavigationButton route="/about" label="about" />
    <Title>Weather or Not</Title>
    <Forecast />
    <LocationSection />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TimeSlider />
    </div>
    <Recommendations />
  </div>
);

export default Home;
