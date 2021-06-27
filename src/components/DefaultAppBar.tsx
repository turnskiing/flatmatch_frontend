import AppBar from "@material-ui/core/AppBar"
import { makeStyles } from "@material-ui/core/styles"
import Link from "@material-ui/core/Link"
import Toolbar from "@material-ui/core/Toolbar"
import Avatar from "@material-ui/core/Avatar"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import { Grid, IconButton } from "@material-ui/core"

import Logo from "../images/FlatMatch.png"
import React from "react"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appbar: {
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
	},
	avatar: {
		backgroundColor: "#ff8f00",
	},
	logo: {
		width: 150,
		height: 75,
	},
}))

export default function DefaultAppBar(
	name: string,
	breadcrumb: JSX.Element,
	profileImageUrl = "",
	isProfileCreated = true
) {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const isMenuOpen = Boolean(anchorEl)

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const menuId = "appbar-account-menu"
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{isProfileCreated ? (
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			) : null}
			{isProfileCreated ? (
				<MenuItem onClick={handleMenuClose}>Messages</MenuItem>
			) : null}
			<MenuItem onClick={handleMenuClose}>
				<Link color="inherit" href="/signIn">
					Logout
				</Link>
			</MenuItem>
		</Menu>
	)

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.appbar}>
				<Toolbar>
					<Grid
						justify="space-between"
						alignItems="center"
						container
						spacing={0}
					>
						<Grid item>{breadcrumb}</Grid>
						<Grid item>
							<img src={Logo} className={classes.logo} alt="" />
						</Grid>
						<Grid item>
							<IconButton
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<Avatar
									src={profileImageUrl}
									variant="rounded"
									className={classes.avatar}
								>
									{profileImageUrl === "" ? name[0] : null}
								</Avatar>
							</IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			{renderMenu}
		</div>
	)
}
