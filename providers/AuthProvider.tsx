import { Session, User } from "@supabase/supabase-js";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { supabase } from "~/utils/supabase";

type AuthContextType = {
  session: Session | null;
  user: User | undefined;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: undefined,
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return <AuthContext.Provider value={{ session, user: session?.user, }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
