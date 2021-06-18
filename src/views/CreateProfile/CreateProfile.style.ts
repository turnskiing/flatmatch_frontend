import { makeStyles } from "@material-ui/core/styles"

export const CreateProfileStyles = makeStyles((theme) => ({
	layout: {
		width: "auto",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
			width: 900,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end",
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	card: {
		minWidth: 250,
		margin: 20
	},
	cardMedia: {
		height: 140,
	},
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
