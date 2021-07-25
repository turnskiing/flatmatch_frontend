import HttpService from "./HttpService"


export default class MatchService {
	static baseURL() {
		return "http://localhost:8080/api/match"
	}

    static async getMatchOfApplicant(): Promise<IReceivedMatch> {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${MatchService.baseURL()}/applicant`,
                (data) => {
                    resolve(data)
                },
                (textStatus) => {
                    reject(textStatus)
                }
            )
        })
    }

    static async getMatchOfTenant(): Promise<IReceivedMatch> {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${MatchService.baseURL()}/tenant`,
                (data) => {
                    resolve(data)
                },
                (textStatus) => {
                    reject(textStatus)
                }
            )
        })
    }

    static async createMatch(match: IReceivedMatch): Promise<IReceivedMatch> {
		return new Promise((resolve, reject) => {
			HttpService.post(
				`${MatchService.baseURL()}`,
				{
					applicant: match.applicant,
	                tenant: match.tenant,
                    offer: match.offer
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

export interface IReceivedMatch {
	applicant: string
	tenant: string
    offer: string
}