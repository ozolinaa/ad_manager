import { Request } from 'express';
import { Profile } from 'passport';
import { AUTHORIZED_EMAILS } from './secrets';

export const getUserProfile = (req: Request): Profile | undefined => {
  const user: Profile | undefined = (req?.session as any)?.passport?.user;
  return user;
};

const authorizedEmails: Set<string> = new Set<string>(AUTHORIZED_EMAILS.split(',').map((email) => email.toLowerCase().trim())); 
export const isAuthorized = (userProfile: Profile | undefined): boolean => {
  let result = false;
  userProfile?.emails?.forEach((email) => {
    if(authorizedEmails.has(email.value.toLowerCase())) {
      result = true;
    }
  });
  return result;
};