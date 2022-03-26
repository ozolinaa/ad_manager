import { getAdState } from 'server/dataStore/adState';
import {OperationRequest, OperationResponse} from 'src/api/types'

const getAdContextState = async (_req: OperationRequest<'GetAdContextState'>): Promise<OperationResponse<'GetAdContextState'>> => {
  return await getAdState();
}

export default getAdContextState;
