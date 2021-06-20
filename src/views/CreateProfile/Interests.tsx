import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// Context
import { UserContext } from "../../App";
// Models
import { IUser } from "../../models/user";

export default function Interests() {
  const userContext = useContext(UserContext);

  const setBio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUser: IUser = {
      ...userContext.user,
      bio: event.target.value,
    };
    userContext.setUser(newUser);
  };

  const setInterests = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUser: IUser = {
      ...userContext.user,
      interests: [event.target.value],
    };
    userContext.setUser(newUser);
  };

  const setAcceptedTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUser: IUser = {
      ...userContext.user,
      acceptedTerms: event.target.checked,
    };
    userContext.setUser(newUser);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Interests
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Bio
          </Typography>
          <TextField
            id="bio"
            label="Describe yourself briefly (max 200 characters)"
            multiline
            fullWidth
            rows={4}
            inputProps={{
              maxLength: 200,
            }}
            defaultValue=""
            variant="outlined"
            value={userContext.user.bio}
            onChange={setBio}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            What are you interested in?
          </Typography>
          <TextField
            required
            id="Add-interests-icon-here"
            label="Add interests icon here"
            helperText="Add interests icon here"
            fullWidth
            autoComplete="cc-csc"
            value={userContext.user.interests}
            onChange={setInterests}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="termsOfService"
                checked={userContext.user.acceptedTerms}
                onChange={setAcceptedTerms}
              />
            }
            label="I accept the Terms of Service"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
