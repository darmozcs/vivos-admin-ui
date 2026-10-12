import type { DataTableProps } from "mantine-datatable";
import { DataTable as MantineDataTable } from "mantine-datatable";
import "./DataTable.css";

const HEADER_STYLES = {
  backgroundColor: "var(--mantine-color-plum-9)",
  height: 60,
  color: "white",
};

const ROW_MIN_HEIGHT = { minHeight: 45 };

const PAGINATION_STYLES = {
  borderTop: "none",
};

const TABLE_STYLES = {
  tableLayout: "fixed" as const,
};

const PAGINATION_ITEM_PROPS = { radius: "sm" as const };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>;

/**
 * Props accepted by the project DataTable wrapper.
 * Makes default-provided props optional so consumers don't have to pass them.
 */
type WrapperProps<T> = Omit<DataTableProps<T>, "withTableBorder"> & {
  withTableBorder?: boolean;
};

/**
 * Wrapper around Mantine DataTable with project-wide defaults.
 *
 * Built-in defaults (applied automatically, overridable):
 * - `borderRadius` → `"sm"`
 * - `withTableBorder` → `false`
 * - `withColumnBorders` → `false`
 * - `rowBorderColor` → `"transparent"`
 * - `paginationSize` → `"md"`
 * - `getPaginationItemProps` → `{ radius: "sm" }`
 * - `rowStyle` → `{ minHeight: 45 }`
 * - `recordsPerPageOptions` → `[10, 15, 20]`
 * - `styles.header` → plum-9 bg, 60px, white text
 * - `styles.pagination.borderTop` → `"none"` (no divider)
 *
 * Override any default:
 * ```tsx
 * <DataTable withTableBorder={true} paginationSize="lg" />
 * ```
 */
export function DataTable<T extends object>(props: WrapperProps<T>) {
  const p = props as AnyProps;

  const mergedRowStyle = p.rowStyle
    ? (record: T, index: number) => ({
        ...ROW_MIN_HEIGHT,
        ...p.rowStyle?.(record, index),
      })
    : () => ROW_MIN_HEIGHT;

  const mergedGetPaginationItemProps = p.getPaginationItemProps
    ? (page: number) => ({
        ...PAGINATION_ITEM_PROPS,
        ...p.getPaginationItemProps?.(page),
      })
    : undefined;

  const mergedStyles = {
    ...p.styles,
    header: {
      ...p.styles?.header,
      ...HEADER_STYLES,
    },
    pagination: {
      ...p.styles?.pagination,
      ...PAGINATION_STYLES,
    },
    table: {
      ...p.styles?.table,
      ...TABLE_STYLES,
    },
  };

  const merged: AnyProps = {
    ...p,
    withTableBorder: p.withTableBorder ?? false,
    withColumnBorders: p.withColumnBorders ?? false,
    borderRadius: p.borderRadius ?? "sm",
    rowBorderColor: p.rowBorderColor ?? "transparent",
    paginationSize: p.paginationSize ?? "md",
    recordsPerPageOptions: p.recordsPerPageOptions ?? [10, 15, 20],
    getPaginationItemProps: mergedGetPaginationItemProps,
    rowStyle: mergedRowStyle,
    styles: mergedStyles,
  };

  return <MantineDataTable {...(merged as DataTableProps<T>)} />;
}
