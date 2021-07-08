import React, {FC, ReactElement, useState} from "react"
import "./TinderCards.css"
import TinderCard from "react-tinder-card"
import DetailPage from "./DetailPage"
import {render} from "react-dom"

interface Props {
    title?: string
}

const TinderCards: FC<Props> = ({title}): ReactElement => {
    const [listings, setPeople] = useState([
        {
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
                                style={{backgroundImage: `url(${listing.images[0]})`}}
                                className={"card"}
                            >
                                <div className={'offer__description'}>
                                    <p id={'listing__title'}>{listing.title}</p>
                                    {listing.description}
                                </div>
                                <div className={'toplevel_info'}>
                                    <p id={'details_title'}>{listing.price.amount + " " + listing.price.currency}</p>
                                    {listing.location.address + ", " + listing.location.zipCode + ", " + listing.location.city}
                                </div>
                                <div className={'badges'}>
                                    <p id={'details_title'}>{"Roommates: " + listing.tenants.length}</p>
                                    <div>{"Room size : " + listing.roomSize}</div>
                                    <div>{"Year constructed: " + listing.yearConstructed}</div>
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
