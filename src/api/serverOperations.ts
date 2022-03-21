import { AsyncOperationsOnly, IPLocation } from "src/common/types";
import callServerOperation from "./callServerOperation";
import { Operation } from "./types";

interface IPGeoLookupRequest {
    ip: string;
}
interface IPGeoLookupResponse extends IPLocation {};

export const operationsRequireAuthorization: Set<Operation> = new Set<Operation>();
operationsRequireAuthorization.add('IPGeoLookup')

export interface ServerOperationsInterface extends AsyncOperationsOnly {
    IPGeoLookup: (req: IPGeoLookupRequest) => Promise<IPGeoLookupResponse>
};

export const serverOperations: ServerOperationsInterface = {
    IPGeoLookup: (req: IPGeoLookupRequest) => callServerOperation('IPGeoLookup', req)
};
