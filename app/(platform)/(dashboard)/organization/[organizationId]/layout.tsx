import { Fragment } from "react";
import { OrgControl } from "./_components/org-control/page";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <OrgControl />
      {children}
    </Fragment>
  );
};

export default OrganizationIdLayout;
