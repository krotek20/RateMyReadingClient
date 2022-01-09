import React, { useEffect } from "react";
import { contributorSections } from "../../../utils";
import { Routes, Route } from "react-router-dom";
import { useRoleEnsurer } from "../../../hooks/useRoleEnsurer";
import NavigationMenu from "../../../core/NavigationMenu/NavigationMenu.component";

const ContributorRouter = () => {
  const roleEnsurer = useRoleEnsurer();
  roleEnsurer();
  return (
    <>
      <NavigationMenu sections={contributorSections} />
      <Routes>
        {/* <Loading /> */}
        {contributorSections.map(({ href, screen }, index) => (
          <Route key={index} path={href} element={screen} />
        ))}
      </Routes>
    </>
  );
};

export default ContributorRouter;
