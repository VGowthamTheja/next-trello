import { Fragment } from "react";
import { startCase } from "lodash";

import { OrgControl } from "./_components/org-control/page";
import { auth } from "@clerk/nextjs";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "Organization"),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <OrgControl />
      {children}
    </Fragment>
  );
};

export default OrganizationIdLayout;
