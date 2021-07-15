import React, { useContext, useEffect } from "react"
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
import { Checkbox, FormControlLabel, Slider } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import FilterService from "../../services/FilterService"

export default function FilterView() {
	const filterContext = useContext(FilterContext)
	const classes = FilterViewStyle()
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	useEffect(() => {
		const fetchUsers = async () => {
			// Overwrite the local state with the response from the server
			const receivedFilter = await FilterService.getFilter()
			const newFilter: IFilter = {
				...receivedFilter,
				isShown: filterContext.filter.isShown
			}
			filterContext.setFilter(newFilter)
		}
		fetchUsers()
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

	const setCurrencys = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			priceRange: {
				minPrice: filterContext.filter.priceRange?.minPrice,
				maxPrice: filterContext.filter.priceRange?.maxPrice,
				currency: event.target.value,
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			priceRange: {
				minPrice: event.target.valueAsNumber,
				maxPrice: filterContext.filter.priceRange?.maxPrice,
				currency: filterContext.filter.priceRange?.currency || "EUR",
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			priceRange: {
				minPrice: filterContext.filter.priceRange?.minPrice,
				maxPrice: event.target.valueAsNumber,
				currency: filterContext.filter.priceRange?.currency || "EUR",
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
				country: event.target.value.trim(),
				city: filterContext.filter.location?.city,
				zipCode: filterContext.filter.location?.zipCode,
				address: filterContext.filter.location?.address,
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setCity = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			location: {
				country: filterContext.filter.location?.country || "DE",
				city: event.target.value.trim(),
				zipCode: filterContext.filter.location?.zipCode,
				address: filterContext.filter.location?.address,
			},
		}
		filterContext.setFilter(newFilter)
	}

	const setZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilter: IFilter = {
			...filterContext.filter,
			location: {
				country: filterContext.filter.location?.country || "DE",
				city: filterContext.filter.location?.city,
				zipCode: event.target.value.trim(),
				address: filterContext.filter.location?.address,
			},
		}
		filterContext.setFilter(newFilter)
	}

	return (
		<React.Fragment>
			<Dialog
				fullScreen={fullScreen}
				open={filterContext.filter.isShown}
				onClose={handleCancel}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title" className={classes.dialogBackground}>Filter</DialogTitle>
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
									<Checkbox color="primary" checked={filterContext.filter.furnished} onChange={setFurnished} />
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
								value={[filterContext.filter.ageRange?.minAge || 0, filterContext.filter.ageRange?.maxAge || 100]}
								onChange={setAgeRange}
								valueLabelDisplay="on"
								aria-labelledby="range-slider"
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Typography id="ageRange" gutterBottom variant="subtitle1">
								Number of roommates
							</Typography>
							<Slider
								style={{ marginTop: 30 }}
								max={20}
								min={0}
								value={[filterContext.filter.roomMatesNumber?.minNumber || 0, filterContext.filter.roomMatesNumber?.maxNumber || 20]}
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
