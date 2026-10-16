import { config } from "@/config";
import { TAGS_PATH } from "@/DAL/const";
import type { SaveTagPayload } from "@/DAL/tags";
import { delay, http, HttpResponse } from "msw";
import { MOCK_LIVES } from "../data/lives";
import { MOCK_TAGS, type MockTag } from "../data/tags";
import { MOCK_TRADES } from "../data/trades";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireStore } from "../utils/session";

const API_URL = config.VITE_API_BASE_URL || "";
const NAME_MAX = 60;
const COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

const storeTags = (storeId: string) =>
  MOCK_TAGS.filter((tag) => tag.storeId === storeId).sort((a, b) => a.name.localeCompare(b.name));

/** Same validations as vivos-be; returns the error response or the cleaned fields. */
const validate = (storeId: string, body: SaveTagPayload, exceptId?: string) => {
  const name = body.name?.trim() ?? "";
  if (!name) return { error: errorResponse(400, "El nombre es obligatorio") };
  if (name.length > NAME_MAX) return { error: errorResponse(400, "El nombre no puede superar 60 caracteres") };
  if (!COLOR_PATTERN.test(body.color ?? "")) return { error: errorResponse(400, "El color no es valido") };
  const taken = MOCK_TAGS.some(
    (tag) => tag.storeId === storeId && tag.id !== exceptId && tag.name.toLowerCase() === name.toLowerCase(),
  );
  if (taken) return { error: errorResponse(409, "Ya existe una etiqueta con ese nombre") };
  return { fields: { name, color: body.color.toUpperCase() } };
};

/** Like vivos-be: every tag id must belong to the store. */
export const unknownTag = (storeId: string, tagIds: string[] | undefined) =>
  (tagIds ?? []).some((id) => !MOCK_TAGS.some((tag) => tag.id === id && tag.storeId === storeId));

export const tagHandlers = [
  http.get(`${API_URL}${TAGS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    return HttpResponse.json(storeTags(guard.store.id).map(({ storeId: _storeId, ...tag }) => tag));
  }),

  http.post(`${API_URL}${TAGS_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const result = validate(guard.store.id, (await request.json()) as SaveTagPayload);
    if ("error" in result) return result.error;
    const created: MockTag = { id: crypto.randomUUID(), storeId: guard.store.id, ...result.fields };
    MOCK_TAGS.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch(`${API_URL}${TAGS_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const tag = MOCK_TAGS.find((t) => t.id === params.id && t.storeId === guard.store.id);
    if (!tag) return errorResponse(404, "Etiqueta no encontrada");
    const result = validate(guard.store.id, (await request.json()) as SaveTagPayload, tag.id);
    if ("error" in result) return result.error;
    Object.assign(tag, result.fields);
    return HttpResponse.json(tag);
  }),

  http.delete(`${API_URL}${TAGS_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireStore(request);
    if ("error" in guard) return guard.error;
    const tag = MOCK_TAGS.find((t) => t.id === params.id && t.storeId === guard.store.id);
    if (!tag) return errorResponse(404, "Etiqueta no encontrada");
    MOCK_TAGS.splice(MOCK_TAGS.indexOf(tag), 1);
    // Like vivos-be: the tag is removed from every live and movement.
    for (const item of [...MOCK_LIVES, ...MOCK_TRADES]) {
      item.tagIds = item.tagIds.filter((id) => id !== tag.id);
    }
    return new HttpResponse(null, { status: 204 });
  }),
];
