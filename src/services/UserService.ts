import { IUser, UserType } from "../models/user"
import HttpService from "./HttpService"

export default class UserService {
	static baseURL() {
		return "http://localhost:8080/api/auth"
	}

	static signUp(user: IUser) {
		// TODO: change hardcoded values (image)
		return new Promise((resolve, reject) => {
			HttpService.post(
				`${UserService.baseURL()}/signup`,
				{
					email: user.email,
					password: user.password,
					first_name: user.first_name,
					last_name: user.last_name,
					gender: user.gender,
					image: ["575d0c22964ddb3b6ba41bed"],
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

	static async updateUser(user: IUser): Promise<IReceivedUser> {
		// TODO: change hardcoded values (image)
		return new Promise((resolve, reject) => {
			HttpService.put(
				`${UserService.baseURL()}/user`,
				{
					first_name: user.first_name,
					last_name: user.last_name,
					gender: user.gender,
					image: ["575d0c22964ddb3b6ba41bed"],
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

	static logout() {
		window.location.href = "/sign_in"
		window.localStorage.removeItem("jwtToken")
	}

	static getCurrentUser() {
		const token = window.localStorage.jwtToken
		if (!token) return {}

		const base64Url = token.split(".")[1]
		const base64 = base64Url.replace("-", "+").replace("_", "/")
		return {
			id: JSON.parse(window.atob(base64)).id,
			username: JSON.parse(window.atob(base64)).username,
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
	images: string[]
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
}
