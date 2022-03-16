import React from "react";
import usePrevious from "src/common/hooks/usePrevious";

interface GenericUseAPIState<GenericRequestType, GenericResponseType> {
  request: GenericRequestType | undefined;
  response: GenericResponseType | undefined;
  loading: boolean;
  error?: unknown;
  forceReloadTimestamp?: number;
}
export interface UseApiOptions {
  showError?: (error: unknown) => boolean;
  forceReloadTimestamp?: number;
}

export type UseApiResult<GenericRequestType, GenericResponseType> = Omit<
  GenericUseAPIState<GenericRequestType, GenericResponseType>,
  "forceReloadTimestamp"
> & {
  justCompleted: boolean;
  justStarted: boolean;
};

const useAPI = <GenericRequestType, GenericResponseType>(
  apiClientMethod: (rer: GenericRequestType) => Promise<GenericResponseType>,
  request: GenericRequestType | undefined,
  options?: UseApiOptions
): UseApiResult<GenericRequestType, GenericResponseType> => {
  const previousRequest = usePrevious(request);
  const [state, setState] = React.useState<
    GenericUseAPIState<GenericRequestType, GenericResponseType>
  >({
    request,
    response: undefined,
    loading: false,
    error: undefined,
    forceReloadTimestamp: undefined,
  });
  const prevLoading = usePrevious(state.loading) || false;

  React.useEffect(() => {
    // no request is recieved when component does not need useAPI hook to make any requests or modify existing state
    if (!request) {
      return;
    }
    const isSameRequest =
      previousRequest &&
      JSON.stringify(previousRequest) == JSON.stringify(request);
    const forceReload =
      (options?.forceReloadTimestamp || 0) > (state.forceReloadTimestamp || 0);
    if (isSameRequest && !forceReload) {
      return;
    }

    setState({
      request,
      response: undefined,
      loading: true,
      error: undefined,
      forceReloadTimestamp: options?.forceReloadTimestamp,
    });

    apiClientMethod(request)
      .then((response) => {
        setState({
          request,
          response,
          loading: false,
          error: undefined,
          forceReloadTimestamp: options?.forceReloadTimestamp,
        });
      })
      .catch((error: unknown) => {
        setState({
          request,
          response: undefined,
          loading: false,
          error,
          forceReloadTimestamp: options?.forceReloadTimestamp,
        });
      });
  }, [
    apiClientMethod,
    request,
    options?.showError,
    options?.forceReloadTimestamp,
  ]);
  return {
    ...state,
    justCompleted: prevLoading && !state.loading,
    justStarted: !prevLoading && state.loading,
  };
};

export default useAPI;
