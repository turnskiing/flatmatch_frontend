import { makeStyles } from "@material-ui/core/styles"

export const FilterViewStyle = makeStyles((theme) => ({
	currency: {
		'& .MuiTextField-root': {
			margin: theme.spacing(0),
			width: '20ch',
		}
	},
	subtitle: {
		padding: 0,
		marginBottom: -20
	},
	dialogBackground: {
		backgroundColor: theme.palette.grey[200],
	},
}))
