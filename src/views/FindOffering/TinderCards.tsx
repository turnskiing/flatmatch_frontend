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
			tenants: ["tomwenzel@hotmail.de"],
			price: {
				amount: 400,
				currency: "EUR"
			},
			images: ["https://www.juergen-reichmann.de/images/pics/1313000/1313021.jpg"],
			location: {
				country: "Germany",
				city: "Munich",
				zipCode: "80805",
				address: "Grasmeierstraße 27"
			},
			description: "Wunderschoenes zweistoeckiges Haus in bester Lage in Muenchen. Kuschelige 6qm in dieser Wohngemeinschaft",
			roomSize: 9,
			yearConstructed: 2010,
			title: "O2 micro compact home.",
			ageRange: {
				minAge: 0,
				maxAge: 100
			},
			moveInDate: null,
			furnished: true,
			numberOfRooms: 1,
			values: [],
			acceptedTerms: false,
		}, {
			tenants: ["tomwenzel@hotmail.de"],
			price: {
				amount: 400,
				currency: "EUR"
			},
			images: ["https://www.juergen-reichmann.de/images/pics/1313000/1313021.jpg"],
			location: {
				country: "Germany",
				city: "Munich",
				zipCode: "80805",
				address: "Grasmeierstraße 27"
			},
			description: "Wunderschoenes zweistoeckiges Haus in bester Lage in Muenchen. Kuschelige 6qm in dieser Wohngemeinschaft",
			roomSize: 9,
			yearConstructed: 2010,
			title: "O2 micro compact home.",
			ageRange: {
				minAge: 0,
				maxAge: 100
			},
			moveInDate: null,
			furnished: true,
			numberOfRooms: 1,
			values: [],
			acceptedTerms: false,
		}, {
			tenants: ["tomwenzel@hotmail.de"],
			price: {
				amount: 400,
				currency: "EUR"
			},
			images: ["https://www.juergen-reichmann.de/images/pics/1313000/1313021.jpg"],
			location: {
				country: "Germany",
				city: "Munich",
				zipCode: "80805",
				address: "Grasmeierstraße 27"
			},
			description: "Wunderschoenes zweistoeckiges Haus in bester Lage in Muenchen. Kuschelige 6qm in dieser Wohngemeinschaft",
			roomSize: 9,
			yearConstructed: 2010,
			title: "O2 micro compact home.",
			ageRange: {
				minAge: 0,
				maxAge: 100
			},
			moveInDate: null,
			furnished: true,
			numberOfRooms: 1,
			values: [],
			acceptedTerms: false,
		}, {
			tenants: ["tomwenzel@hotmail.de"],
			price: {
				amount: 400,
				currency: "EUR"
			},
			images: ["https://www.juergen-reichmann.de/images/pics/1313000/1313021.jpg"],
			location: {
				country: "Germany",
				city: "Munich",
				zipCode: "80805",
				address: "Grasmeierstraße 27"
			},
			description: "Wunderschoenes zweistoeckiges Haus in bester Lage in Muenchen. Kuschelige 6qm in dieser Wohngemeinschaft",
			roomSize: 9,
			yearConstructed: 2010,
			title: "O2 micro compact home.",
			ageRange: {
				minAge: 0,
				maxAge: 100
			},
			moveInDate: null,
			furnished: true,
			numberOfRooms: 1,
			values: [],
			acceptedTerms: false,
		}, {
			tenants: ["tomwenzel@hotmail.de"],
			price: {
				amount: 400,
				currency: "EUR"
			},
			images: ["https://www.juergen-reichmann.de/images/pics/1313000/1313021.jpg"],
			location: {
				country: "Germany",
				city: "Munich",
				zipCode: "80805",
				address: "Grasmeierstraße 27"
			},
			description: "Wunderschoenes zweistoeckiges Haus in bester Lage in Muenchen. Kuschelige 6qm in dieser Wohngemeinschaft",
			roomSize: 9,
			yearConstructed: 2010,
			title: "O2 micro compact home.",
			ageRange: {
				minAge: 0,
				maxAge: 100
			},
			moveInDate: null,
			furnished: true,
			numberOfRooms: 1,
			values: [],
			acceptedTerms: false,
		}, {
			tenants: ["tomwenzel@hotmail.de", 'werner.herzog@banane.com'],
			price: {
				amount: 900,
				currency: "EUR"
			},
			images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Studentenstadt.Freimann.-.HSH.JPG/1024px-Studentenstadt.Freimann.-.HSH.JPG"],
			location: {
				country: "Germany",
				city: "Munich",
				zipCode: "80805",
				address: "Wilhelm-Lust Str. 18"
			},
			description: "Beste Lage Englischer Garten! Guenstig! Jetzt zuschlagen!",
			roomSize: 10,
			yearConstructed: 1977,
			title: "Charmanter Plattenbau mit Dachterrasse",
			ageRange: {
				minAge: 0,
				maxAge: 100
			},
			moveInDate: null,
			furnished: true,
			numberOfRooms: 1,
			values: [],
			acceptedTerms: false,
		}, {
			tenants: ["tomwenzel@hotmail.de"],
			price: {
				amount: 780,
				currency: "EUR"
			},
			images: ["https://upload.wikimedia.org/wikipedia/commons/c/cb/Studentenstadt-Freimann-Oranges-Haus1.jpg"],
			location: {
				country: "Germany",
				city: "Munich",
				zipCode: "80805",
				address: "Christoph-Probst Str. 8"
			},
			description: "Wunderschoenes zimmer in bester Lage in Muenchen. Einzelduschen in AIDA Klo's. Gemeinschaftsraeume, Sauna, Dachterrasse etc.",
			roomSize: 9,
			yearConstructed: 1972,
			title: "Schoenes Zimmer in WG Platte",
			ageRange: {
				minAge: 0,
				maxAge: 100
			},
			moveInDate: null,
			furnished: true,
			numberOfRooms: 1,
			values: [],
			acceptedTerms: false,
		}
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
							key={listing.title}
							preventSwipe={["down"]}
							onSwipe={(dir: string) => swiped(dir, listing.description)}
							onCardLeftScreen={() => outOfFrame(listing.description)}
						>
							<div
								style={{ backgroundImage: `url(${listing.images[0]})` }}
								className={"card"}
							>
								<div className={'offer__description'}>
									<p id={'listing__title'}>{listing.title}</p>
									<div className={"details_text"}>{listing.description}</div>
								</div>
								<div className={'toplevel_info'}>
									<p id={'details_title'}>{listing.price.amount + " " + listing.price.currency}</p>
									<div className={"details_text"}>{listing.location.address + ", " + listing.location.zipCode + ", " + listing.location.city}</div>
								</div>
								<div className={'badges'}>
									<p id={'details_title'}>{"Roommates: " + listing.tenants.length}</p>
									<div className={"details_text"}>{"Room size : " + listing.roomSize}</div>
									<div className={"details_text"}>{"Year constructed: " + listing.yearConstructed}</div>
									<div className={"details_text"}>{"Furnished : " + listing.furnished}</div>
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
