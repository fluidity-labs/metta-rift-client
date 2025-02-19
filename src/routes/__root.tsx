import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import React, {Suspense} from "react";
import DefaultLayout from "../layouts/default-layout.tsx";
import {createStore} from "jotai";
import {QueryClient} from "@tanstack/react-query";
import {RestService} from "../api/rest-service.ts";

interface AppRouterContext {
    queryClient: QueryClient,
    apiService: RestService,
    globalStateStore: ReturnType<typeof createStore>
}

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : React.lazy(() =>
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
            })),
        )

export const Route = createRootRouteWithContext<AppRouterContext>()({
    component: () => {
        return (
            <>
                <DefaultLayout>
                    <Outlet />
                </DefaultLayout>
                <Suspense>
                    <TanStackRouterDevtools initialIsOpen={false} />
                </Suspense>
            </>
        )
    }
})
