import { makeStyles } from "@material-ui/core/styles"

export const PersonalInformationStyles = makeStyles((theme) => ({
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
	},
	choiceSelector: {
		marginTop: theme.spacing(0),
		minWidth: 120,
	},
	gender: {
		marginTop: theme.spacing(2),
	},
	place_of_residency: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(-2),
	},
}))
