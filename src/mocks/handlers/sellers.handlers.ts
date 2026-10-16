import { config } from "@/config";
import { SELLERS_PATH } from "@/DAL/const";
import type { CreateSellerPayload, UpdateSellerPayload } from "@/DAL/sellers";
import { delay, http, HttpResponse } from "msw";
import { MOCK_SELLERS, type MockSeller } from "../data/sellers";
import { MOCK_TRADES } from "../data/trades";
import { containsText, stripAccountPrefix, textParam } from "../utils/filters";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireStore } from "../utils/session";

const API_URL = config.VITE_API_BASE_URL || "";
const ACCOUNT_PREFIX = "@";
const FIELD_MAX = { fullName: 150, account: 100, phone: 30, email: 150, address: 255 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Like vivos-be: an empty email is fine, otherwise it must look like one. */
const isInvalidEmail = (value?: string) => {
  const trimmed = value?.trim() ?? "";
  return trimmed !== "" && !EMAIL_PATTERN.test(trimmed);
};

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

const findSeller = (storeId: string, id: unknown) =>
  MOCK_SELLERS.find((s) => s.id === id && s.storeId === storeId);

export const sellerHandlers = [
  http.get(`${API_URL}${SELLERS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const params = new URL(request.url).searchParams;
    const search = textParam(params, "search");
    const fullName = textParam(params, "fullName");
    const account = textParam(params, "account");
    const phone = textParam(params, "phone");
    const email = textParam(params, "email");
    const department = params.get("department") || undefined;
    const deliveryType = params.get("deliveryType") || undefined;
    // Every filter is combined with AND, like vivos-be.
    const results = MOCK_SELLERS.filter(
      (seller) =>
        seller.storeId === guard.store.id &&
        containsText(`${seller.fullName} ${seller.account} ${seller.phone} ${seller.email}`, search) &&
        containsText(seller.fullName, fullName) &&
        containsText(stripAccountPrefix(seller.account), account && stripAccountPrefix(account)) &&
        containsText(seller.phone, phone) &&
        containsText(seller.email, email) &&
        (!department || seller.department === department) &&
        (!deliveryType || seller.deliveryType === deliveryType),
    );
    return HttpResponse.json(results);
  }),

  http.post(`${API_URL}${SELLERS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const body = (await request.json()) as CreateSellerPayload;
    if (!body.fullName?.trim()) {
      return errorResponse(400, "El nombre es obligatorio");
    }
    const invalidField = tooLongField(body);
    if (invalidField) return errorResponse(400, `El campo ${invalidField} es demasiado largo`);
    if (isInvalidEmail(body.email)) return errorResponse(400, "El correo no es valido");
    const created: MockSeller = {
      id: crypto.randomUUID(),
      storeId: guard.store.id,
      fullName: body.fullName.trim(),
      account: normalizeAccount(body.account),
      phone: body.phone?.trim() ?? "",
      email: body.email?.trim() ?? "",
      address: body.address?.trim() ?? "",
      department: body.department ?? null,
      deliveryType: body.deliveryType ?? null,
      createdAt: new Date().toISOString(),
    };
    MOCK_SELLERS.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch(`${API_URL}${SELLERS_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const seller = findSeller(guard.store.id, params.id);
    if (!seller) return errorResponse(404, "Vendedor no encontrado");
    const body = (await request.json()) as UpdateSellerPayload;
    if (!body.fullName?.trim()) {
      return errorResponse(400, "El nombre es obligatorio");
    }
    const invalidField = tooLongField(body);
    if (invalidField) return errorResponse(400, `El campo ${invalidField} es demasiado largo`);
    if (isInvalidEmail(body.email)) return errorResponse(400, "El correo no es valido");
    Object.assign(seller, {
      fullName: body.fullName.trim(),
      account: normalizeAccount(body.account),
      phone: body.phone?.trim() ?? "",
      email: body.email?.trim() ?? "",
      address: body.address?.trim() ?? "",
      // Like vivos-be, the PATCH replaces everything: missing values are cleared.
      department: body.department ?? null,
      deliveryType: body.deliveryType ?? null,
    });
    return HttpResponse.json(seller);
  }),

  http.delete(`${API_URL}${SELLERS_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const seller = findSeller(guard.store.id, params.id);
    if (!seller) return errorResponse(404, "Vendedor no encontrado");
    // Sellers with trades are kept so the trades history stays consistent, like vivos-be.
    if (MOCK_TRADES.some((trade) => trade.sellerId === seller.id)) {
      return errorResponse(409, "No se puede eliminar un vendedor con movimientos");
    }
    MOCK_SELLERS.splice(MOCK_SELLERS.indexOf(seller), 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
