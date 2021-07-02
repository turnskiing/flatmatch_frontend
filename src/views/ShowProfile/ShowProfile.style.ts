import { makeStyles } from "@material-ui/core/styles"

export const ShowProfileStyles = makeStyles((theme) => ({
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
		[theme.breakpoints.up(900 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
		width: theme.spacing(20),
		height: theme.spacing(20),
	},
}))