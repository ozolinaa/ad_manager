import { Express } from "express";
import { getUserProfile, isAuthorized } from "server/utils/auth";
import { Operation, OperationRequest, OperationResponse, ServerRequest } from "src/api/types";
import { operationsRequireAuthorization, ServerOperationsInterface } from "src/api/serverOperations";
import { ipGeoLookup } from "server/operationHandlers/ipGeoLookup";

const operationHandlers: Record<Operation, (req: OperationRequest<Operation>) => Promise<OperationResponse<Operation>>> = {
  'IPGeoLookup': ipGeoLookup
}

export default (app: Express) => {
  app.post("/operation", (req, res) => {
    res.set("Content-Type", "text/javascript; charset=utf-8");
    
    const serverRequest= req.body as ServerRequest<Operation>;
    if (operationsRequireAuthorization.has(serverRequest.operation)) {
      if(!isAuthorized(getUserProfile(req))) {
        res.status(403)
        res.send();
        return;
      }
    }

    const operationHandler = operationHandlers[serverRequest.operation];
    
    operationHandler(serverRequest.payload)
      .then((data) => {
        return res.send(data);
      })
      .catch((error) => {
        res.status(500);
        return res.send(error);
      });
  });
};
