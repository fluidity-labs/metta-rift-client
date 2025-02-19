import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import './styles/index.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {routeTree} from './routeTree.gen';
import {createStore, Provider as GlobalStateProvider} from "jotai";
import {ApiServiceProvider} from "./providers/api-service/api-service-provider.tsx";
import {apiService} from "./providers/api-service/api-service.ts";
import {ReactQueryDevtools} from "./config/react-query-devtools.tsx";

const globalStateStore = createStore();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

const router = createRouter({
    routeTree,
    context: {
        queryClient,
        apiService,
        globalStateStore
    }
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found in the DOM");
}

createRoot(rootElement).render(
    <StrictMode>
        <GlobalStateProvider store={globalStateStore}>
            <QueryClientProvider client={queryClient}>
                <ApiServiceProvider>
                    <RouterProvider router={router}/>
                    <Suspense>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </Suspense>
                </ApiServiceProvider>
            </QueryClientProvider>
        </GlobalStateProvider>
    </StrictMode>,
)
