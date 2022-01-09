import React, { useEffect } from "react";
import { superAdminSections } from "../../../utils";
import { Routes, Route } from "react-router-dom";
import NavigationMenu from "../../../core/NavigationMenu/NavigationMenu.component";
import { useRoleEnsurer } from "../../../hooks/useRoleEnsurer";

const SuperAdminRouter = () => {
  const roleEnsurer = useRoleEnsurer();
  roleEnsurer();

  return (
    <>
      <NavigationMenu sections={superAdminSections} />
      <Routes>
        {/* <Loading /> */}

        {superAdminSections.map(({ href, screen }, index) => (
          <Route key={index} path={href} element={screen} />
        ))}
      </Routes>
    </>
  );
};

export default SuperAdminRouter;
