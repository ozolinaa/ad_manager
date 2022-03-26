import { setAdState } from 'server/dataStore/adState';
import {OperationRequest, OperationResponse} from 'src/api/types'

const updateAdContextState = async (req: OperationRequest<'UpdateAdContextState'>): Promise<OperationResponse<'UpdateAdContextState'>> => {
  return await setAdState(req);
}

export default updateAdContextState;
