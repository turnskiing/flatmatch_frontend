/* tslint:disable */


import React, {FC, ReactElement, RefObject, useContext, useEffect, useMemo, useState} from "react"
import "./TinderCards.css"
import TinderCard from "react-tinder-card"
import DetailPage from "./DetailPage"
import {render} from "react-dom"
import {OfferContext, OffersContext, UserContext} from "../../App"
import {defaultOffer, IHousingOffer} from "../../models/housingOffer"
import OfferDetailsView from "./DetailPage"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import StarIcon from '@material-ui/icons/Star'
import InfoIcon from '@material-ui/icons/Info'
import {CurrentOfferContext} from "./FindOfferingView"
import {defaultCurrentOffer, ICurrentOffer} from "../../models/currentOffer"
import {Grid, Typography} from "@material-ui/core"
import "./SwipeButtons.css"

interface Props {
    title?: string
}

const TinderCards = (): ReactElement => {
    const offersContext = useContext(OffersContext)
    const listings = offersContext.offers

    const offerContext = useContext(OfferContext)
    const currentOfferContext = useContext(CurrentOfferContext)


    const alreadyRemoved: string[] = []
    let offersState = listings
    const [offers, setOffers] = useState(listings)

    const childRefs: RefObject<any>[] = useMemo(() => Array(listings.length).fill(0).map(i => React.createRef()), [listings.length])

    useEffect(() => {
        const initializeCurrentApplicant = () => {
            const cardsLeft = offers.filter(applicant => !alreadyRemoved.includes(applicant._id))
            if (cardsLeft.length) {
                const currentEmail = cardsLeft[cardsLeft.length - 1]._id
                const newCurrentOffer: ICurrentOffer = {
                    _id: currentEmail,
                    isShown: false
                }
                currentOfferContext.setCurrentOffer(newCurrentOffer)
            }
        }
        initializeCurrentApplicant()
        // eslint-disable-next-line
    }, [])

    const swiped = (direction: string, emailToDelete: string) => {
        if (direction === "up") {
            const newCurrentOffer: ICurrentOffer = {
                _id: emailToDelete,
                isShown: true
            }
            currentOfferContext.setCurrentOffer(newCurrentOffer)
        }
        if (direction === "right" || direction === "left") {
            alreadyRemoved.push(emailToDelete)
            // update currentApplicant
            const cardsLeft = offers.filter(applicant => !alreadyRemoved.includes(applicant._id))
            if (cardsLeft.length) {
                const currentEmail = cardsLeft[cardsLeft.length - 1]._id
                const newCurrentApplicant: ICurrentOffer = {
                    _id: currentEmail,
                    isShown: false
                }
                currentOfferContext.setCurrentOffer(newCurrentApplicant)
            } else {
                const newCurrentApplicant: ICurrentOffer = {
                    _id: "",
                    isShown: false
                }
                currentOfferContext.setCurrentOffer(newCurrentApplicant)
            }
        }
    }

    const outOfFrame = (email: string) => {
        offersState = offersState.filter(applicant => applicant._id !== email)
        setOffers(offersState)
    }

    const swipe = (direction: string) => {
        if (direction === "right" || direction === "left") {
            const cardsLeft = offers.filter(applicant => !alreadyRemoved.includes(applicant._id))
            if (cardsLeft.length) {
                // Find the card object to be removed and remove it
                const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id
                swiped(direction, toBeRemoved)
                // Find the index of which to make the reference to
                const index = listings.map(applicant => applicant._id).indexOf(toBeRemoved)
                if (childRefs[index]) {
                    // Swipe the card!
                    childRefs[index].current.swipe(direction)
                }
            }
        }
    }

    const handleShowDetails = () => {
        const newCurrentApplicant: ICurrentOffer = {
            ...currentOfferContext.currentOffer,
            isShown: true,
        }
        currentOfferContext.setCurrentOffer(newCurrentApplicant)
    }


    return (
        <div className={"tinderCards"}>
            <div className={"tinderCards_cardContainer"}>
                {listings.map((listing, index) => (
                    <div className={"swipe"}>
                        <TinderCard
                            ref={childRefs[index]}
                            key={listing._id}
                            preventSwipe={["down", "up"]}
                            onSwipe={(dir: string) => swiped(dir, listing._id)}
                            onCardLeftScreen={() => outOfFrame(listing._id)}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    backgroundImage: listing.images[0] ? `url(${listing.images[0]})` : `url(https://picsum.photos/seed/picsum/500/500)`
                                }}
                                className={"card"}
                            >
                                <Grid
                                    container
                                    direction="column-reverse"
                                    justify-content="space-evenly"
                                    alignItems="flex-start"
                                    className="gradient"
                                >
                                    <Grid item>
                                        <Typography variant="h5"
                                                    style={{color: "white", paddingLeft: 30, paddingBottom: 20}}
                                                    gutterBottom>
                                            {listing.location.city}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h4" style={{color: "white", paddingLeft: 30}} gutterBottom>
                                            {`${listing.location.country}`}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </div>
                        </TinderCard>
                    </div>
                ))}
            </div>
            <div className="swipeButtons">
                <IconButton className="swipeButtons__left" onClick={() => swipe('left')}>
                    <CloseIcon fontSize="large"/>
                </IconButton>
                <IconButton className="swipeButtons__info"
                            disabled={currentOfferContext.currentOffer._id.trim() === ""}
                            onClick={() => handleShowDetails()}>
                    <InfoIcon fontSize="large"/>
                </IconButton>
                <IconButton className="swipeButtons__right" onClick={() => swipe('right')}>
                    <StarIcon fontSize="large"/>
                </IconButton>
            </div>
            <OfferDetailsView/>
        </div>
    )
}

export default TinderCards
