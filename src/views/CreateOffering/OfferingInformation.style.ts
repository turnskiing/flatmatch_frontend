import {makeStyles} from "@material-ui/core/styles"

export const OfferingInformationStyle = makeStyles((theme) => ({
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
        minWidth: 150,
    },
    dateSelector: {
        marginTop: theme.spacing(0),

    },
    location: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(-2),
    },
    currency: {
        '& .MuiTextField-root': {
            margin: theme.spacing(0),
            width: '25ch',
        }
    },
    ageSelector: {
        marginTop: theme.spacing(1.5),
    },
}))
