import { setupWorker } from "msw/browser";
import {
  authHandlers,
  clientHandlers,
  liveHandlers,
  orderHandlers,
  settingsHandlers,
  storeHandlers,
} from "./handlers";

export const worker = setupWorker(
  ...authHandlers,
  ...settingsHandlers,
  ...storeHandlers,
  ...clientHandlers,
  ...liveHandlers,
  ...orderHandlers,
);
