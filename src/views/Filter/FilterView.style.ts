import { makeStyles } from "@material-ui/core/styles"

export const FilterViewStyle = makeStyles((theme) => ({
	currency: {
		'& .MuiTextField-root': {
			margin: theme.spacing(0),
			width: '20ch',
		}
	},
	priceRange: {
		marginTop: theme.spacing(3),
	}
}))
