import { Request } from 'express';

export const getOrigin = (req: Request): string => {
  const { protocol, hostname, socket: {localPort: port} } = req;
  const protocolWithHostName = `${protocol}://${hostname}`;
  if ((protocol == 'https' && port != 443) || (protocol == 'http' && port != 80)) {
    return `${protocolWithHostName}:${port}`
  }
  return protocolWithHostName;
};
