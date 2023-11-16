import React from "react";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex item-center justify-center bg-gray-100">
      {children}
    </div>
  );
};

export default ClerkLayout;
