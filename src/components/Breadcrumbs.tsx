import { Breadcrumbs, Link, Typography } from "@material-ui/core"

export function CreateProfileBreadCrumb() {
	return (
		<Breadcrumbs maxItems={2} aria-label="breadcrumb">
			<Typography color="textPrimary">CreateProfile</Typography>
		</Breadcrumbs>
	)
}

export function FindOfferingBreadCrumb() {
	return (
		<Breadcrumbs maxItems={2} aria-label="breadcrumb">
			<Link color="inherit" href="/home">
				Home
			</Link>
			<Typography color="textPrimary">FindOffering</Typography>
		</Breadcrumbs>
	)
}

export function FindRoommateBreadCrumb() {
	return (
		<Breadcrumbs maxItems={2} aria-label="breadcrumb">
			<Link color="inherit" href="/home">
				Home
			</Link>
			<Typography color="textPrimary">FindRoommate</Typography>
		</Breadcrumbs>
	)
}

export function HomeBreadCrumb() {
	return (
		<Breadcrumbs maxItems={1} aria-label="breadcrumb">
			<Typography color="textPrimary">Home</Typography>
		</Breadcrumbs>
	)
}

export function ShowProfileBreadCrumb() {
	return (
		<Breadcrumbs maxItems={2} aria-label="breadcrumb">
			<Link color="inherit" href="/home">
				Home
			</Link>
			<Typography color="textPrimary">ViewProfile</Typography>
		</Breadcrumbs>
	)
}

export function CreateOfferingBreadCrumb() {
	return (
		<Breadcrumbs maxItems={1} aria-label="breadcrumb">
			<Link color="inherit" href="/home">
				Home
			</Link>
			<Typography color="textPrimary">CreateOffering</Typography>
		</Breadcrumbs>
	)
}

export function ShowOfferingBreadCrumb() {
	return (
		<Breadcrumbs maxItems={1} aria-label="breadcrumb">
			<Link color="inherit" href="/home">
				Home
			</Link>
			<Typography color="textPrimary">ViewOffers</Typography>
		</Breadcrumbs>
	)
}
