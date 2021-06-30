import { BrowserRouter, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'

import SignInView from './views/SignIn/SignInView'
import FindOfferingView from './views/FindOffering/FindOfferingView'
import CreateProfileView from './views/CreateProfile/CreateProfileView'
import UserService from './services/UserService'
import HomeScreenView from './views/HomeScreen/HomeScreen'

export enum AuthRoutes {
	findRoom = '/home/find_room',
	createOffering = '/home/create_offering',
	home = '/home',
	findApplicant = '/home/create_offering',
	messages = "/home/messages",
	profile = '/home/profile',
	filter = '/home/find_room/filter'
}

export enum NonAuthRoutes {
	default = '/',
	signIn = '/sign_in',
	createProfile = '/home/create_profile'
}

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={NonAuthRoutes.default} component={SignInView} />
				<Route path={NonAuthRoutes.signIn} component={SignInView} />
				<AuthRoute exact path={AuthRoutes.home} Component={HomeScreenView} />
				<AuthRoute path={AuthRoutes.findRoom} Component={FindOfferingView} />
				<Route path={NonAuthRoutes.createProfile} component={CreateProfileView} />
				{/* Not Found */}
				<Route component={() => <Redirect to={NonAuthRoutes.default} />} />
			</Switch>
		</BrowserRouter>
	)
}

interface Props {
	Component: React.FC<RouteComponentProps>
	path: string
	exact?: boolean
}

const AuthRoute = ({ Component, path, exact = false }: Props): JSX.Element => {
	const isAuthed = UserService.isAuthenticated()
	const message = 'Please log in to view this page'
	return (
		<Route
			exact={exact}
			path={path}
			render={(props: RouteComponentProps) =>
				isAuthed ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: NonAuthRoutes.signIn,
							state: {
								message,
								requestedPath: path
							}
						}}
					/>
				)
			}
		/>
	)
}

export default Router