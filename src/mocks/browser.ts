import { setupWorker } from "msw/browser";
import {
  authHandlers,
  balanceHandlers,
  clientHandlers,
  liveHandlers,
  tradeHandlers,
  orderHandlers,
  sellerHandlers,
  settingsHandlers,
  storeHandlers,
  tagHandlers,
} from "./handlers";

export const worker = setupWorker(
  ...authHandlers,
  ...settingsHandlers,
  ...storeHandlers,
  ...clientHandlers,
  ...liveHandlers,
  ...orderHandlers,
  ...sellerHandlers,
  ...tradeHandlers,
  ...balanceHandlers,
  ...tagHandlers,
);
