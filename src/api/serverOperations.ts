import { AsyncOperationsOnly, IPLocation } from "src/common/types";
import { AdContextState } from "src/ad/components/AdContextProvider";
import callServerOperation from "./callServerOperation";
import { Operation } from "./types";

// step 1: define operations in ServerOperationsInterface
export interface ServerOperationsInterface extends AsyncOperationsOnly {
    IPGeoLookup: (req: {ip: string }) => Promise<IPLocation>,
    UpdateAdContextState: (req: AdContextState) => Promise<AdContextState>,
    GetAdContextState: (req: {}) => Promise<AdContextState>,
};

// step 2: adjust operations to implement ServerOperationsInterface
export const serverOperations: ServerOperationsInterface = {
    IPGeoLookup: (req: {ip: string }) => callServerOperation('IPGeoLookup', req),
    UpdateAdContextState: (req: AdContextState) => callServerOperation('UpdateAdContextState', req),
    GetAdContextState: (req: {}) => callServerOperation('GetAdContextState', req),
};

// step 3: adjust operationsRequireAuthorization
export const operationsRequireAuthorization: Set<Operation> = new Set<Operation>([
    'GetAdContextState', 
    'UpdateAdContextState', 
    'IPGeoLookup'
]);
