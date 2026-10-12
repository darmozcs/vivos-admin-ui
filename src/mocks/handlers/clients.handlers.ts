import { config } from "@/config";
import { CLIENTS_PATH } from "@/DAL/const";
import type { CreateClientPayload, UpdateClientPayload } from "@/DAL/clients";
import { delay, http, HttpResponse } from "msw";
import { MOCK_CLIENTS, type MockClient } from "../data/clients";
import { MOCK_ORDERS } from "../data/orders";
import { containsText, stripAccountPrefix, textParam } from "../utils/filters";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireStore } from "../utils/session";

const API_URL = config.VITE_API_BASE_URL || "";
const ACCOUNT_PREFIX = "@";
const FIELD_MAX = { fullName: 150, account: 100, phone: 30, address: 255 } as const;

/** vivos-be length limits; returns the first invalid field. */
const tooLongField = (body: Partial<Record<keyof typeof FIELD_MAX, string>>) =>
  (Object.keys(FIELD_MAX) as (keyof typeof FIELD_MAX)[]).find(
    (field) => (body[field]?.trim().length ?? 0) > FIELD_MAX[field],
  );

const normalizeAccount = (value?: string) => {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  return trimmed.startsWith(ACCOUNT_PREFIX)
    ? trimmed
    : `${ACCOUNT_PREFIX}${trimmed}`;
};

const findClient = (storeId: string, id: unknown) =>
  MOCK_CLIENTS.find((c) => c.id === id && c.storeId === storeId);

export const clientHandlers = [
  http.get(`${API_URL}${CLIENTS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const params = new URL(request.url).searchParams;
    const search = textParam(params, "search");
    const fullName = textParam(params, "fullName");
    const account = textParam(params, "account");
    const phone = textParam(params, "phone");
    const department = params.get("department") || undefined;
    const deliveryType = params.get("deliveryType") || undefined;
    // Every filter is combined with AND, like vivos-be.
    const results = MOCK_CLIENTS.filter(
      (client) =>
        client.storeId === guard.store.id &&
        containsText(`${client.fullName} ${client.account} ${client.phone}`, search) &&
        containsText(client.fullName, fullName) &&
        containsText(stripAccountPrefix(client.account), account && stripAccountPrefix(account)) &&
        containsText(client.phone, phone) &&
        (!department || client.department === department) &&
        (!deliveryType || client.deliveryType === deliveryType),
    );
    return HttpResponse.json(results);
  }),

  http.post(`${API_URL}${CLIENTS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const body = (await request.json()) as CreateClientPayload;
    if (!body.fullName?.trim()) {
      return errorResponse(400, "El nombre es obligatorio");
    }
    const invalidField = tooLongField(body);
    if (invalidField) return errorResponse(400, `El campo ${invalidField} es demasiado largo`);
    const created: MockClient = {
      id: crypto.randomUUID(),
      storeId: guard.store.id,
      fullName: body.fullName.trim(),
      account: normalizeAccount(body.account),
      phone: body.phone?.trim() ?? "",
      address: body.address?.trim() ?? "",
      department: body.department ?? null,
      deliveryType: body.deliveryType ?? null,
      createdAt: new Date().toISOString(),
    };
    MOCK_CLIENTS.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch(`${API_URL}${CLIENTS_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const client = findClient(guard.store.id, params.id);
    if (!client) return errorResponse(404, "Clienta no encontrada");
    const body = (await request.json()) as UpdateClientPayload;
    if (!body.fullName?.trim()) {
      return errorResponse(400, "El nombre es obligatorio");
    }
    const invalidField = tooLongField(body);
    if (invalidField) return errorResponse(400, `El campo ${invalidField} es demasiado largo`);
    Object.assign(client, {
      fullName: body.fullName.trim(),
      account: normalizeAccount(body.account),
      phone: body.phone?.trim() ?? "",
      address: body.address?.trim() ?? "",
      // Like vivos-be, the PATCH replaces everything: missing values are cleared.
      department: body.department ?? null,
      deliveryType: body.deliveryType ?? null,
    });
    return HttpResponse.json(client);
  }),

  http.delete(`${API_URL}${CLIENTS_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const client = findClient(guard.store.id, params.id);
    if (!client) return errorResponse(404, "Clienta no encontrada");
    // Clients with purchases are kept so the sales history stays consistent.
    const hasPurchases = MOCK_ORDERS.some(
      (order) => order.clientId === client.id && order.items.length > 0,
    );
    if (hasPurchases) {
      return errorResponse(409, "No se puede eliminar una clienta con compras");
    }
    MOCK_CLIENTS.splice(MOCK_CLIENTS.indexOf(client), 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
