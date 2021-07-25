import { IHousingOffer } from '../models/housingOffer'
import HttpService from './HttpService'
import UserService from "./UserService"


export default class OfferService {

	static baseURL() {
		return 'http://localhost:8080/api/offers'
	}

	static createOffer(offer: IHousingOffer) {
		return new Promise<IReceivedHousingOffer>((resolve, reject) => {
			HttpService.post(`${OfferService.baseURL()}/`, {
				tenant: UserService.getCurrentUser()._id,  // input as userId from Token
				flatmates: offer.flatmates,  // user input email addresses -> needs to be transformed to ids in the backend
				price: {
					currency: offer.price.currency,
					amount: offer.price.amount
				},
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
		return new Promise<IReceivedHousingOffer>((resolve, reject) => {
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

	static async getFilteredOffers(): Promise<IReceivedHousingOffer[]> {
		return new Promise((resolve, reject) => {
			HttpService.get(`${OfferService.baseURL()}/getFilteredOffers/`,
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

	static async getOffers(userId: string): Promise<IReceivedHousingOffer[]> {
		return new Promise<IReceivedHousingOffer[]>((resolve, reject) => {
			HttpService.get(`${OfferService.baseURL()}/getOffers/${userId}`,
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

	static async updateOffer(offer: IHousingOffer): Promise<IReceivedHousingOffer> {
		return new Promise((resolve, reject) => {
			HttpService.put(`${OfferService.baseURL()}/${offer._id}`,
				{
					tenant: offer.tenant,
					flatmates: offer.flatmates,
					price: {
						currency: offer.price.currency,
						amount: offer.price.amount
					},
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

	static async getOfferPicturesMetaData(id: string): Promise<[IReceivedImageMetaData]> {
		return new Promise<[IReceivedImageMetaData]>((resolve, reject) => {
			HttpService.get(
				// Input offer id to return offer pictures meta data
				`${OfferService.baseURL()}/getOfferPicturesMetaData/${id}`,
				(data: any) => {
					resolve(data)
				},
				(textStatus: any) => {
					reject(textStatus)
				}
			)
		})
	}

	static async getOfferPicture(fileName: string): Promise<IReceivedImage> {
		return new Promise((resolve, reject) => {
			HttpService.get(
				`${OfferService.baseURL()}/getOfferPicture/${fileName}`,
				(data: any) => {
					resolve(data)
				},
				(textStatus: any) => {
					reject(textStatus)
				}
			)
		})
	}

	static async uploadOfferPicture(file: any, id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			HttpService.postFile(
				`${OfferService.baseURL()}/uploadOfferPicture/${id}`,
				file,
				(data: any) => {
					resolve(data)
				},
				(textStatus: any) => {
					reject(textStatus)
				}
			)
		})
	}

	static async deleteOfferPicture(fileName: string): Promise<any> {
		return new Promise((resolve, reject) => {
			HttpService.remove(
				`${OfferService.baseURL()}/deleteOfferPicture/${fileName}`,
				(data: any) => {
					resolve(data)
				},
				(textStatus: any) => {
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
	distanceToFilterLocation: number | null
	id: string
	tenant: string
	flatmates: [string]
	price: {
		currency: string
		amount: number
	}
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
	roomSize: number
	yearConstructed: Date
	title: string
	ageRange: {
		minAge: number
		maxAge: number
	}
	moveInDate: Date
	furnished: boolean
	numberOfRooms: number
	values: [string] | []
	smoking: boolean
	_id: string
}


export interface IReceivedImageMetaData {
	fileName: string
	uploadData: Date
	_id: string
}

export interface IReceivedImage {
	success: boolean
	file: string
	mime: string
}