export const ROUTES = {
    HOME: '/',
    HISTORY: "/history",
    CHARTS: "/charts",
    IRFORM: "ir",
    ICMSIPVAFORM: "icms-ipva"
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

