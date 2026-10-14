export const LIVE_STATUS = {
  NOT_STARTED: "NOT_STARTED",
  RUNNING: "RUNNING",
  PAUSED: "PAUSED",
  ENDED: "ENDED",
} as const;

export type LiveStatus = (typeof LIVE_STATUS)[keyof typeof LIVE_STATUS];

export const LIVE_ACTION = {
  START: "start",
  PAUSE: "pause",
  RESUME: "resume",
  END: "end",
} as const;

export type LiveAction = (typeof LIVE_ACTION)[keyof typeof LIVE_ACTION];

export const ORDER_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const PACKAGE_STATUS = {
  PENDING: "PENDING",
  PREPARED: "PREPARED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
} as const;

export type PackageStatus = (typeof PACKAGE_STATUS)[keyof typeof PACKAGE_STATUS];

/** Roles of the "Vivos" application in darmoz-auth that can use this admin. */
export const USER_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

/** Departments of Uruguay (client delivery data). */
export const DEPARTMENT = {
  ARTIGAS: "ARTIGAS",
  CANELONES: "CANELONES",
  CERRO_LARGO: "CERRO_LARGO",
  COLONIA: "COLONIA",
  DURAZNO: "DURAZNO",
  FLORES: "FLORES",
  FLORIDA: "FLORIDA",
  LAVALLEJA: "LAVALLEJA",
  MALDONADO: "MALDONADO",
  MONTEVIDEO: "MONTEVIDEO",
  PAYSANDU: "PAYSANDU",
  RIO_NEGRO: "RIO_NEGRO",
  RIVERA: "RIVERA",
  ROCHA: "ROCHA",
  SALTO: "SALTO",
  SAN_JOSE: "SAN_JOSE",
  SORIANO: "SORIANO",
  TACUAREMBO: "TACUAREMBO",
  TREINTA_Y_TRES: "TREINTA_Y_TRES",
} as const;

export type Department = (typeof DEPARTMENT)[keyof typeof DEPARTMENT];

/** How an order is delivered to the client. */
export const DELIVERY_TYPE = {
  CADETERIA: "CADETERIA",
  AGENCIA: "AGENCIA",
  DOMICILIO: "DOMICILIO",
} as const;

export type DeliveryType = (typeof DELIVERY_TYPE)[keyof typeof DELIVERY_TYPE];

/** Inclusive [min, max] filter range; null means "no limit" on that side. */
export type NumberRange = [number | null, number | null];

/** A ctradehing trade is either sold (to a seller) or purchased (from a client). */
export const TRADE_TYPE = {
  SALE: "SALE",
  PURCHASE: "PURCHASE",
} as const;

export type TradeType = (typeof TRADE_TYPE)[keyof typeof TRADE_TYPE];

/** PUBLISHED/SOLD belong to sales; PENDING/PURCHASED to purchases. */
export const TRADE_STATUS = {
  PUBLISHED: "PUBLISHED",
  SOLD: "SOLD",
  PENDING: "PENDING",
  PURCHASED: "PURCHASED",
} as const;

export type TradeStatus = (typeof TRADE_STATUS)[keyof typeof TRADE_STATUS];
