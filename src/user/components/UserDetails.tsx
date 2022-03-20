import React from "react";
import { Profile } from 'passport';

export interface UserDetailsProps {
  id: string;
  name: string;
  email: string;
}

export const converProfileToUserDetailsProps = (profile: Profile):UserDetailsProps => {
  const email: string = profile.emails ? profile.emails[0].value : '';
  return {
    id: profile.id,
    name: profile.displayName,
    email
  }
}

const UserDetails: React.FC<UserDetailsProps> = (props: UserDetailsProps) => {
  return (
    <div>
      <p>id: {props.id}</p>
      <p>name: {props.name}</p>
      <p>email: {props.email}</p>
    </div>
  );
};

export default UserDetails;
