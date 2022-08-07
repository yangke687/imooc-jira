import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";

export const AuthApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <ProjectListScreen />
      <button onClick={() => logout()}>登出</button>
    </div>
  );
};
