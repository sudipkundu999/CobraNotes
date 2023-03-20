import type { Session } from "next-auth";

export interface UserDetailsProps {
  sessionData: Session;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export interface LoginButtonProps {
  isLoading: boolean;
}

export interface LogoutButtonProps {
  isLoading: boolean;
}
