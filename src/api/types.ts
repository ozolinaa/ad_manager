import { ServerOperationsInterface } from "./serverOperations";

export type Operation = keyof ServerOperationsInterface;
export type OperationRequest<Op extends Operation> = Parameters<ServerOperationsInterface[Op]>[0];
export type OperationResponse<Op extends Operation> = Awaited<ReturnType<ServerOperationsInterface[Op]>>;

export type ServerRequest<Op extends Operation> = {
    operation: Op,
    payload: OperationRequest<Op>
}
