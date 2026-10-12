import { AppProviders } from "@/modules/providers/containers";
import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";

function RootComponent() {
  return (
    <AppProviders>
      <HeadContent />
      <Outlet />
    </AppProviders>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
