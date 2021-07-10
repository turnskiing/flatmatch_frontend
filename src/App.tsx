import React, { useState, createContext } from "react"
import Router from "./Router"
import { defaultUser, IUser } from "./models/user"
import { defaultOffer, IHousingOffer } from "./models/housingOffer"
import { defaultFilter, IFilter } from "./models/filter"


interface IContextProps {
	user: IUser
	setUser: React.Dispatch<React.SetStateAction<IUser>>
}

interface IOfferContextProps {
	offer: IHousingOffer
	setOffer: React.Dispatch<React.SetStateAction<IHousingOffer>>
}

interface IFilterContextProps {
	filter: IFilter
	setFilter: React.Dispatch<React.SetStateAction<IFilter>>
}

export const FilterContext = createContext({} as IFilterContextProps)

export const OfferContext = createContext({} as IOfferContextProps)

export const UserContext = createContext({} as IContextProps)

function App() {
	const [user, setUser] = useState(defaultUser)
	const [offer, setOffer] = useState(defaultOffer)
	const [filter, setFilter] = useState(defaultFilter)

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<OfferContext.Provider value={{ offer, setOffer }}>
				<FilterContext.Provider value={{ filter, setFilter }}>
					<Router />
				</FilterContext.Provider>
			</OfferContext.Provider>
		</UserContext.Provider>
	)
}

export default App
