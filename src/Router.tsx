import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import SignInView from './views/SignIn/SignInView'
import FindOfferingView from './views/FindOffering/FindOfferingView'
import CreateProfileView from './views/CreateProfile/CreateProfileView'
import HomeScreenView from './views/HomeScreen/HomeScreen'

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact={true} path="/" component={SignInView} />
				<Route path="/sign_in" component={SignInView} />
				<Route exact={true} path="/home" component={HomeScreenView} />
				<Route path="/home/find_room" component={FindOfferingView} />
				<Route path="/home/create_profile" component={CreateProfileView} />
				{/* Not Found */}
				<Route component={() => <Redirect to="/" />} />
			</Switch>
		</BrowserRouter>
	)
}

export default Router