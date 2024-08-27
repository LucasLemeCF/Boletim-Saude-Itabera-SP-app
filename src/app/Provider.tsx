"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Provider({ children }: Props) {
  // const { data: session } = useSession();
  
  return (
    <SessionProvider>
      {/* {session? children : null} */}
      {children}
    </SessionProvider>
  );
}

export default Provider;