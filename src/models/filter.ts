import { currencies } from "../views/CreateOffering/OfferingInformation"

export interface IFilter {
	isShown: boolean,
	priceRange?: {
		currency: string
		minPrice?: number
		maxPrice?: number
	}
	ageRange?: {
		minAge?: number
		maxAge?: number
	}
	location?: {
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
		country: "DE"
	},
	ageRange: {
		minAge: 0,
		maxAge: 100
	},
	roomMatesNumber: {
		minNumber: 0,
		maxNumber: 20
	},
	minYearConstructed: null
}