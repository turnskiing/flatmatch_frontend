import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import validator from 'validator'
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
import { Copyright } from "../components/Copyright"
// Images
import Logo from "../images/FlatMatch.png"
// Styles
import { SignInStyles } from "./SignInView.style"


export default function SignInSide() {
	const classes = SignInStyles()
	const [signUp, setSignUp] = useState(false)
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [passwordAgain, setPasswordAgain] = useState<string>("")
	const history = useHistory()

	function handleSubmit() {
		history.push('home/find_room')
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
								{signUp ? ("Sign up to get started!") : ("Sign in to continue!")}
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
							value={email}
							onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setEmail(ev.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPassword(ev.target.value)}
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
								onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setPasswordAgain(ev.target.value)}
							/>) : null}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={signUp ? !isSignUpValid(email, password, passwordAgain) : !isSignInValid(email, password)}
							onClick={handleSubmit}
						>
							{signUp ? ("Sign Up") : ("Sign In")}
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
									onClick={() => { setSignUp(!signUp) }}
								>
									{signUp ? ("Already a member? Sign In Here") : ("New user? Sign Up Here")}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	)
}

function isSignInValid(email: string, password: string): boolean {
	return isEmailValid(email) && password.length >= 8
}

function isSignUpValid(email: string, password: string, passwordAgain: string): boolean {
	return isEmailValid(email) && password.length >= 8 && password === passwordAgain
}

function isEmailValid(email: string): boolean {
	return validator.isEmail(email)
}