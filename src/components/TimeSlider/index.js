import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Slider } from "@material-ui/core";
import moment from "moment-timezone";
import ValueLabel from "../ValueLabel";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + theme.spacing(3) * 2
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const formatter = {
  short: "LT",
  long: " h:mm A, MMM D"
};

const oneHour = 1000 * 60 * 60;
const getReadableTime = (timeInMs, useShortFormat) => {
  const formatMode = useShortFormat ? formatter.short : formatter.long;
  return moment(timeInMs).format(formatMode);
};

// Slider Range
const localStartOfCurrentHourMoment = moment().startOf("hour");
const localStartOfCurrentHourMs = localStartOfCurrentHourMoment.valueOf();
const localStartOfCurrentHourReadable = getReadableTime(
  localStartOfCurrentHourMs,
  false
);

const localStartOfOneDayFromNowMoment = moment()
  .add(1, "day")
  .startOf("hour");
const localStartOfOneDayFromNowMs = localStartOfOneDayFromNowMoment.valueOf();
const localStartOfOneDayFromNowReadable = getReadableTime(
  localStartOfOneDayFromNowMs,
  false
);

const localStartOfNextDayMoment = moment()
  .add(1, "day")
  .startOf("day");
const localStartOfNextDayMs = localStartOfNextDayMoment.valueOf();
const localStartOfNextDayReadable = getReadableTime(
  localStartOfNextDayMs,
  false
);

// Slider Defaults
const localStartOfNextHourMoment = moment()
  .add(1, "hour")
  .startOf("hour");
const localStartOfNextHourMs = localStartOfNextHourMoment.valueOf();

const localStartOfTwelveHoursFromNowMoment = moment()
  .add(12, "hours")
  .startOf("hour");
const localStartOfTwelveHoursFromNowMs = localStartOfTwelveHoursFromNowMoment.valueOf();

// console.log(value); // this is an array with two elements: the upper and lower limit ... [9, 23]
// On initial load and when new values are set, want to kick off the API call that gets forecast for these times
// I should restrict it so that the lower limit can never be earlier than this hour
// If it's now 8:30am I can set lower limit to 8am but not 7am
// Figure out a way to translate moment time into these values

// Start with this naively being 12am to 12 am, as 24 hours
// Gotta make these dynamically created ... from currentHoursFromStartOfToday to upper limit
// Maybe use rc-slider instead if I can't get the lower limit to be restricted more than what appear on the slider itself

const formatValueLabel = val => {
  return getReadableTime(val, true);
};

const CustomizedSlider = withStyles({
  root: {
    //color: "#52af77",
    height: 8,
    marginTop: 40,
    marginBottom: 20
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -6,
    marginLeft: -9,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const TimeSlider = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState([
    localStartOfNextHourMs,
    localStartOfTwelveHoursFromNowMs
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        When are you venturing out?
      </Typography>
      <CustomizedSlider
        value={value}
        onChange={handleChange}
        step={oneHour}
        valueLabelDisplay="on"
        min={localStartOfCurrentHourMs}
        max={localStartOfOneDayFromNowMs}
        valueLabelFormat={formatValueLabel}
        ValueLabelComponent={ValueLabel}
      />
      <div>Leaving Home: {getReadableTime(value[0], false)}</div>
      <div>Returning: {getReadableTime(value[1], false)}</div>
    </div>
  );
};

export default TimeSlider;
