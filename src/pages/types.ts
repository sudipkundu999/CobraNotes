import { Session } from "next-auth";

export interface UserDetailsProps {
  sessionData: Session;
  onClick: React.MouseEventHandler<HTMLElement>;
}
