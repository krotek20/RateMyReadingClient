import React, { useState, useEffect, useMemo, Fragment } from "react";
import clsx from "clsx";
import { Route, NavLink, useNavigate, Routes } from "react-router-dom";
import { withStyles } from "@mui/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Divider,
  ListItemButton,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "./Logout.api";
import {
  getNoOfDeniedQuestions,
  getNoOfUnapprovedQuestions,
  unIndexedSections,
} from "../../utils";
import create from "zustand";
import { useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeniedQuestions,
  setUnapprovedQuestions,
} from "../../redux/Badge/Badge";
import { setCurrentBook } from "../../redux/Book/CurrentBook";
import { useDecode } from "../../hooks/useDecode";

const useDrawerStore = create(() => ({
  selected: 0,
}));

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  ({
    classes,
    title,
    onMenuClick,
    onLogoutClick,
    color,
    noOfPendingQuestions,
    role,
  }) => (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Tooltip title="Meniu" arrow>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={onMenuClick}
            >
              {role === "ROLE_SUPERADMIN" ? (
                <Badge badgeContent={noOfPendingQuestions} color="error">
                  <MenuIcon style={{ fill: color }} />
                </Badge>
              ) : (
                <MenuIcon style={{ fill: color }} />
              )}
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.flex}>
            {title}
          </Typography>
          <Tooltip title="Deconectare" arrow>
            <IconButton aria-label="Logout" onClick={() => onLogoutClick()}>
              <LogoutIcon style={{ fill: color }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({
    classes,
    variant,
    open,
    onClose,
    onItemClick,
    sections,
    noOfDeniedQuestions,
    noOfUnapprovedQuestions,
  }) => (
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
        <List component="nav">
          {sections.map(({ name, href, icon }, index) =>
            href === "divider" ? (
              <Divider key={index} />
            ) : (
              <ListItemButton
                key={index}
                component={NavLink}
                to={href}
                selected={useDrawerStore().selected === index}
                onClick={onItemClick(name, index)}
              >
                <ListItemIcon>
                  <Badge
                    badgeContent={
                      href === "intrebari/verifica"
                        ? noOfUnapprovedQuestions
                        : href === "intrebari/editeaza"
                        ? noOfDeniedQuestions
                        : 0
                    }
                    color="error"
                  >
                    {icon}
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            )
          )}
        </List>
      </Drawer>
      <Routes>
        {[...sections, ...unIndexedSections].map(({ href, screen }, index) => {
          if (href === "divider") return null;
          return <Route key={index} path={href} element={screen} />;
        })}
      </Routes>
    </>
  )
);

function NavigationMenu({ classes, variant, sections, changePrimary }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("");
  const decode = useDecode();
  const user = decode();

  const noOfDeniedQuestions = useSelector(
    (state) => state.badge.noOfDeniedQuestions
  );
  const noOfUnapprovedQuestions = useSelector(
    (state) => state.badge.noOfUnapprovedQuestions
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const theme = useTheme();

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = (title, index) => () => {
    setTitle(title);
    useDrawerStore.setState({ selected: index });
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
    dispatch(setCurrentBook(null));
    changePrimary();
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    getNoOfDeniedQuestions().then((res1) => {
      dispatch(setDeniedQuestions(res1));
      getNoOfUnapprovedQuestions().then((res2) => {
        dispatch(setUnapprovedQuestions(res2));
      });
    });
  }, [dispatch]);

  const noOfQuestions = useMemo(() => {
    return noOfDeniedQuestions + noOfUnapprovedQuestions;
  }, [noOfDeniedQuestions, noOfUnapprovedQuestions]);

  return (
    <div className={classes.root}>
      <MyToolbar
        title={title}
        onMenuClick={toggleDrawer}
        onLogoutClick={handleLogout}
        color={theme.palette.primary.contrastText}
        noOfPendingQuestions={noOfQuestions}
        role={user.roles[0]}
      />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
        sections={sections}
        noOfDeniedQuestions={noOfDeniedQuestions}
        noOfUnapprovedQuestions={noOfUnapprovedQuestions}
      />
    </div>
  );
}

export default withStyles(styles)(NavigationMenu);
