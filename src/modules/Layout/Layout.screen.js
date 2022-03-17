import React from "react";
import Login from "../Login/Login.screen";
import { Routes, Navigate, Route } from "react-router-dom";
import "./Layout.css";
import RoleEnsurer from "./RoleEnsurer.route";
import NavigationMenu from "../../core/NavigationMenu/NavigationMenu.component";
import {
  superAdminSections,
  childSections,
  contributorSections,
  localAdminSections,
  teacherSections,
} from "../../utils";
import ForgotPassword from "../Login/ForgotPassword.screen";
import ConfirmForgotPassword from "../Login/ConfirmForgotPassword.screen";

function Layout({ handleColorChange }) {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route
        path="forgotPassword/:username/:key"
        element={<ConfirmForgotPassword />}
      />
      <Route
        path="elev/*"
        element={
          <RoleEnsurer roles={["ROLE_STUDENT"]}>
            <NavigationMenu
              sections={childSections}
              changePrimary={handleColorChange}
            />
          </RoleEnsurer>
        }
      />
      <Route
        path="superadmin/*"
        element={
          <RoleEnsurer roles={["ROLE_SUPERADMIN"]}>
            <NavigationMenu
              sections={superAdminSections}
              changePrimary={handleColorChange}
            />
          </RoleEnsurer>
        }
      />
      <Route
        path="contributor/*"
        element={
          <RoleEnsurer roles={["ROLE_CONTRIBUTOR"]}>
            <NavigationMenu
              sections={contributorSections}
              changePrimary={handleColorChange}
            />
          </RoleEnsurer>
        }
      />
      <Route
        path="localadmin/*"
        element={
          <RoleEnsurer roles={["ROLE_LOCALADMIN"]}>
            <NavigationMenu
              sections={localAdminSections}
              changePrimary={handleColorChange}
            />
          </RoleEnsurer>
        }
      />
      <Route
        path="teacher/*"
        element={
          <RoleEnsurer roles={["ROLE_PROFESSOR"]}>
            <NavigationMenu
              sections={teacherSections}
              changePrimary={handleColorChange}
            />
          </RoleEnsurer>
        }
      />
      <Route path="/" element={<Navigate to="elev" />} />
    </Routes>
  );
}

export default Layout;
