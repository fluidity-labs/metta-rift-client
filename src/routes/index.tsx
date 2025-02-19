import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../pages/home-page.tsx'
import { routePaths } from '../constants/route-paths.ts'

export const Route = createFileRoute(routePaths.HOME)({
  component: Index,
})

function Index() {
  return <HomePage />
}
