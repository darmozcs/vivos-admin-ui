import type { LiveStatus } from "@/types";

export interface Live {
  id: string;
  /** Correlative number of the live within the store. */
  number: number;
  title: string;
  platform: string;
  status: LiveStatus;
  startedAt: string | null;
  endedAt: string | null;
  /** Milliseconds already streamed before the current running segment. */
  accumulatedMs: number;
  /** Start of the current running segment; null while paused or stopped. */
  runningSince: string | null;
  createdAt: string;
  /** Ids of the store tags of the live. */
  tagIds: string[];
}

/** Live plus the sales totals computed by the server. */
export interface LiveSummary extends Live {
  buyers: number;
  units: number;
  totalAmount: number;
}

/** Totals of every live matching the history filters (GET /lives/summary). */
export interface LivesSummary {
  lives: number;
  /** Sum of the buyers of each live (a client buying in two lives counts twice). */
  buyers: number;
  units: number;
  totalAmount: number;
}
