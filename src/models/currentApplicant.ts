export interface ICurrentApplicant {
	isShown: boolean,
	email: string
}

export const defaultCurrentApplicant: ICurrentApplicant = {
	isShown: false,
	email: ""
}