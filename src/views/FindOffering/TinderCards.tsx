import React, { FC, ReactElement, useState } from "react"
import "./TinderCards.css"
import TinderCard from "react-tinder-card"
import DetailPage from "./DetailPage"
import { render } from "react-dom"

interface Props {
	title?: string
}

const TinderCards: FC<Props> = ({ title }): ReactElement => {
	const [listings, setPeople] = useState([
		{
			name: "Zentrales wohnen am Marienplatz: Stylisch möblierte Premium-WG",
			url: "https://pictures.immobilienscout24.de/listings/81ea8e03-c3b1-4771-a7f7-4bd2bdf455ed-1445457548.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
			description: "Nice warm friendly household"
		},
		{
			name: "Furnished room in international 4 people flat!!! with small Terrasse!! R1",
			url: "https://pictures.immobilienscout24.de/listings/f2e15e09-7b03-4a27-b523-2d7b876d6c34-1445457551.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
			description: "Nice warm friendly household"

		},
		{
			name: "*2* NEU-Renovierte 3erWG!!! mit BALKON! voll MÖBLIERT// new renovated flat for 3 people!!!*",
			url: "https://pictures.immobilienscout24.de/listings/4ea91338-876e-4a0b-8da9-bb0be297f591-1445457555.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
			description: "Nice warm friendly household"

		},
		{
			name: "Loft-WG // Möbliertes Zimmer, tolle Community in moderner internationaler 8er Loft - WG ",
			url: "https://pictures.immobilienscout24.de/listings/cf42f15e-7869-4f8c-a66f-4807138d1490-1445457553.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
			description: "Nice warm friendly household"

		},
	])

	const swiped = (direction: string, nameToDelete: string) => {
		// console.log("removing" + nameToDelete + direction)
		if (direction === 'up') {
			//    console.log("asd")
		}

	}
	const outOfFrame = (name: string) => {
		// console.log("someone has left the party" + name)
	}

	return (
		<div className={"tinderCards"}>

			<div className={"tinderCards_cardContainer"}>
				{listings.map((listing) => (
					<div className={"swipe"}>
						<TinderCard
							key={listing.name}
							preventSwipe={["down"]}
							onSwipe={(dir: string) => swiped(dir, listing.name)}
							onCardLeftScreen={() => outOfFrame(listing.name)}
						>
							<div
								style={{ backgroundImage: `url(${listing.url})` }}
								className={"card"}
							>
								<div className={'offer__description'}>
									<p id={'listing__title'}>{listing.name}</p>
									{listing.description}
								</div>
							</div>
						</TinderCard>
					</div>
				))}
			</div>
		</div>
	)
}

export default TinderCards
