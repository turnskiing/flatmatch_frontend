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
		marginTop: theme.spacing(2),
		minWidth: 120,
	},
}))
