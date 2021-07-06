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

