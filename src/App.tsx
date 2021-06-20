import React, { useState, createContext } from "react"
import Router from "./Router"
import { IUser } from "./models/user"

const defaultUser: IUser = {
	email: "",
	password: "",
	full_name: "",
	gender: null,
	images: [],
	bio: "",
	date_of_birth: null,
	occupation: "",
	place_of_residency: "",
	interests: [],
	acceptedTerms: false,
	smoker: false,
	type: null
}

interface IContextProps {
	user: IUser
	setUser: React.Dispatch<React.SetStateAction<IUser>>
}


export const UserContext = createContext({} as IContextProps)

function App() {
	const [user, setUser] = useState(defaultUser)
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Router />
		</UserContext.Provider>
	)
}

export default App
