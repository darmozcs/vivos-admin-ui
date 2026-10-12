import { config } from "@/config";
import { i18nReady } from "@/libs/i18n";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "mantine-datatable/styles.layer.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree, basepath: import.meta.env.BASE_URL });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  if (import.meta.env.MODE !== "development" || !config.VITE_ENABLE_MOCKS) {
    return;
  }
  const { startMocking } = await import("./mocks");
  return startMocking();
}

Promise.all([enableMocking(), i18nReady]).then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
});
