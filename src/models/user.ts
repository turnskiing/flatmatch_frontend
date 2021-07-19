import { ImageListType } from "react-images-uploading"

export interface IUser {
	email: string
	password: any
	first_name: string
	last_name: string
	gender: string | null
	images: ImageListType
	bio: string
	date_of_birth: Date | null
	occupation: string
	place_of_residency: {
		country: string
		city: string
		zipCode: string
		address: string
	},
	interests: string[]
	acceptedTerms: boolean
	smoker: boolean
	type: UserType | null
}

export const defaultUser: IUser = {
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

export enum UserType {
	Applicant,
	Tenant
}
