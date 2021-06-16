import { Breadcrumbs, Link, Typography } from "@material-ui/core";

export function CreateProfileBreadCrumb() {
  return (
    <Breadcrumbs maxItems={1} aria-label="breadcrumb">
      <Link color="inherit" href="/home">
        Home
      </Link>
      <Typography color="textPrimary">CreateProfile</Typography>
    </Breadcrumbs>
  );
}

export function FindOfferingBreadCrumb() {
  return (
    <Breadcrumbs maxItems={1} aria-label="breadcrumb">
      <Link color="inherit" href="/home">
        Home
      </Link>
      <Typography color="textPrimary">FindOffering</Typography>
    </Breadcrumbs>
  );
}
