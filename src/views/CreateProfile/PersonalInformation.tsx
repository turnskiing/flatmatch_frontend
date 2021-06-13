import "date-fns";
import React from "react";
import { makeStyles } from '@material-ui/core/styles'
import {
  faTransgenderAlt,
  faVenus,
  faMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from '@material-ui/icons/Delete';
import SyncIcon from '@material-ui/icons/Sync';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ImageUploading, { ImageListType } from "react-images-uploading";

const useStyles = makeStyles((theme) => ({
	profileImage: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
    padding: 10,
    backgroundColor: "white",
	},
  imageButtons: {
    backgroundColor: "white",
    padding: 0,
    marginLeft: 5,
  }
}))

export default function AddressForm() {
  const classes = useStyles()
  const [images, setImages] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [gender, setGender] = React.useState<string | null>(null);
  const maxNumber = 5;

  const handleImageChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string | null
  ) => {
    setGender(newGender);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ImageUploading
            multiple
            value={images}
            onChange={handleImageChange}
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
                  startIcon={<AccountCircleIcon color="primary" />}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Add Profile pictures
                </Button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.dataURL} alt="" width="150" />
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
                      <DeleteIcon />
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
            id="fullName"
            name="fullName"
            label="Full name"
            fullWidth
            autoComplete="full-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textSecondary" component="span">
            Gender:{" "}
          </Typography>
          <ToggleButtonGroup
            value={gender}
            size="medium"
            exclusive
            onChange={handleGender}
            aria-label="select gender"
          >
            <ToggleButton value="female" aria-label="female" style= {{padding: 15}}>
              <FontAwesomeIcon icon={faVenus} />
            </ToggleButton>
            <ToggleButton value="male" aria-label="male" style= {{padding: 15}}>
              <FontAwesomeIcon icon={faMars}/>
            </ToggleButton>
            <ToggleButton value="PreferNotToSay" aria-label="Prefer not to say" style= {{padding: 15}}>
              <FontAwesomeIcon icon={faTransgenderAlt} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of birth"
              format="MM/dd/yyyy"
              fullWidth
              required
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="placeOfResidency"
            name="placeOfResidency"
            label="Place of Residency"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="occupation"
            name="occupation"
            label="Occupation / Field of Study"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
