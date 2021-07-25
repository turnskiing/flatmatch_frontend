import { ImageListType } from "react-images-uploading"

export interface IHousingOffer {
	tenant: string
	flatmates: string[]
	price: {
		amount: number | null
		currency: string
	}
	images: ImageListType
	location: {
		country: string
		city: string
		zipCode: string
		address: string | null
		latitude: number | null
		longitude: number | null
		distance: number | null
	}
	description: string
	roomSize: number | null
	yearConstructed: Date | null
	title: string
	ageRange: {
		minAge: number | null
		maxAge: number | null
	}
	moveInDate: Date | null
	furnished: boolean
	numberOfRooms: number | null
	values: string[]
	acceptedTerms: boolean | undefined
	_id: string
	smoking: boolean | null
}

export const defaultOffer: IHousingOffer = {
	_id: "",
	tenant: "",
	flatmates: [],
	price: {
		amount: null,
		currency: "EUR"
	},
	images: [],
	location: {
		country: "",
		city: "",
		zipCode: "",
		address: null,
		latitude: null,
		longitude: null,
		distance: null
	},
	description: "",
	roomSize: null,
	yearConstructed: null,
	title: "",
	ageRange: {
		minAge: 17,
		maxAge: 80
	},
	moveInDate: null,
	furnished: false,
	numberOfRooms: null,
	values: [],
	acceptedTerms: false,
	smoking: false
}

export const defaultOffers: IHousingOffer[] = [defaultOffer]