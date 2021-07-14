import "date-fns"
import React, {useContext} from "react"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import DeleteIcon from "@material-ui/icons/Delete"
import SyncIcon from "@material-ui/icons/Sync"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import DateFnsUtils from "@date-io/date-fns"
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers"
import ImageUploading, {ImageListType} from "react-images-uploading"
// Styles
import {OfferingInformationStyle} from "./OfferingInformation.style"
// Context
import {OfferContext} from "../../App"
// Models
import {IHousingOffer} from "../../models/housingOffer"
import {Slider} from "@material-ui/core"

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
]

export default function AddressForm() {
    const offerContext = useContext(OfferContext)
    const classes = OfferingInformationStyle()
    const maxNumber = 5
    const [sliderValue, setSliderValue] = React.useState([19, 80])


    const setPrice = (event: React.ChangeEvent<HTMLInputElement>) => {

        const newOffering: IHousingOffer = {
            ...offerContext.offer,
             price: {
                    amount: event.target.valueAsNumber,
                    currency: offerContext.offer.price.currency
             }
        }
        offerContext.setOffer(newOffering)
    }

    const setCurrencys = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOffering: IHousingOffer = {
            ...offerContext.offer,
            price: {
                amount: offerContext.offer.price.amount,
                currency: event.target.value
            }
        }
        offerContext.setOffer(newOffering)
    }

    const setImages = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        const newOffering: IHousingOffer = {
            ...offerContext.offer,
            images: imageList as never[]
        }
        offerContext.setOffer(newOffering)
    }

    const setCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOffer: IHousingOffer = {
            ...offerContext.offer,
            location: {
                country: event.target.value.trim(),
                city: offerContext.offer.location.city,
                zipCode: offerContext.offer.location.zipCode,
                address: offerContext.offer.location.address
            }
        }
        offerContext.setOffer(newOffer)
    }

    const setCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOffer: IHousingOffer = {
            ...offerContext.offer,
            location: {
                country: offerContext.offer.location.country,
                city: event.target.value.trim(),
                zipCode: offerContext.offer.location.zipCode,
                address: offerContext.offer.location.address
            }
        }
        offerContext.setOffer(newOffer)
    }

    const setZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOffer: IHousingOffer = {
            ...offerContext.offer,
            location: {
                country: offerContext.offer.location.country,
                city: offerContext.offer.location.city,
                zipCode: event.target.value.trim(),
                address: offerContext.offer.location.address
            }
        }
        offerContext.setOffer(newOffer)
    }

    const setAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOffer: IHousingOffer = {
            ...offerContext.offer,
            location: {
                country: offerContext.offer.location.country,
                city: offerContext.offer.location.city,
                zipCode: offerContext.offer.location.zipCode,
                address: event.target.value.trim(),
            }
        }
        offerContext.setOffer(newOffer)
    }

    const setRoomSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOffering: IHousingOffer = {
            ...offerContext.offer,
            roomSize: event.target.valueAsNumber,
        }
        offerContext.setOffer(newOffering)
    }

    const setYearConstructed = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOffering: IHousingOffer = {
            ...offerContext.offer,
            yearConstructed: event.target.valueAsNumber,
        }
        offerContext.setOffer(newOffering)
    }

    const setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOffering: IHousingOffer = {
            ...offerContext.offer,
            title: event.target.value,
        }
        offerContext.setOffer(newOffering)
    }

    const setAgeRange = (event: any, newValue: number | number[]) => {
        var newArray = []
        if(typeof newValue === "number")
            newArray = [newValue, 10]
        else
            newArray = [newValue[0], newValue[1]]

        setSliderValue(newArray)

        const newOffering: IHousingOffer = {
            ...offerContext.offer,
            ageRange: {
                minAge: newArray[0],
                maxAge: newArray[1],
            }
        }
        offerContext.setOffer(newOffering)
    }

    const setMoveInDate = (date: Date | null) => {
        const newOffering: IHousingOffer = {
            ...offerContext.offer,
            moveInDate: date
        }
        offerContext.setOffer(newOffering)
    }

    const setFurnished = (event: React.ChangeEvent<{ value: unknown }>) => {
        let isFurnished = false
        if (event.target.value as string === "Yes") {
            isFurnished = true
        }
        const newOffering: IHousingOffer = {
            ...offerContext.offer,
            furnished: isFurnished,
        }
        offerContext.setOffer(newOffering)
    }

    const setNumberOfRooms = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOffering: IHousingOffer = {
            ...offerContext.offer,
            numberOfRooms: event.target.valueAsNumber,
        }
        offerContext.setOffer(newOffering)
    }


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Offering Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ImageUploading
                        multiple
                        value={offerContext.offer.images}
                        onChange={setImages}
                        maxNumber={maxNumber}
                    >
                        {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              dragProps,
                          }) => (
                            <div className="upload__image-wrapper">
                                <Button
                                    className={classes.profileImage}
                                    variant="contained"
                                    startIcon={<AccountCircleIcon color="primary"/>}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Add Offer pictures *
                                </Button>
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image.dataURL} alt="" width="150"/>
                                        <div className="image-item__btn-wrapper">
                                            <IconButton
                                                className={classes.imageButtons}
                                                onClick={() => onImageUpdate(index)}
                                            >
                                                <SyncIcon/>
                                            </IconButton>
                                            <IconButton
                                                className={classes.imageButtons}
                                                onClick={() => onImageRemove(index)}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        autoComplete="title"
                        value={offerContext.offer.title}
                        onChange={setTitle}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <TextField
                        required
                        id="price"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        autoComplete="price"
                        value={offerContext.offer.price.amount}
                        onChange={setPrice}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <form className={classes.currency} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="select-currency"
                                select
                                label="Select"
                                value={offerContext.offer.price.currency}
                                onChange={setCurrencys}
                                helperText="Please select your currency"
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
                <Grid item xs={6} sm={3}>
                        <TextField
                            required
                            id="roomSize"
                            name="roomSize"
                            label="Room Size"
                            type="number"
                            fullWidth
                            autoComplete="roomSize"
                            value={offerContext.offer.roomSize}
                            onChange={setRoomSize}
                        />
                </Grid>
                <Grid item xs={6} sm={3}>
                        <TextField
                            id="numberOfRooms"
                            name="numberOfRooms"
                            label="Number of Rooms"
                            type="number"
                            fullWidth
                            autoComplete="numberOfRooms"
                            value={offerContext.offer.numberOfRooms}
                            onChange={setNumberOfRooms}
                        />
                </Grid>
                <Grid item xs={12} md={6}>
                        <TextField
                            id="yearConstructed"
                            name="yearConstructed"
                            label="Year Constructed"
                            type="number"
                            value={offerContext.offer.yearConstructed}
                            onChange={setYearConstructed}
                        />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <FormControl className={classes.dateSelector}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="moveInDate"
                                name="moveInDate"
                                label="Move in Date"
                                format="MM/dd/yyyy"
                                fullWidth
                                required
                                value={offerContext.offer.moveInDate}
                                onChange={setMoveInDate}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <FormControl className={classes.choiceSelector}>
                        <InputLabel id="select-furnished">Furnished *</InputLabel>
                        <Select
                            labelId="select-furnished"
                            id="select-furnished"
                            value={(offerContext.offer.furnished === true) ? "Yes" : "No"}
                            onChange={setFurnished}
                        >
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={3} className={classes.ageSelector}>
                <Typography id="ageRange" gutterBottom>
                    Age range of Applicants
                </Typography>
                <Slider
                    value={sliderValue}
                    onChange={setAgeRange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    // getAriaValueText={"valuetext"}
                />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.location}>
                    <Typography variant="h6">
                        Where is your appartment located?
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        value={offerContext.offer.location.country}
                        onChange={setCountry}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        value={offerContext.offer.location.city}
                        onChange={setCity}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zipcode"
                        name="zipcode"
                        label="Zipcode"
                        fullWidth
                        value={offerContext.offer.location.zipCode}
                        onChange={setZipcode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        value={offerContext.offer.location.address}
                        onChange={setAddress}
                    />
                </Grid>

            </Grid>
        </React.Fragment>
    )
}
