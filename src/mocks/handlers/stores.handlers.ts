import { config } from "@/config";
import { ADMIN_STORES_PATH } from "@/DAL/const";
import type {
  CreateStorePayload,
  ResetStoreAdminPasswordPayload,
  UpdateStorePayload,
} from "@/DAL/stores";
import type { Store } from "@/models";
import { USER_ROLE } from "@/types";
import { delay, http, HttpResponse } from "msw";
import {
  findUserByEmail,
  revokeUserSessions,
  saveMockAccounts,
  type MockAccounts,
  type MockStore,
} from "../data/accounts";
import { sendVerificationCode } from "../utils/authSession";
import { errorResponse, MOCK_DELAY_MS } from "../utils/response";
import { requireSuperAdmin } from "../utils/session";
import { generateId, toEpochSeconds } from "../utils/token";

const API_URL = config.VITE_API_BASE_URL || "";
const STORE_NAME_MAX = 60;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 100;

const isValidPassword = (password?: string) =>
  !!password && password.length >= PASSWORD_MIN && password.length <= PASSWORD_MAX;

/** Store plus the state of its admin account, as vivos-be returns it. */
const toStore = (accounts: MockAccounts, store: MockStore): Store => {
  const admin = accounts.users.find((u) => u.id === store.adminUserId);
  return {
    ...store,
    adminEmail: admin?.email ?? "",
    adminEmailVerified: admin?.emailVerified ?? false,
  };
};

const findStoreAndAdmin = (accounts: MockAccounts, id: unknown) => {
  const store = accounts.stores.find((s) => s.id === id);
  const admin = accounts.users.find((u) => u.id === store?.adminUserId);
  return store && admin ? { store, admin } : null;
};

const storeNotFound = () => errorResponse(404, "Tienda no encontrada");

export const storeHandlers = [
  http.get(`${API_URL}${ADMIN_STORES_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireSuperAdmin(request);
    if ("error" in guard) return guard.error;
    const { accounts } = guard;
    return HttpResponse.json(accounts.stores.map((store) => toStore(accounts, store)));
  }),

  http.post(`${API_URL}${ADMIN_STORES_PATH}`, async ({ request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireSuperAdmin(request);
    if ("error" in guard) return guard.error;
    const { accounts } = guard;
    const body = (await request.json()) as CreateStorePayload;
    const name = body.name?.trim() ?? "";
    if (!name || name.length > STORE_NAME_MAX) return errorResponse(400, "Nombre de tienda inválido");
    if (!isValidPassword(body.adminPassword)) return errorResponse(400, "Contraseña inválida");
    if (findUserByEmail(accounts, body.adminEmail)) {
      return errorResponse(409, "El email ya está registrado");
    }
    // Admins created by the super admin must verify their email on first sign in.
    const admin = {
      id: generateId(),
      email: body.adminEmail.trim().toLowerCase(),
      password: body.adminPassword,
      roles: [USER_ROLE.ADMIN],
      enabled: true,
      emailVerified: false,
      tokensValidAfter: 0,
      lastCodeSentAt: 0,
    };
    sendVerificationCode(admin);
    const store: MockStore = {
      id: generateId(),
      name,
      active: true,
      adminUserId: admin.id,
      createdAt: new Date().toISOString(),
    };
    accounts.users.push(admin);
    accounts.stores.push(store);
    saveMockAccounts(accounts);
    return HttpResponse.json(toStore(accounts, store), { status: 201 });
  }),

  http.patch(`${API_URL}${ADMIN_STORES_PATH}/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireSuperAdmin(request);
    if ("error" in guard) return guard.error;
    const { accounts } = guard;
    const found = findStoreAndAdmin(accounts, params.id);
    if (!found) return storeNotFound();
    const body = (await request.json()) as UpdateStorePayload;
    if (body.name !== undefined) {
      const name = body.name.trim();
      if (!name || name.length > STORE_NAME_MAX) return errorResponse(400, "Nombre de tienda inválido");
      found.store.name = name;
    }
    if (body.active !== undefined) {
      found.store.active = body.active;
      // Disabling the admin in darmoz-auth revokes her sessions.
      found.admin.enabled = body.active;
      if (!body.active) revokeUserSessions(accounts, found.admin.id);
    }
    saveMockAccounts(accounts);
    return HttpResponse.json(toStore(accounts, found.store));
  }),

  http.put(`${API_URL}${ADMIN_STORES_PATH}/:id/admin-password`, async ({ params, request }) => {
    await delay(MOCK_DELAY_MS);
    const guard = requireSuperAdmin(request);
    if ("error" in guard) return guard.error;
    const { accounts } = guard;
    const found = findStoreAndAdmin(accounts, params.id);
    if (!found) return storeNotFound();
    const { password } = (await request.json()) as ResetStoreAdminPasswordPayload;
    if (!isValidPassword(password)) return errorResponse(400, "Contraseña inválida");
    found.admin.password = password;
    found.admin.tokensValidAfter = toEpochSeconds(Date.now());
    revokeUserSessions(accounts, found.admin.id);
    saveMockAccounts(accounts);
    return new HttpResponse(null, { status: 204 });
  }),

  http.post(
    `${API_URL}${ADMIN_STORES_PATH}/:id/admin-verification-email`,
    async ({ params, request }) => {
      await delay(MOCK_DELAY_MS);
      const guard = requireSuperAdmin(request);
      if ("error" in guard) return guard.error;
      const { accounts } = guard;
      const found = findStoreAndAdmin(accounts, params.id);
      if (!found) return storeNotFound();
      if (found.admin.emailVerified) return errorResponse(409, "El email ya está verificado");
      if (!sendVerificationCode(found.admin)) {
        return errorResponse(429, "Esperá un minuto antes de reenviar el código");
      }
      saveMockAccounts(accounts);
      return new HttpResponse(null, { status: 204 });
    },
  ),
];
