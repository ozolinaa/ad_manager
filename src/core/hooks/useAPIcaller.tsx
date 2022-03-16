import React from "react";
import useAPI, { UseApiOptions, UseApiResult } from "./useAPI";

const useAPIcaller = <GenericRequestType, GenericResponseType>(
  apiClientMethod: (req: GenericRequestType) => Promise<GenericResponseType>,
  options?: Omit<UseApiOptions, "forceReloadTimestamp">
): [
  (req: GenericRequestType) => void,
  UseApiResult<GenericRequestType, GenericResponseType>
] => {
  const [state, setState] = React.useState<{
    req: GenericRequestType;
    calledAtTime: number;
  }>();

  const apiResult = useAPI(
    apiClientMethod,
    state?.req,
    options
      ? {
          ...options,
          forceReloadTimestamp: state?.calledAtTime,
        }
      : {
          forceReloadTimestamp: state?.calledAtTime,
        }
  );
  const caller = React.useCallback(
    (req: GenericRequestType) => {
      setState({
        req,
        calledAtTime: Date.now(),
      });
    },
    [setState]
  );

  return [caller, apiResult];
};

export default useAPIcaller;
