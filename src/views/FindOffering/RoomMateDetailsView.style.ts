import { makeStyles } from "@material-ui/core/styles"

export const RoommateDetailsViewStyle = makeStyles((theme) => ({
	disabledInput: {
		"& .MuiInputBase-root.Mui-disabled": {
			color: "#122130"
		},
	},
	dialogBackground: {
		backgroundColor: theme.palette.grey[200],
	},
	place_of_residency: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(-2),
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	margin: {
		margin: theme.spacing(1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	bio: {
		marginTop: theme.spacing(2),
	},
	chipRoot: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		listStyle: "none",
		padding: theme.spacing(1),
		margin: 0,
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	imageList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
}))
