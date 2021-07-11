import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import { currencies } from "../CreateOffering/OfferingInformation";
import { FilterViewStyle } from "./FilterView.style";
import { FilterContext } from "../../App";
import { IFilter } from "../../models/filter";
import Typography from "@material-ui/core/Typography";
import { Checkbox, FormControlLabel, Slider } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function FilterView() {
  const filterContext = useContext(FilterContext);
  const classes = FilterViewStyle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [sliderValue, setSliderValue] = React.useState([0, 100]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setCurrencys = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IFilter = {
      ...filterContext.filter,
      priceRange: {
        minPrice: filterContext.filter.priceRange?.minPrice,
        maxPrice: filterContext.filter.priceRange?.maxPrice,
        currency: event.target.value,
      },
    };
    filterContext.setFilter(newFilter);
  };

  const setMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IFilter = {
      ...filterContext.filter,
      priceRange: {
        minPrice: event.target.valueAsNumber,
        maxPrice: filterContext.filter.priceRange?.maxPrice,
        currency: filterContext.filter.priceRange?.currency || "EUR",
      },
    };
    filterContext.setFilter(newFilter);
  };

  const setMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IFilter = {
      ...filterContext.filter,
      priceRange: {
        minPrice: filterContext.filter.priceRange?.minPrice,
        maxPrice: event.target.valueAsNumber,
        currency: filterContext.filter.priceRange?.currency || "EUR",
      },
    };
    filterContext.setFilter(newFilter);
  };

  const setAgeRange = (event: any, newValue: number | number[]) => {
    let newArray = [];
    if (typeof newValue === "number") newArray = [newValue, 10];
    else newArray = [newValue[0], newValue[1]];

    setSliderValue(newArray);

    const newFilter: IFilter = {
      ...filterContext.filter,
      ageRange: {
        minAge: newArray[0],
        maxAge: newArray[1],
      },
    };
    filterContext.setFilter(newFilter);
  };

  const setRoomMatesNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IFilter = {
      ...filterContext.filter,
      roomMatesNumber: event.target.valueAsNumber,
    };
    filterContext.setFilter(newFilter);
  };

  const setFurnished = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IFilter = {
      ...filterContext.filter,
      furnished: event.target.checked,
    };
    filterContext.setFilter(newFilter);
  };

  const setDate = (date: Date | null) => {
	const newFilter: IFilter = {
		...filterContext.filter,
		minYearConstructed: date,
	}
	filterContext.setFilter(newFilter);
}

  const setCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IFilter = {
      ...filterContext.filter,
      location: {
        country: event.target.value.trim(),
        city: filterContext.filter.location?.city,
        zipCode: filterContext.filter.location?.zipCode,
        address: filterContext.filter.location?.address,
      },
    };
    filterContext.setFilter(newFilter);
  };

  const setCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IFilter = {
      ...filterContext.filter,
      location: {
        country: filterContext.filter.location?.country || "DE",
        city: event.target.value.trim(),
        zipCode: filterContext.filter.location?.zipCode,
        address: filterContext.filter.location?.address,
      },
    };
    filterContext.setFilter(newFilter);
  };

  const setZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IFilter = {
      ...filterContext.filter,
      location: {
        country: filterContext.filter.location?.country || "DE",
        city: filterContext.filter.location?.city,
        zipCode: event.target.value.trim(),
        address: filterContext.filter.location?.address,
      },
    };
    filterContext.setFilter(newFilter);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Show Filter
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Filter Appartments</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide us with some details and we will only show appartments to
            you that match your preferences.
          </DialogContentText>
          <Grid container spacing={3} className={classes.priceRange}>
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Monthly rent
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="price"
                name="price"
                label="Min. Price"
                type="number"
                fullWidth
                autoComplete="price"
                value={filterContext.filter.priceRange?.minPrice}
                onChange={setMinPrice}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="price"
                name="price"
                label="Max. Price"
                type="number"
                fullWidth
                autoComplete="price"
                value={filterContext.filter.priceRange?.maxPrice}
                onChange={setMaxPrice}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <form className={classes.currency} noValidate autoComplete="off">
                <div>
                  <TextField
                    id="select-currency"
                    select
                    label="Select"
                    helperText="Please select your currency"
                    value={filterContext.filter.priceRange?.currency}
                    onChange={setCurrencys}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </form>
            </Grid>
			<Grid item xs={12} sm={6}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin="normal"
							id="yearOfConstruction"
							name="yearOfConstruction"
							label="Year constructed (from)"
							format="yyyy"
							fullWidth
							value={filterContext.filter.minYearConstructed}
							onChange={setDate}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
				<Checkbox color="primary" checked={filterContext.filter.furnished} onChange={setFurnished}/>
			}
                label="Furnished"
                labelPlacement="start"
				style={{paddingTop: 27, marginLeft: 0}}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Location
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="country"
                name="country"
                label="Country"
                fullWidth
                value={filterContext.filter.location?.country}
                onChange={setCountry}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="City"
                fullWidth
                value={filterContext.filter.location?.city}
                onChange={setCity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="zipcode"
                name="zipcode"
                label="Zipcode"
                fullWidth
                value={filterContext.filter.location?.zipCode}
                onChange={setZipcode}
              />
            </Grid>
            <Grid item xs={6} sm={12}>
              <Typography id="ageRange" gutterBottom variant="subtitle1">
                Age range of room mates
              </Typography>
              <Slider
                style={{ marginTop: 30 }}
                value={sliderValue}
                onChange={setAgeRange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="roommatesNumber"
                name="roommatesNumber"
                label="Number of roommates"
                type="number"
                fullWidth
                value={filterContext.filter.roomMatesNumber}
                onChange={setRoomMatesNumber}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
