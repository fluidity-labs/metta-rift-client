import React from "react";

export const ReactQueryDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : React.lazy(() =>
            import('@tanstack/react-query-devtools').then((res) => ({
                default: res.ReactQueryDevtools,
            })),
        )