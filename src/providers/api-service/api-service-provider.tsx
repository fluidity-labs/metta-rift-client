import {ApiServiceContext} from "./api-service-context.tsx";
import {apiService} from "./api-service.ts";

export const ApiServiceProvider = (props: any) => {
    return (<ApiServiceContext.Provider value={apiService} {...props} />);
}