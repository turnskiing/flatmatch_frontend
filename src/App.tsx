import React, { useState, createContext } from "react"
import Router from "./Router"
import { IUser } from "./models/user"
import { IHousingOffer } from "./models/housingOffer"

const defaultUser: IUser = {
	email: "",
	password: "",
	first_name: "",
	last_name: "",
	gender: null,
	images: [],
	bio: "",
	date_of_birth: null,
	occupation: "",
	place_of_residency: {
		country: "",
		city: "",
		zipCode: "",
		address: "",
	},
	interests: [],
	acceptedTerms: false,
	smoker: false,
	type: null
}

interface IContextProps {
	user: IUser
	setUser: React.Dispatch<React.SetStateAction<IUser>>
}

const defaultOffer: IHousingOffer = {
	tenants: [],
	price: {
		amount: null,
		currency: "EUR"
	} ,
	images: [],
	location: {
		country: "",
		city: "",
		zipCode: "",
		address: ""
	},
	description: "",
	roomSize: null,
	yearConstructed: null,
	title: "",
	ageRange: {
		minAge: 0,
		maxAge: 100
	},
	moveInDate: null,
	furnished: false,
	numberOfRooms: null,
	values: [],
	acceptedTerms: false,
}

interface IOfferContextProps {
	offer: IHousingOffer
	setOffer: React.Dispatch<React.SetStateAction<IHousingOffer>>
}

export const OfferContext = createContext({} as IOfferContextProps)

export const UserContext = createContext({} as IContextProps)

function App() {
	const [user, setUser] = useState(defaultUser)
	const [offer, setOffer] = useState(defaultOffer)
	return (
		<UserContext.Provider value={{ user, setUser }}>
		<OfferContext.Provider value = {{ offer, setOffer}}>
			<Router />
		</OfferContext.Provider>
		</UserContext.Provider>
)
}

export default App
