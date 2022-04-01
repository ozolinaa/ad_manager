import { Request } from 'express';

export const getOrigin = (req: Request): string => {
  const { protocol } = req;
  return `${protocol}://${getHostNameAndPort(req)}`;
};

export const getHostNameAndPort = (req: Request): string => {
  const { protocol, hostname, socket: {localPort: port} } = req;
  if ((protocol == 'https' && port != 443) || (protocol == 'http' && port != 80)) {
    return `${hostname}:${port}`
  }
  return hostname;
};
