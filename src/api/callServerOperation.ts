import postData from "./postData";
import { Operation, OperationRequest, OperationResponse, ServerRequest } from "./types";

const callServerOperation = async <Op extends Operation>(operation: Op, req: OperationRequest<Op>): Promise<OperationResponse<Op>> => {
    const serverRequest: ServerRequest<Op> = {
        operation,
        payload: req
    }
    const data = await postData<OperationResponse<Op>>('/operation', serverRequest);
    return data;
}

export default callServerOperation;
