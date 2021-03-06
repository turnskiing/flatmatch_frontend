import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import validator from "validator"
// MaterialUI
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
// Componenets
import { Copyright } from "../../components/Copyright"
// Images
import Logo from "../../images/FlatMatch.png"
// Styles
import { SignInStyles } from "./SignInView.style"
// Context
import { UserContext } from "../../App"
import { IUser } from "../../models/user"
import UserService from "../../services/UserService"
import { AuthRoutes, NonAuthRoutes } from "../../Router"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"

export default function SignInSide() {
	const userContext = useContext(UserContext)
	const classes = SignInStyles()
	const [signUp, setSignUp] = useState(false)
	const [passwordAgain, setPasswordAgain] = useState<string>("")
	const [showDialog, setShowDialog] = useState<boolean>(false)
	const history = useHistory()

	const handleSignIn = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		try {
			await UserService.signIn(userContext.user.email, userContext.user.password)
			history.push(AuthRoutes.home)
		} catch (response) {
			history.push(NonAuthRoutes.signIn)
		}
	}

	const handleSignUp = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		if (await UserService.isEmailAvailable(userContext.user.email)) {
			history.push(NonAuthRoutes.createProfile)
		} else {
			setShowDialog(true)
		}
	}

	const handleClose = () => {
		setShowDialog(false)
	}


	const isDisabled = (): boolean => {
		return signUp
			? !isSignUpValid(
				userContext.user.email,
				userContext.user.password,
				passwordAgain
			)
			: !isSignInValid(
				userContext.user.email,
				userContext.user.password
			)
	}

	const setEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			email: event.target.value,
		}
		userContext.setUser(newUser)
	}

	const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			password: event.target.value,
		}
		userContext.setUser(newUser)
	}

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<img src={Logo} className={classes.logo} alt="" />
					<Grid container>
						<Grid item xs>
							<Typography component="h1" align="center" variant="h5">
								Welcome,
							</Typography>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs>
							<Typography component="h2" align="center" variant="subtitle1">
								{signUp ? "Sign up to get started!" : "Sign in to continue!"}
							</Typography>
						</Grid>
					</Grid>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={userContext.user.email}
							onChange={setEmail}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password (min. 8 characters)"
							type="password"
							id="password"
							autoComplete="current-password"
							value={userContext.user.password}
							onChange={setPassword}
						/>
						{signUp ? (
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password again"
								label="Password again"
								type="password"
								id="password"
								autoComplete="current-password"
								value={passwordAgain}
								onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
									setPasswordAgain(ev.target.value)
								}
							/>
						) : null}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={isDisabled()}
							onClick={signUp ? handleSignUp : handleSignIn}
						>
							{signUp ? "Sign Up" : "Sign In"}
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									href="#"
									variant="body2"
									align="right"
									onClick={() => {
										setSignUp(!signUp)
									}}
								>
									{signUp
										? "Already a member? Sign In Here"
										: "New user? Sign Up Here"}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
				<Dialog
					open={showDialog}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"This email address is already taken"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Please sign in with your existing account or create a new account with a different email address.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Ok
						</Button>
					</DialogActions>
				</Dialog>

			</Grid>
		</Grid>
	)
}

function isSignInValid(email: string, password: string): boolean {
	return isEmailValid(email) && password.length >= 8
}

function isSignUpValid(
	email: string,
	password: string,
	passwordAgain: string
): boolean {
	return (
		isEmailValid(email) && password.length >= 8 && password === passwordAgain
	)
}

function isEmailValid(email: string): boolean {
	return validator.isEmail(email)
}
