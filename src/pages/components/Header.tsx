import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Image from "next/image";
import type { UserDetailsProps } from "../types";

const LogoutButton: React.FC = () => (
  <Button
    colorScheme="blue"
    variant="outline"
    onClick={() => void signOut()}
    className="!absolute top-24 right-1"
  >
    Sign out
  </Button>
);

const LoginButton: React.FC = () => (
  <Button colorScheme="blue" variant="solid" onClick={() => void signIn()}>
    Sign in
  </Button>
);

const UserDetails: React.FC<UserDetailsProps> = ({
  sessionData,
  onClick,
}: UserDetailsProps) => {
  return (
    <div
      className=" flex cursor-pointer flex-col items-center justify-center gap-1"
      onClick={onClick}
    >
      <Image
        src={sessionData.user?.image as string}
        alt={`Image of ${sessionData.user.name as string}`}
        className="mx-2 inline overflow-hidden rounded-full"
        height={40}
        width={40}
      />
      {sessionData.user?.name?.split(" ")[0]}
    </div>
  );
};

export const Header: React.FC = () => {
  const { data: sessionData } = useSession();
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const toggleShowLogout = () => setShowLogout((x) => !x);

  return (
    <header className="flex h-20 w-full items-center justify-between">
      <div className="text-2xl ">Note Taker</div>
      <div className="flex">
        {sessionData ? (
          <UserDetails sessionData={sessionData} onClick={toggleShowLogout} />
        ) : (
          <LoginButton />
        )}
        {showLogout && <LogoutButton />}
      </div>
    </header>
  );
};
