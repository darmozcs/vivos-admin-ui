import { HttpResponse } from "msw";

export const MOCK_DELAY_MS = 150;

export const errorResponse = (status: number, detail: string) =>
  HttpResponse.json({ status, detail }, { status });
