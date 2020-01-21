import React from "react";
import moment from "moment-timezone";
import TimeSlider from "../TimeSlider";
import _ from "lodash";
import dummyData from "../../dummyWeatherData";

// TODO: build for what happens if hit too many api calls per unit time
// TODO: use local storage as cache so don't need to hit api again for every update
// TODO: shout out to api provider in app
// TODO: determine best way to handle api key / cors stuff in prod
// TODO: set up the whole thing in vscode
const convertKelvinToFarenheit = kelvinTemp =>
  ((kelvinTemp - 273.15) * 9) / 5 + 32;

const Forecast = () => {
  const fetchWeatherData = async () => {
    const openWeatherApiKey = process.env.OPEN_WEATHER_KEY;
    const zip = "11209";
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${openWeatherApiKey}`;
    const response = await fetch(openWeatherUrl);
    const json = await response.json();
    return json;
  };

  React.useEffect(() => {
    (async () => {
      // REAL
      //const openWeatherData = await fetchWeatherData();

      //DUMMY
      const openWeatherData = dummyData;

      const allForecasts = _.get(openWeatherData, "list", []);

      // TODO: change to get real start time from user input
      // Which would be like: User says when to start and stop today.
      // To them it looks like what hour of the day but behind the scenes
      // it's how long from now. Those how long from nows are what's added
      // via moment to get start and stop times.

      const startTime = moment.utc().add(2, "hours");
      // TODO: change to get real stop time form user input
      const stopTime = moment.utc().add(16, "hours");
      // TODO: now have to get all forecast objects that are covered by the on time

      // First Forecast
      const firstAfterStartTime = allForecasts.find(f =>
        moment.utc(f.dt_txt).isAfter(startTime)
      );
      const firstAfterStartIndex = allForecasts.indexOf(firstAfterStartTime);
      const startIndex = firstAfterStartIndex - 1;
      const firstForecastToScan = allForecasts[startIndex];
      //console.log(firstForecastToScan);

      // Last Forecast
      const firstAfterEndTime = allForecasts.find(f =>
        moment.utc(f.dt_txt).isAfter(stopTime)
      );
      const firstAfterStopIndex = allForecasts.indexOf(firstAfterEndTime);
      const stopIndex = firstAfterStopIndex - 1;
      const lastForecastToScan = allForecasts[stopIndex];
      //console.log(lastForecastToScan);

      // Forecasts to Heed
      const forecastsToConsider = allForecasts.filter(
        f =>
          allForecasts.indexOf(f) >= startIndex &&
          allForecasts.indexOf(f) <= stopIndex
      );
      console.log(forecastsToConsider);

      const feelsLikeTemps = forecastsToConsider.map(f => f.main.feels_like);
      console.log(feelsLikeTemps);

      const minFeelsLikeKelvin = Math.min(...feelsLikeTemps);
      const minFeelsLikeFarenheit = convertKelvinToFarenheit(
        minFeelsLikeKelvin
      );
      console.log(minFeelsLikeFarenheit);

      const coatMaxFarenheit = 40;
      const jacketMaxFarenheit = 65;

      if (minFeelsLikeFarenheit < coatMaxFarenheit) {
        const outerwearMessage = "Wear a winter coat!";
        // TODO: figure out how to get this to show
      }

      // TODO: Now scan through all forecast objects from first through last,
      // finding the min temp and the max chance of precipitation
      // (does it depend what kind?)

      // Gotta go UTC cuz that's how it is in API data
      //console.log(startTime.format());
      //console.log(moment.utc(firstAfterStartTime.dt_txt).format());
    })();
  }, []);

  return <div>Test</div>;
};

export default Forecast;
