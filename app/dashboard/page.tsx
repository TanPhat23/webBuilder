//test dashboard
import React, { PropsWithChildren } from "react";

import { UserButton } from "@clerk/nextjs";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div>
        <UserButton />
        <h1>This is dashboard test</h1>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
