export type HasFunctionsOnly = { [key: string]: (...data: any) => unknown };

export interface StateActionsContext {
    state?: unknown;
    actions?: HasFunctionsOnly;
}
