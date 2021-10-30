import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { Router, Route, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavigationMenu.css";

const drawerWidth = 240;
const history = createBrowserHistory();

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

const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <Fragment>
    <AppBar>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </Fragment>
));

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick, sections }) => (
    <Router history={history}>
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
              exact
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
      <main>
        {sections.map(({ href, screen }, index) => (
          <Route key={index} exact path={href}>
            {screen}
          </Route>
        ))}
      </main>
    </Router>
  )
);

function NavigationMenu({ classes, variant, sections }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Prima pagina");

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = (title) => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
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
