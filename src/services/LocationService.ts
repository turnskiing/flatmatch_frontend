import HttpService from "./HttpService"

export default class LocationService {

	static async getCurrentLocationFromCoordinates(latitude: number, longitude: number): Promise<ILocation> {
		return new Promise((resolve, reject) => {
			HttpService.getNoAuth(
				`http://api.positionstack.com/v1/reverse?access_key=f5d1f0164715adf90867d700bc6c8555&query=${latitude},${longitude}&limit=1`,
				(data) => {
					resolve(data)
				},
				(textStatus) => {
					reject(textStatus)
				}
			)
		})
	}
}

export interface ILocation {
	data?: [{
		latitude?: number,
		longitude?: number,
		label?: string,
		name?: string,
		type?: string,
		distance?: number,
		number?: string,
		street?: string,
		locality?: string,
		postal_code?: string,
		confidence?: number,
		region?: string,
		region_code?: string,
		administrative_area?: string,
		neighbourhood?: string,
		country?: string,
		country_code?: string,
		map_url?: string,
	}]
}