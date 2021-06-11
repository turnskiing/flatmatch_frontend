import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import SignInView from './views/SignInView'
import FindOfferingView from './views/FindOffering/FindOfferingView'

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact={true} path="/" component={SignInView} />
				<Route path="/sign_in" component={SignInView} />
				<Route path="/home/find_room" component={FindOfferingView} />
				{/* Not Found */}
				<Route component={() => <Redirect to="/" />} />
			</Switch>
		</BrowserRouter>
	)
}

export default Router