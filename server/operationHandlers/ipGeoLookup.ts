import ipLocator from 'server/clients/ipLocator'
import {OperationRequest, OperationResponse} from 'src/api/types'

const ipGeoLookup = async (req: OperationRequest<'IPGeoLookup'>): Promise<OperationResponse<'IPGeoLookup'>> => {
    const result = await ipLocator.getIPLocation(req.ip)
    return result;
}

export default ipGeoLookup;