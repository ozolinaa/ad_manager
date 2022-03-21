import ipLocator from 'server/clients/ipLocator'
import {Operation, OperationRequest, OperationResponse} from 'src/api/types'

export const ipGeoLookup = async (req: OperationRequest<'IPGeoLookup'>): Promise<OperationResponse<'IPGeoLookup'>> => {
    const result = await ipLocator.getIPLocation(req.ip)
    return result;
}