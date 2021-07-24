import React, { useContext, useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem"
import { useTheme } from "@material-ui/core/styles"
import { currencies } from "../CreateOffering/OfferingInformation"
import { FilterViewStyle } from "./FilterView.style"
import { FilterContext } from "../../App"
import { IFilter } from "../../models/filter"
import Typography from "@material-ui/core/Typography"
import {
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Slider,
} from "@material-ui/core"
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import FilterService from "../../services/FilterService"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import LocationService from "../../services/LocationService"

export default function FilterView() {
	const filterContext = useContext(FilterContext)
	const classes = FilterViewStyle()
	const theme = useTheme()
	const [isLoading, setLoading] = useState<boolean>(false)
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	useEffect(() => {
		const fetchFilter = async () => {
			// Overwrite the local state with the response from the server
			const receivedFilter = await FilterService.getFilter()
			const newFilter: IFilter = {
				...receivedFilter,
				isShown: filterContext.filter.isShown
			}
			filterContext.setFilter(newFilter)
		}
		fetchFilter()
		// eslint-disable-next-line
	}, [])

	const handleSave = async () => {
		try {
			await FilterService.updateFilter(filterContext.filter)
		} catch (response) {
			// tslint:disable-next-line:no-console
			console.log("Error when updating filter: " + response)
		} finally {
			const newFilter: IFilter = {
				...filterContext.filter,
				isShown: false,
			}
			filterContext.setFilter(newFilter)
		}
	}

	const handleCancel = async () => {
		try {
			const receivedFilter = await FilterService.getFilter()
			const newFilter: IFilter = {
				...receivedFilter,
				isShown: false,
			}
			filterContext.setFilter(newFilter)
		} catch (response) {
			// tslint:disable-next-line:no-console
			console.log("Error when loading filter: " + response)
			const newFilter: IFilter = {
				...filterContext.filter,
				isShown: false,
			}
			filterContext.setFilter(newFilter)
		}
	}

	const setCurrencies = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			priceRange: {
				...filterContext.filter.priceRange,
				currency: event.target.value,
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			priceRange: {
				...filterContext.filter.priceRange,
				minPrice: event.target.valueAsNumber,
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			priceRange: {
				...filterContext.filter.priceRange,
				maxPrice: event.target.valueAsNumber,
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setAgeRange = (event: any, newValue: number | number[]) => {
		let newArray = []
		if (typeof newValue === "number") newArray = [newValue, 10]
		else newArray = [newValue[0], newValue[1]]

		const newFilter: IFilter = {
			...filterContext.filter,
			ageRange: {
				minAge: newArray[0],
				maxAge: newArray[1],
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setRoomMatesNumber = (event: any, newValue: number | number[]) => {
		let newArray = []
		if (typeof newValue === "number") newArray = [newValue, 10]
		else newArray = [newValue[0], newValue[1]]

		const newFilter: IFilter = {
			...filterContext.filter,
			roomMatesNumber: {
				minNumber: newArray[0],
				maxNumber: newArray[1],
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setFurnished = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			furnished: event.target.checked,
		}
		filterContext.setFilter(newFilter)
	}

	const setDate = (date: Date | null) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			minYearConstructed: date,
		}
		filterContext.setFilter(newFilter)
	}

	const setCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			location: {
				...filterContext.filter.location,
				country: event.target.value.trim(),
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setCity = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			location: {
				...filterContext.filter.location,
				city: event.target.value.trim(),
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			location: {
				...filterContext.filter.location,
				zipCode: event.target.value.trim(),
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			location: {
				...filterContext.filter.location,
				address: event.target.value.trim(),
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			location: {
				...filterContext.filter.location,
				distance: event.target.valueAsNumber,
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setCurrentLocationToFilter = async () => {
		setLoading(true)
		try {
			navigator.geolocation.getCurrentPosition(
				async (position: any) => {
					const response =
						await LocationService.getCurrentLocationFromCoordinates(
							position.coords.latitude,
							position.coords.longitude
						)

					if (response.data !== undefined) {
						const data = response.data[0]
						let newFilter: IFilter
						newFilter = {
							...filterContext.filter,
							location: {
								country: data.country ?? filterContext.filter.location.country,
								city: data.locality ?? filterContext.filter.location.city,
								zipCode: data.postal_code ?? filterContext.filter.location.zipCode,
								address:
									data.street === null || data.number === null
										? filterContext.filter.location.address
										: data.street + " " + data.number,
								distance: filterContext.filter.location.distance,
							},
						}
						filterContext.setFilter(newFilter)
					}
					setLoading(false)
					// tslint:disable-next-line
				}, () => { }, { enableHighAccuracy: false }
			)
		} catch (error) {
			// tslint:disable-next-line:no-console
			console.log(error)
		}
	}

	return (
		<React.Fragment>
			<Dialog
				fullScreen={fullScreen}
				open={filterContext.filter.isShown}
				onClose={handleCancel}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle
					id="form-dialog-title"
					className={classes.dialogBackground}
				>
					Filter
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12}>
							<Typography variant="h6" style={{ marginBottom: -25 }}>
								Appartment
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									views={["year"]}
									margin="normal"
									id="yearOfConstruction"
									name="yearOfConstruction"
									label="Year constructed (from)"
									format="yyyy"
									fullWidth
									value={filterContext.filter.minYearConstructed || null}
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
									<Checkbox
										color="primary"
										checked={filterContext.filter.furnished}
										onChange={setFurnished}
									/>
								}
								label="Furnished"
								labelPlacement="start"
								style={{ paddingTop: 27, marginLeft: 0 }}
							/>
						</Grid>
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
										onChange={setCurrencies}
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
						<Grid item xs={12} sm={6}>
							<TextField
								id="address"
								name="address"
								label="Address"
								fullWidth
								value={filterContext.filter.location?.address}
								onChange={setAddress}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="distance"
								name="distance"
								label="Max. distance (km)"
								type="number"
								fullWidth
								autoComplete="distance"
								value={filterContext.filter.location?.distance}
								onChange={setDistance}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							{isLoading ? (
								<CircularProgress color="secondary" />
							) : (
								<Button
									variant="outlined"
									style={{ marginTop: 12 }}
									onClick={async () => {
										await setCurrentLocationToFilter()
									}}
								>
									<LocationOnIcon
										color="primary"
										style={{ paddingRight: 10 }}
									/>
									Get current location
								</Button>
							)}
						</Grid>
						<Grid item xs={12} sm={12}>
							<Typography variant="h6" style={{ paddingTop: 20 }}>
								Roommates
							</Typography>
						</Grid>
						<Grid item xs={6} sm={12}>
							<Typography id="ageRange" gutterBottom variant="subtitle1">
								Age range
							</Typography>
							<Slider
								style={{ marginTop: 30 }}
								min={17}
								max={80}
								value={[
									filterContext.filter.ageRange?.minAge || 17,
									filterContext.filter.ageRange?.maxAge || 80,
								]}
								onChange={setAgeRange}
								valueLabelDisplay="on"
								aria-labelledby="range-slider"
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Typography id="roommatesNumber" gutterBottom variant="subtitle1">
								Number of roommates
							</Typography>
							<Slider
								style={{ marginTop: 30 }}
								max={20}
								min={1}
								value={[
									filterContext.filter.roomMatesNumber?.minNumber || 1,
									filterContext.filter.roomMatesNumber?.maxNumber || 20,
								]}
								onChange={setRoomMatesNumber}
								valueLabelDisplay="on"
								aria-labelledby="range-slider"
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						Cancel
					</Button>
					<Button variant="contained" onClick={handleSave} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}
