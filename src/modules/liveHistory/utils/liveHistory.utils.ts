import { formatDate } from "@/libs";
import type { Live } from "@/models";

/** Reference date of a live: when it started or, if never started, when it was created. */
export const getLiveDate = (live: Live) => formatDate(live.startedAt ?? live.createdAt);
