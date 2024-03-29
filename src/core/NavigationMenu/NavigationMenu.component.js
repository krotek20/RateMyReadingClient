import React, { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { Route, NavLink, useNavigate, Routes } from "react-router-dom";
import { withStyles, useTheme } from "@mui/styles";
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
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { logout } from "./Logout.api";
import {
  getNoOfDeniedQuestions,
  getNoOfUnapprovedQuestions,
  unIndexedSections,
} from "../../utils";
import create from "zustand";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeniedQuestions,
  setUnapprovedQuestions,
} from "../../redux/Badge/Badge";
import { setCurrentBook } from "../../redux/Book/CurrentBook";
import { useDecode } from "../../hooks/useDecode";
import { getMyInfo, getMyPoints } from "../../modules/User/User.api";

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
  pointsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    userSelect: "none",
  },
  avatar: {
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
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
    onMenuClick,
    onLogoutClick,
    color,
    noOfPendingQuestions,
    role,
    name,
    currentPoints,
    totalPoints,
  }) => (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Tooltip title="Meniu" arrow>
            <IconButton
              id="menu-button"
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
            {localStorage.getItem("title")}
          </Typography>
          <Box className={classes.pointsContainer} ml={2}>
            <EmojiEmotionsIcon sx={{ mx: 1 }} />
            <Typography variant="body2" mr={2}>
              Salut, {name}!
            </Typography>
          </Box>
          {role === "ROLE_STUDENT" && (
            <>
              <Tooltip title="Puncte curente">
                <Box className={classes.pointsContainer}>
                  <WorkspacePremiumIcon sx={{ mx: 1 }} />
                  <Typography>{currentPoints}</Typography>
                </Box>
              </Tooltip>
              <Tooltip title="Total puncte">
                <Box className={classes.pointsContainer}>
                  <EmojiEventsIcon sx={{ mx: 1 }} />
                  <Typography>{totalPoints}</Typography>
                </Box>
              </Tooltip>
            </>
          )}
          <Tooltip title="Deconectare" arrow>
            <IconButton
              id="logout-button"
              aria-label="Logout"
              onClick={() => onLogoutClick()}
            >
              <LogoutIcon style={{ fill: color }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
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
                id={`list-item-${index}`}
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
  const [currentPoints, setCurrentPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
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
    localStorage.setItem("title", title);
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
    if (user.roles.includes("ROLE_SUPERADMIN")) {
      getNoOfDeniedQuestions()
        .then((res1) => {
          dispatch(setDeniedQuestions(res1));
          return getNoOfUnapprovedQuestions();
        })
        .then((res2) => {
          dispatch(setUnapprovedQuestions(res2));
        })
        .catch((error) => {
          if (error.response.status === 403) {
            logout();
            navigate("/login", { replace: true });
          }
        });
    }
  }, [dispatch, navigate, user.roles]);

  useEffect(() => {
    getMyPoints()
      .payload.then((response) => {
        if (response.status === 200) {
          setCurrentPoints(response.data.currentPoints);
          setTotalPoints(response.data.totalPoints);
        }
        return getMyInfo().payload;
      })
      .then((response) => {
        if (response.status === 200) {
          setCurrentUser(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        }
      });
  }, [navigate]);

  const noOfQuestions = useMemo(() => {
    return noOfDeniedQuestions + noOfUnapprovedQuestions;
  }, [noOfDeniedQuestions, noOfUnapprovedQuestions]);

  return (
    <Box className={classes.root}>
      <MyToolbar
        onMenuClick={toggleDrawer}
        onLogoutClick={handleLogout}
        color={theme.palette.primary.contrastText}
        noOfPendingQuestions={noOfQuestions}
        role={user.roles[0]}
        name={
          currentUser ? currentUser.lastName + " " + currentUser.firstName : ""
        }
        currentPoints={currentPoints}
        totalPoints={totalPoints}
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
    </Box>
  );
}

export default withStyles(styles)(NavigationMenu);
