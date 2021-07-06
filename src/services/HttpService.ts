export default class HttpService {

	static async get(url: string, onSuccess: (data: any) => any, onError: (teststatus: any) => any) {
		const token = window.localStorage.jwtToken
		const header = new Headers()
		if (token) {
			header.append('Authorization', `Bearer "token": "${token}"`)
		}

		try {
			const resp = await fetch(url, {
				method: 'GET',
				headers: header
			})

			if (this.checkIfUnauthorized(resp)) {
				window.location.href = '/sign_in'
				return
			}

			const response = await resp.json()

			if (response.errors) {
				onError(response.errors)
			}
			else {
				if (response.hasOwnProperty('token')) {
					window.localStorage.jwtToken = response.token
				}
				onSuccess(response)
			}
		} catch (err) {
			onError(err.message)
		}
	}

	static async post(url: string, bodyData: any, onSuccess: (data: any) => any, onError: (teststatus: any) => any) {
		const token = window.localStorage.jwtToken
		const header = new Headers()
		if (token) {
			header.append('Authorization', `Bearer "token": "${token}"`)
		}
		header.append('Content-Type', 'application/json')

		try {
			const resp = await fetch(url, {
				method: 'POST',
				headers: header,
				body: JSON.stringify(bodyData)
			})

			if (this.checkIfUnauthorized(resp)) {
				window.location.href = '/sign_in'
				return
			}

			const response = await resp.json()

			if (response.errors) {
				onError(response.errors)
			}
			else {
				if (response.hasOwnProperty('token')) {
					window.localStorage.jwtToken = response.token
				}
				onSuccess(response)
			}
		} catch (err) {
			onError(err.message)
		}
	}

	static async put(url: string, bodyData: any, onSuccess: (data: any) => any, onError: (teststatus: any) => any) {
		const token = window.localStorage.jwtToken
		const header = new Headers()
		if (token) {
			header.append('Authorization', `Bearer "token": "${token}"`)
		}
		header.append('Content-Type', 'application/json')

		try {
			const resp = await fetch(url, {
				method: 'PUT',
				headers: header,
				body: JSON.stringify(bodyData)
			})

			if (this.checkIfUnauthorized(resp)) {
				window.location.href = '/sign_in'
				return
			}

			const response = await resp.json()

			if (response.errors) {
				onError(response.errors)
			}
			else {
				if (response.hasOwnProperty('token')) {
					window.localStorage.jwtToken = response.token
				}
				onSuccess(response)
			}
		} catch (err) {
			onError(err.message)
		}
	}

	static async remove(url: string, onSuccess: (data: any) => any, onError: (teststatus: any) => any) {
		const token = window.localStorage.jwtToken
		const header = new Headers()
		if (token) {
			header.append("Authorization", `JWT ${token}`)
		}

		try {
			const resp = await fetch(url, {
				method: "DELETE",
				headers: header,
			})

			if (this.checkIfUnauthorized(resp)) {
				window.location.href = '/sign_in'
				return
			}

			const response = await resp.json()

			if (response.errors) {
				onError(response.errors)
			}
			else {
				if (response.hasOwnProperty('token')) {
					window.localStorage.jwtToken = response.token
				}
				onSuccess(response)
			}
		} catch (err) {
			onError(err.message)
		}
	}

	static checkIfUnauthorized(res: any) {
		if (res.status === 401) {
			return true
		}
		return false
	}

}