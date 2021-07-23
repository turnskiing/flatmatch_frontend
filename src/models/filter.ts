import { currencies } from "../views/CreateOffering/OfferingInformation"

export interface IFilter {
	isShown: boolean,
	priceRange: {
		currency: string
		minPrice?: number
		maxPrice?: number
	}
	ageRange?: {
		minAge?: number
		maxAge?: number
	}
	location: {
		country: string
		city?: string
		zipCode?: string
		address?: string
		distance?: number
	}
	roomMatesNumber?: {
		minNumber?: number
		maxNumber?: number
	}
	furnished?: boolean
	minYearConstructed?: Date | null
}

export const defaultFilter: IFilter = {
	isShown: false,
	priceRange: {
		currency: currencies[1].value
	},
	location: {
		country: "DE",
		city: "",
		zipCode: "",
		address: ""
	},
	ageRange: {
		minAge: 17,
		maxAge: 80
	},
	roomMatesNumber: {
		minNumber: 1,
		maxNumber: 20
	},
	minYearConstructed: null
}