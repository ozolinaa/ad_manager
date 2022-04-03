import { Request } from 'express';

export const getOrigin = (req: Request): string => {
  const { protocol: localProtocol } = req;
  const protocol = req.headers["X-Forwarded-Proto"] as string || localProtocol
  return `${protocol}://${getHostNameAndPort(req)}`;
};

export const getHostNameAndPort = (req: Request): string => {
  const { protocol: localProtocol, hostname: localHostname, socket: {localPort} } = req;
  const port = req.headers["X-Forwarded-Port"] as string || localPort
  const protocol = req.headers["X-Forwarded-Proto"] as string || localProtocol
  const hostname = req.headers["X-Forwarded-Host"] as string || localHostname

  if ((protocol == 'https' && port != 443) || (protocol == 'http' && port != 80)) {
    return `${hostname}:${port}`
  }
  return hostname;
};

export const getClientIp = (req: Request): string => {
  const ips = (req.headers["X-Forwarded-For"] as string || req.socket.remoteAddress as string);
  return ips.split(",")[0].trim();
};