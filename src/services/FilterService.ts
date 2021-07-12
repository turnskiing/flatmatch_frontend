import { IFilter } from "../models/filter"
import { IUser, UserType } from "../models/user"
import HttpService from "./HttpService"

export default class FilterService {
	static baseURL() {
		return "http://localhost:8080/api/filter"
	}

	static createFilter(filter: IFilter) {
		return new Promise((resolve, reject) => {
			HttpService.post(
				`${FilterService.baseURL()}`,
				{
                    priceRange: filter.priceRange,
                    ageRange: filter.ageRange,
                    location: filter.location,
                    roomMatesNumber: filter.roomMatesNumber,
                    furnished: filter.furnished,
                    minYearConstructed: filter.minYearConstructed
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

	static async getFilter(): Promise<IRecievedFilter> {
		return new Promise((resolve, reject) => {
			HttpService.get(
				`${FilterService.baseURL()}`,
				(data) => {
					resolve(data)
				},
				(textStatus) => {
					reject(textStatus)
				}
			)
		})
	}

	static async updateFilter(filter: IFilter): Promise<IRecievedFilter> {
		return new Promise((resolve, reject) => {
			HttpService.put(
				`${FilterService.baseURL()}`,
				{
                    priceRange: filter.priceRange,
                    ageRange: filter.ageRange,
                    location: filter.location,
                    roomMatesNumber: filter.roomMatesNumber,
                    furnished: filter.furnished,
                    minYearConstructed: filter.minYearConstructed
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
}

export interface IRecievedFilter {
	applicant: string
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
	roomMatesNumber?: number
	furnished?: boolean
	minYearConstructed?: Date
}
