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
