import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const LocationSection = () => {
  const classes = useStyles();
  return (
    <section>
      <div>
        <div>Where will you be today?</div>
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="zip-input"
          label="Zip Code"
          variant="outlined"
          defaultValue="10011"
          type="string"
          helperText="Please enter a valid US zip code"
          inputProps={{
            inputMode: "numeric",
            autoComplete: "postal-code",
            autoFocus: "true",
            required: "true"
          }}
        />
      </form>
    </section>
  );
};

export default LocationSection;
