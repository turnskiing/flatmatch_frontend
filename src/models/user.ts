export interface IUser {
	email: string
	password: any
	full_name: string
	gender: string | null
	images: never[]
	bio: string
	date_of_birth: Date | null
	occupation: string
	place_of_residency: string
	interests: [string]
	smoker: boolean
}