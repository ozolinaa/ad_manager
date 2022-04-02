import { Request } from 'express';

export const getOrigin = (req: Request): string => {
  const { protocol: localProtocol } = req;
  const protocol = req.headers["x-forwarded-proto"] as string || localProtocol
  return `${protocol}://${getHostNameAndPort(req)}`;
};

export const getHostNameAndPort = (req: Request): string => {
  const { protocol: localProtocol, hostname: localHostname, socket: {localPort} } = req;
  const port = req.headers["x-forwarded-port"] as string || localPort
  const protocol = req.headers["x-forwarded-proto"] as string || localProtocol
  const hostname = req.headers["x-forwarded-host"] as string || localHostname

  if ((protocol == 'https' && port != 443) || (protocol == 'http' && port != 80)) {
    return `${hostname}:${port}`
  }
  return hostname;
};
