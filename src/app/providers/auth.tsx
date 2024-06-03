import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react';
import { AuthProfile } from '@/app/actions/auth';

type UseAuthProps = {
  isAuth: boolean;
  profile?: AuthProfile;
  token?: string;
  updateProfile(): Promise<void> | void,
};

const AuthContext = createContext<UseAuthProps>({
  isAuth: false,
  updateProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState<AuthProfile>();
  const [token, setToken] = useState<string>();

  const providerValue = useMemo(
    () => ({
      isAuth,
      profile,
      token,
      updateProfile: async () => {
        fetch('/me').then(async (res) => {
          const data = await res.json();
          setIsAuth(true);
          setProfile(data.profile);
          setToken(data.token);
        });
      },
    }),
    [isAuth, profile, token],
  );

  useEffect(() => {
    fetch('/me').then(async (res) => {
      const data = await res.json();
      setIsAuth(true);
      setProfile(data.profile);
      setToken(data.token);
    });
  }, []);

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
}
