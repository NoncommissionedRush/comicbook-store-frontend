import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AuthContext = [boolean, Dispatch<SetStateAction<boolean>>];

const authContextDefaultValue: AuthContext = [false, () => false];

const AuthContext = createContext(authContextDefaultValue);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
