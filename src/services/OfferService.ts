import { IHousingOffer } from '../models/housingOffer'
import HttpService from './HttpService'
import UserService from "./UserService"

export default class OfferService {

	static baseURL() { return 'http://localhost:8080/api/offers' }

	static createOffer(offer: IHousingOffer) {
		// TODO: change hardcoded values (image)
		return new Promise((resolve, reject) => {
			HttpService.post(`${OfferService.baseURL()}/`, {
				tenant: UserService.getCurrentUser()._id,  // input as userId from Token
				flatmates: offer.flatmates,  // user input email addresses -> needs to be transformed to ids in the backend
				price: {
					currency: offer.price.currency,
					amount: offer.price.amount
				},
				images: ["575d0c22964ddb3b6ba41bed"],
				location: {
					country: offer.location.country,
					city: offer.location.city,
					zipCode: offer.location.zipCode,
					address: offer.location.address
				},
				description: offer.description,
				roomSize: offer.roomSize,
				yearConstructed: offer.yearConstructed,
				title: offer.title,
				ageRange: {
					minAge: offer.ageRange.minAge,
					maxAge: offer.ageRange.maxAge
				},
				moveInDate: offer.moveInDate,
				furnished: offer.furnished,
				numberOfRooms: offer.numberOfRooms,
				values: offer.values,
				smoking: offer.smoking
			}, (data: any) => {
				resolve(data)
			}, (textStatus: any) => {
				reject(textStatus)
			})
		})
	}

	static async getOffer(offerId: string) {
		return new Promise((resolve, reject) => {
			HttpService.get(`${OfferService.baseURL()}/${offerId}`,
				(data) => {
					if (data !== undefined || Object.keys(data).length !== 0) {
						resolve(data)
					} else {
						reject("Error while retrieving offer")
					}
				},
				(textStatus) => {
					reject(textStatus)
				})
		})
	}

	static async getOffers(userId: string) {
		return new Promise((resolve, reject) => {
			HttpService.get(`${OfferService.baseURL()}/getOffers/id?${userId}`,
				(data) => {
					if (data !== undefined || Object.keys(data).length !== 0) {
						resolve(data)
					} else {
						reject("Error while retrieving offers")
					}
				},
				(textStatus) => {
					reject(textStatus)
				})
		})
	}

	// TODO: change hardcoded values (image)
	static async updateOffer(id: string, offer: IHousingOffer): Promise<IReceivedHousingOffer> {
		return new Promise((resolve, reject) => {
			HttpService.put(`${OfferService.baseURL()}/${id}`,
				{
					tenant: offer.tenant,
					flatmates: offer.flatmates,
					price: {
						currency: offer.price.currency,
						amount: offer.price.amount
					},
					images: ["575d0c22964ddb3b6ba41bed"],
					location: {
						country: offer.location.country,
						city: offer.location.city,
						zipCode: offer.location.zipCode,
						address: offer.location.address
					},
					description: offer.description,
					roomSize: offer.roomSize,
					yearConstructed: offer.yearConstructed,
					title: offer.title,
					ageRange: {
						minAge: offer.ageRange.minAge,
						maxAge: offer.ageRange.maxAge
					},
					moveInDate: offer.moveInDate,
					furnished: offer.furnished,
					numberOfRooms: offer.numberOfRooms,
					values: offer.values,
					smoking: offer.smoking
				},
				(data) => {
					resolve(data)
				}, (textStatus) => {
					reject(textStatus)
				})
		})
	}

	static removeOffer(id: string) {
		return new Promise((resolve, reject) => {
			HttpService.remove(
				`${OfferService.baseURL()}/${id}`,
				(data) => {
					if (data.message !== undefined) {
						resolve(data.message)
					} else {
						reject("Error while deleting HousingOffer")
					}
				},
				(textStatus) => {
					reject(textStatus)
				}
			)
		})
	}


	static isAuthenticated() {
		return !!window.localStorage.jwtToken
	}
}

export interface IReceivedHousingOffer {
	tenant: string
	flatmates: [string]
	price: {
		currency: string
		amount: number
	}
	images: [string]
	location: {
		country: string
		city: string
		zipCode: string
		address: string
	}
	description: string
	roomSize: number
	yearConstructed?: Date
	title: string
	ageRange: {
		minAge: number
		maxAge: number
	}
	moveInDate: number
	furnished: boolean
	numberOfRooms: number
	values: [string]
}