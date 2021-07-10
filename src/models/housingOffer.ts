export interface IHousingOffer {
	tenants: string[]
	price: {
		amount: number | null
		currency: string
	}
	images: never[]
	location: {
		country: string
		city: string
		zipCode: string
		address: string
	}
	description: string
	roomSize: number | null
	yearConstructed: number | null
	title: string
	ageRange: {
		minAge: number | null
		maxAge: number | null
	}
	moveInDate: Date | null
	furnished: boolean
	numberOfRooms: number | null
	values: string[]
	acceptedTerms: boolean
}

export const defaultOffer: IHousingOffer = {
	tenants: [],
	price: {
		amount: null,
		currency: "EUR"
	},
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
