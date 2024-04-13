import { logout } from "@services/logout";
import { createContext, useContext } from "react";

import { useStorageState } from "./useStorageState";
import { SecureStorageKeys, SignInFunction, SignOutFunction } from "../types";

const AuthContext = createContext<{
  signIn: SignInFunction;
  signOut: SignOutFunction;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState(
    SecureStorageKeys.AuthToken,
  );

  return (
    <AuthContext.Provider
      value={{
        signIn: (token) => {
          setSession(token);
        },
        signOut: async () => {
          await logout();
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
