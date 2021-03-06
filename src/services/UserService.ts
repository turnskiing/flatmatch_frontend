import { Http } from "@material-ui/icons"
import { IUser, UserType } from "../models/user"
import { parseJwt } from "../shared/parseJwt"
import HttpService from "./HttpService"

export default class UserService {
	static baseURL() {
		return "http://localhost:8080/api/auth"
	}

	static signUp(user: IUser) {
		return new Promise((resolve, reject) => {
			HttpService.post(
				`${UserService.baseURL()}/signup`,
				{
					email: user.email,
					password: user.password,
					first_name: user.first_name,
					last_name: user.last_name,
					gender: user.gender,
					bio: user.bio,
					date_of_birth: user.date_of_birth,
					occupation: user.occupation,
					place_of_residency: {
						country: user.place_of_residency.country,
						city: user.place_of_residency.city,
						zipCode: user.place_of_residency.zipCode,
						address: user.place_of_residency.address,
					},
					interests: user.interests,
					smoker: user.smoker,
					declined_offers: [],
					accepted_offers: [],
					userType: {
						discriminatorKey: UserType[user.type !== null ? user.type : 0],
					},
				},
				(data: any) => {
					resolve(data)
				},
				(textStatus: any) => {
					reject(textStatus)
				}
			)
		})
	}

	static async signIn(email: string, password: string) {
		return new Promise((resolve, reject) => {
			HttpService.post(
				`${UserService.baseURL()}/signin`,
				{
					email,
					password,
				},
				(data) => {
					resolve(data)
				},
				(textStatus) => {
					reject(textStatus)
				}
			)
		})
	}

	static async getUserInfo(): Promise<IReceivedUser> {
		return new Promise((resolve, reject) => {
			HttpService.get(
				`${UserService.baseURL()}/user`,
				(data) => {
					resolve(data)
				},
				(textStatus) => {
					reject(textStatus)
				}
			)
		})
	}

	static async getUserInfoById(userId: string): Promise<IReceivedUser> {
		return new Promise((resolve, reject) => {
			HttpService.get(
				`${UserService.baseURL()}/user/${userId}`,
				(data) => {
					resolve(data)
				},
				(textStatus) => {
					reject(textStatus)
				}
			)
		})
	}

	static async getUserByEmail(email: string): Promise<IReceivedUser> {
		return new Promise((resolve, reject) => {
			HttpService.get(
				`${UserService.baseURL()}/${email}`,
				(data) => {
					resolve(data)
				},
				(textStatus) => {
					reject(textStatus)
				}
			)
		})
	}

	static async isEmailAvailable(email: string): Promise<any> {
		return new Promise((resolve, reject) => {
			HttpService.get(
				`${UserService.baseURL()}/email/${email}`,
				(data) => {
					resolve(data)
				},
				(textStatus) => {
					reject(textStatus)
				}
			)
		})
	}

	static async updateUser(user: IUser): Promise<IReceivedUser> {
		return new Promise((resolve, reject) => {
			HttpService.put(
				`${UserService.baseURL()}/user`,
				{
					first_name: user.first_name,
					last_name: user.last_name,
					gender: user.gender,
					bio: user.bio,
					date_of_birth: user.date_of_birth,
					occupation: user.occupation,
					place_of_residency: {
						country: user.place_of_residency.country,
						city: user.place_of_residency.city,
						zipCode: user.place_of_residency.zipCode,
						address: user.place_of_residency.address,
					},
					interests: user.interests,
					smoker: user.smoker
				},
				(data: any) => {
					resolve(data)
				},
				(textStatus: any) => {
					reject(textStatus)
				}
			)
		})
	}

	static async deleteUser(): Promise<any> {
		return new Promise((resolve, reject) => {
			HttpService.remove(
				`${UserService.baseURL()}/user`,
				(data: any) => {
					resolve(data)
				},
				(textStatus: any) => {
					reject(textStatus)
				}
			)
		})
	}

	static logout() {
		window.location.href = "/sign_in"
		window.localStorage.removeItem("jwtToken")
	}

	static getCurrentUser() {
		const token = window.localStorage.jwtToken
		if (!token) return {}
		const tokenPayload = parseJwt(token)

		return {
			_id: tokenPayload._id,
			first_name: tokenPayload.first_name,
			last_name: tokenPayload.last_name
		}
	}

	static isAuthenticated() {
		return !!window.localStorage.jwtToken
	}
}

export interface IReceivedUser {
	email: string
	first_name: string
	last_name: string
	gender: string
	bio: string
	date_of_birth: Date
	occupation: string
	place_of_residency: {
		country: string;
		city: string;
		zipCode: string;
		address: string;
	}
	interests: string[]
	acceptedTerms: boolean
	smoker: boolean
	userType: string
	declined_ofers: string[]
	accepted_offers: string[]
	_id?: string
}
