import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { Route, NavLink, useNavigate, Routes } from "react-router-dom";
import { withStyles } from "@mui/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "./Logout.api";
import { unIndexedSections } from "../../utils";
import { getUnapprovedQuestions } from "../../modules/Question/Question.api";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick, onLogoutClick }) => (
    <Fragment>
      <AppBar>
        <Toolbar>
          <Tooltip title="Meniu" arrow>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={onMenuClick}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.flex}>
            {title}
          </Typography>
          <Tooltip title="Deconectare" arrow>
            <IconButton aria-label="Logout" onClick={() => onLogoutClick()}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick, sections }) => (
    <>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent",
          })}
        />
        <List>
          {sections.map(({ name, href, icon }, index) => (
            <ListItem
              button
              key={index}
              component={NavLink}
              to={href}
              onClick={onItemClick(name)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Routes>
        {[...sections, ...unIndexedSections].map(({ href, screen }, index) => {
          return <Route key={index} path={href} element={screen} />;
        })}
      </Routes>
    </>
  )
);

function NavigationMenu({ classes, variant, sections, changePrimary }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = (title) => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
    changePrimary();
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={classes.root}>
      <MyToolbar
        title={title}
        onMenuClick={toggleDrawer}
        onLogoutClick={handleLogout}
      />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
        sections={sections}
      />
    </div>
  );
}

export default withStyles(styles)(NavigationMenu);
