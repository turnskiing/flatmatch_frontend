import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardMedia, IconButton} from "@material-ui/core"
import {IHousingOffer} from "../models/housingOffer"
import {AuthRoutes} from "../Router"
import {useHistory} from "react-router-dom"
import {OfferContext} from "../App"
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
    root: {
        position: "relative"
    },
    media: {
        height: 190,
    },
    button: {
        position: "absolute",
        bottom: "1vh",
        right: "1vh"
    }
})

export default function OfferCard(
	offer: IHousingOffer
) {
    const classes = useStyles()
    const city: string = JSON.stringify(offer.location.city).replace(/['"]+/g, '')
    const country: string = JSON.stringify(offer.location.country).replace(/['"]+/g, '')
    const address: string = JSON.stringify(offer.location.address).replace(/['"]+/g, '')
    const offerContext = useContext(OfferContext)
    const history = useHistory()


    const handleEdit = () => {
        offerContext.setOffer(offer)
        history.push({
            pathname: AuthRoutes.editOffer,
            state: offer._id
        })
    }

	const findRoomates = () => {
		offerContext.setOffer(offer)
		history.push({
			pathname: AuthRoutes.findRoommate,
			state: offer._id
		})
	}

    return (
        <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={offer.images[0] !== undefined ? offer.images[0].dataURL : ""}
                    title="Offer Picture"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {offer.title}
                    </Typography>
                    <Typography>
                        {country}
                    </Typography>
                    <Typography>
                        {city}
                    </Typography>
                    <Typography>
                        {address}
                    </Typography>
                </CardContent>
            <CardActions>
                    <Button variant={"outlined"} onClick={findRoomates} size="medium" color="primary">
                        Find Roomies!
                    </Button>
                    <IconButton color="secondary" onClick={handleEdit} className={classes.button} aria-label="edit offer">
                        <EditIcon/>
                    </IconButton>
            </CardActions>
        </Card>
    )
}