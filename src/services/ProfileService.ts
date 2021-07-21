import HttpService from "./HttpService"


export default class ProfileService {
	static baseURL() {
		return "http://localhost:8080/api/files"
	}

	static async getProfilePicturesMetaData(): Promise<[IReceivedImageMetaData]> {
		return new Promise((resolve, reject) => {
			HttpService.get(
				`${ProfileService.baseURL()}/getProfilePictureMetaData`,
				(data: any) => {
					resolve(data)
				},
				(textStatus: any) => {
					reject(textStatus)
				}
			)
		})
	}

	static async getProfilePicture(fileName: string): Promise<IReceivedImage> {
		return new Promise((resolve, reject) => {
			HttpService.get(
				`${ProfileService.baseURL()}/getProfilePicture/${fileName}`,
				(data: any) => {
					resolve(data)
				},
				(textStatus: any) => {
					reject(textStatus)
				}
			)
		})
	}

	static async uploadProfilePicture(file: any): Promise<any> {
		return new Promise((resolve, reject) => {
			HttpService.postFile(
				`${ProfileService.baseURL()}/uploadProfilePicture`,
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

	static async deleteProfilePicture(fileName: string): Promise<any> {
		return new Promise((resolve, reject) => {
			HttpService.remove(
				`${ProfileService.baseURL()}/deleteProfilePicture/${fileName}`,
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