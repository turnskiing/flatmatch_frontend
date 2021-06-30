export interface IUser {
	email: string
	password: any
	first_name: string
	last_name: string
	gender: string | null
	images: never[]
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

export enum UserType {
	Applicant,
	Tennant
}