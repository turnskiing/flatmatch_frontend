import React, { createContext, useState } from "react"
import Router from "./Router"
import { defaultUser, IUser } from "./models/user"
import { defaultOffer, defaultOffers, IHousingOffer } from "./models/housingOffer"
import { defaultFilter, IFilter } from "./models/filter"


interface IContextProps {
	user: IUser
	setUser: React.Dispatch<React.SetStateAction<IUser>>
}

interface IOfferContextProps {
	offer: IHousingOffer
	setOffer: React.Dispatch<React.SetStateAction<IHousingOffer>>
}

interface IOffersContextProps {
	offers: IHousingOffer[]
	setOffers: React.Dispatch<React.SetStateAction<IHousingOffer[]>>
}


interface IFilterContextProps {
	filter: IFilter
	setFilter: React.Dispatch<React.SetStateAction<IFilter>>
}

export const FilterContext = createContext({} as IFilterContextProps)

export const OfferContext = createContext({} as IOfferContextProps)
export const OffersContext = createContext({} as IOffersContextProps)

export const UserContext = createContext({} as IContextProps)


function App() {
	const [user, setUser] = useState(defaultUser)
	const [offer, setOffer] = useState(defaultOffer)
	const [offers, setOffers] = useState(defaultOffers)
	const [filter, setFilter] = useState(defaultFilter)

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<OfferContext.Provider value={{ offer, setOffer }}>
				<OffersContext.Provider value={{ offers, setOffers }}>
					<FilterContext.Provider value={{ filter, setFilter }}>
						<Router />
					</FilterContext.Provider>
				</OffersContext.Provider>
			</OfferContext.Provider>
		</UserContext.Provider>
	)
}

export default App
