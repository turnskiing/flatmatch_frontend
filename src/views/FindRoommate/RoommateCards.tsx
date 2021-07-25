import { FC, ReactElement, RefObject, useContext, useEffect, useMemo, useState } from "react"
import "./RoommateCards.css"
import "./SwipeRoommateButtons.css"
import TinderCard from "react-tinder-card"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import StarIcon from '@material-ui/icons/Star'
import IconButton from "@material-ui/core/IconButton"
import InfoIcon from '@material-ui/icons/Info'
import React from "react"
import { ICurrentApplicant } from "../../models/currentApplicant"
import { ApplicantsContext, CurrentApplicantContext } from "./FindRoommateView"
import { getAge } from "../../shared/calculateAge"
import RoommateDetailView from "./RoommateDetailsView"
import OfferService from "../../services/OfferService"
import MatchService, { IReceivedMatch } from "../../services/MatchService"
import UserService from "../../services/UserService"

interface Props {
	offerId: string
}

const RoommateCards: FC<Props> = ({ offerId }): ReactElement => {
	const currentApplicantContext = useContext(CurrentApplicantContext)
	const applicantsContext = useContext(ApplicantsContext)
	const applicantsData = applicantsContext.applicants


	const alreadyRemoved: string[] = []
	let applicantsState = applicantsData
	const [applicants, setApplicants] = useState(applicantsData)
	const childRefs: RefObject<any>[] = useMemo(() => Array(applicantsData.length).fill(0).map(i => React.createRef()), [applicantsData.length])

	useEffect(() => {
		const initializeCurrentApplicant = () => {
			const cardsLeft = applicants.filter(applicant => !alreadyRemoved.includes(applicant.email))
			if (cardsLeft.length) {
				const currentEmail = cardsLeft[cardsLeft.length - 1].email
				const newCurrentApplicant: ICurrentApplicant = {
					email: currentEmail,
					isShown: false
				}
				currentApplicantContext.setCurrentApplicant(newCurrentApplicant)
			}
		}
		initializeCurrentApplicant()
		// eslint-disable-next-line
	}, [])

	const swiped = async (direction: string, emailToDelete: string) => {
		if (direction === "up") {
			const newCurrentApplicant: ICurrentApplicant = {
				email: emailToDelete,
				isShown: true
			}
			currentApplicantContext.setCurrentApplicant(newCurrentApplicant)
		}
		if (direction === "right" || direction === "left") {
			alreadyRemoved.push(emailToDelete)

			// Create match
			if (direction === "right") {
				const user = await UserService.getUserByEmail(emailToDelete)
				const newMatch: IReceivedMatch = {
					applicant: user._id ?? "",
					tenant: UserService.getCurrentUser()._id,
					offer: offerId
				}
				await MatchService.createMatch(newMatch)
			}
			await OfferService.removeApplicantFromOffer(offerId, emailToDelete)

			// update currentApplicant
			const cardsLeft = applicants.filter(applicant => !alreadyRemoved.includes(applicant.email))
			if (cardsLeft.length) {
				const currentEmail = cardsLeft[cardsLeft.length - 1].email
				const newCurrentApplicant: ICurrentApplicant = {
					email: currentEmail,
					isShown: false
				}
				currentApplicantContext.setCurrentApplicant(newCurrentApplicant)
			} else {
				const newCurrentApplicant: ICurrentApplicant = {
					email: "",
					isShown: false
				}
				currentApplicantContext.setCurrentApplicant(newCurrentApplicant)
			}
		}
	}

	const outOfFrame = (email: string) => {
		applicantsState = applicantsState.filter(applicant => applicant.email !== email)
		setApplicants(applicantsState)
	}

	const swipe = (direction: string) => {
		if (direction === "right" || direction === "left") {
			const cardsLeft = applicants.filter(applicant => !alreadyRemoved.includes(applicant.email))
			if (cardsLeft.length) {
				// Find the card object to be removed and remove it
				const toBeRemoved = cardsLeft[cardsLeft.length - 1].email
				swiped(direction, toBeRemoved)
				// Find the index of which to make the reference to
				const index = applicantsData.map(applicant => applicant.email).indexOf(toBeRemoved)
				if (childRefs[index]) {
					// Swipe the card!
					childRefs[index].current.swipe(direction)
				}
			}
		}
	}

	const handleShowDetails = () => {
		const newCurrentApplicant: ICurrentApplicant = {
			...currentApplicantContext.currentApplicant,
			isShown: true,
		}
		currentApplicantContext.setCurrentApplicant(newCurrentApplicant)
	}

	return (
		<div>
			<div className={"tinderCards"}>
				<div className={"tinderCards_cardContainer"}>
					{applicants.map((applicant, index) => (
						<div className={'swipe'}>
							<TinderCard
								ref={childRefs[index]}
								key={applicant.email}
								preventSwipe={["down", "up"]}
								onSwipe={(dir: string) => swiped(dir, applicant.email)}
								onCardLeftScreen={() => outOfFrame(applicant.email)}
							>
								<div
									style={{ display: 'flex', backgroundImage: `url(${applicant.images[0] ? applicant.images[0].dataURL : "https://picsum.photos/seed/picsum/500/500"})` }}
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
											<Typography variant="h5" style={{ color: "white", paddingLeft: 30, paddingBottom: 20 }} gutterBottom>
												{applicant.occupation}
											</Typography>
										</Grid>
										<Grid item>
											<Typography variant="h4" style={{ color: "white", paddingLeft: 30 }} gutterBottom>
												{`${applicant.first_name}, ${getAge(new Date(applicant.date_of_birth ?? new Date()))}`}
											</Typography>
										</Grid>
									</Grid>
								</div>
							</TinderCard>
						</div>
					))}
				</div>
			</div>
			<div className="swipeButtons">
				<IconButton className="swipeButtons__left" onClick={() => swipe('left')}>
					<CloseIcon fontSize="large" />
				</IconButton>
				<IconButton className="swipeButtons__info" disabled={currentApplicantContext.currentApplicant.email.trim() === ""} onClick={() => handleShowDetails()}>
					<InfoIcon fontSize="large" />
				</IconButton>
				<IconButton className="swipeButtons__right" onClick={() => swipe('right')}>
					<StarIcon fontSize="large" />
				</IconButton>
			</div>
			<RoommateDetailView />
		</div>
	)
}

export default RoommateCards
