import React, { useEffect } from "react";
import { childSections } from "../../../utils";
import { Routes, Route } from "react-router-dom";
import { useRoleEnsurer } from "../../../hooks/useRoleEnsurer";
import NavigationMenu from "../../../core/NavigationMenu/NavigationMenu.component";

const StudentRouter = () => {
  const roleEnsurer = useRoleEnsurer();
  roleEnsurer();
  return (
    <>
      <NavigationMenu sections={childSections} />
      <Routes>
        {/* <Loading /> */}

        {childSections.map(({ href, screen }, index) => (
          <Route key={index} path={href} element={screen} />
        ))}
      </Routes>
    </>
  );
};

export default StudentRouter;
