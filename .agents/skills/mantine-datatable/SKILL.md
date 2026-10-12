---
name: mantine-datatable
description:
  Mantine DataTable component for data-rich tables. Use when building
  data tables with pagination, sorting, selection, or async data loading.
  Triggers on tasks involving tables, data grids, list views, or tabular
  data display.
license: MIT
metadata:
  author: icflorescu
  version: '9.4.0'
---

# Mantine DataTable

Lightweight, dependency-free table component for Mantine applications with
dark-mode support, pagination, sorting, row selection, and async data loading.

Documentation: https://icflorescu.github.io/mantine-datatable/

## When to Apply

Reference these guidelines when:

- Building data tables with pagination
- Displaying lists of records from API responses
- Implementing sortable or filterable tables
- Creating selectable row tables (checkbox/radio)
- Showing loading states for async data
- Building master-detail views

## Basic Usage

Always import from `@/libs/ui/table` (the project wrapper), never directly from `mantine-datatable`.

```tsx
import { DataTable } from '@/libs/ui/table';

<DataTable
  records={data}
  columns={[
    { accessor: 'name', title: 'Name' },
    { accessor: 'email', title: 'Email' },
  ]}
/>
```

### Project DataTable Wrapper (`@/libs/ui/table`)

The wrapper provides project-wide defaults so consumers only pass data-specific props:

| Default | Value |
|---------|-------|
| `borderRadius` | `"sm"` |
| `withTableBorder` | `false` |
| `withColumnBorders` | `false` |
| `rowBorderColor` | `"transparent"` |
| `paginationSize` | `"md"` |
| `getPaginationItemProps` | `{ radius: "sm" }` |
| `rowStyle` | `{ minHeight: 45 }` |
| `recordsPerPageOptions` | `[10, 15, 20]` |
| `styles.header` | primary-9 bg, 60px height, white text |
| `styles.table.tableLayout` | `"fixed"` (columns don't resize on data change) |
| `styles.pagination.borderTop` | `"none"` (no divider) |
| Filter button | `background: transparent`, icons 18px |
| Sort icons | 18px |

**Column widths**: The wrapper applies `table-layout: fixed`. All columns MUST have explicit `width` (number = px) or they will collapse. Use fixed pixel values so columns don't compress on small screens — horizontal scrolling kicks in instead.

Override any default at the usage site:
```tsx
<DataTable withTableBorder={true} paginationSize="lg" />
```

## Column Definition

Columns use `DataTableColumn<T>`:

```ts
import type { DataTableColumn } from '@/libs/ui/table';

const columns: DataTableColumn<User>[] = [
  {
    accessor: 'id',           // required: key from record
    title: 'ID',              // column header text
    width: 100,               // fixed width (number or string)
    textAlign: 'right',       // 'left' | 'center' | 'right'
    sortable: true,           // enable sorting
    render: (record) => ...,  // custom cell renderer
  },
];
```

## Pagination

Built-in pagination — no external components needed:

```tsx
<DataTable
  records={records}
  columns={columns}
  totalRecords={totalElements}   // total count from API
  page={currentPage}             // 1-indexed
  onPageChange={setPage}
  recordsPerPage={pageSize}
  onRecordsPerPageChange={setPageSize}
  recordsPerPageOptions={[10, 20, 50]}
/>
```

## Loading & Empty States

```tsx
<DataTable
  fetching={isLoading}
  noRecordsText="No results found"
  noRecordsIcon={null}           // hide icon
  loadingText="Loading..."
  minHeight={200}                // min height when empty
/>
```

## Common Props

| Prop | Type | Description |
|------|------|-------------|
| `records` | `T[]` | Array of data records |
| `columns` | `DataTableColumn<T>[]` | Column definitions |
| `totalRecords` | `number` | Total records for pagination |
| `page` | `number` | Current page (1-indexed) |
| `onPageChange` | `(page: number) => void` | Page change callback |
| `recordsPerPage` | `number` | Items per page |
| `recordsPerPageOptions` | `number[]` | Page size selector options |
| `fetching` | `boolean` | Show loading overlay |
| `noRecordsText` | `string` | Empty state text |
| `height` | `string \| number` | Fixed table height |
| `striped` | `boolean` | Alternating row colors |
| `highlightOnHover` | `boolean` | Row hover highlight |
| `withTableBorder` | `boolean` | Table border |
| `withColumnBorders` | `boolean` | Column borders |
| `paginationSize` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | Pagination controls size |
| `rowBorderColor` | `MantineColor \| "transparent"` | Row border color |

## Column Rendering

```tsx
<DataTable
  columns={[
    {
      accessor: 'status',
      title: 'Status',
      render: ({ status }) => (
        <Badge color={status === 'active' ? 'green' : 'red'}>
          {status}
        </Badge>
      ),
    },
    {
      accessor: 'date',
      title: 'Date',
      textAlign: 'right',
      render: ({ date }) => dayjs(date).format('MMM D YYYY'),
    },
  ]}
/>
```

## With TanStack Query

```tsx
import { DataTable } from '@/libs/ui/table';
import { usePaginate } from '@/modules/common/hooks';
import { useUsersQuery } from '@/DAL';

export const UsersTable = () => {
  const { page, limit, setPage, changeLimit } = usePaginate();
  const { data, isLoading } = useUsersQuery({ page: page - 1, size: limit });

  return (
    <DataTable
      records={data?.data?.content ?? []}
      columns={columns}
      totalRecords={data?.data?.totalElements}
      page={page}
      onPageChange={setPage}
      recordsPerPage={limit}
      onRecordsPerPageChange={changeLimit}
      fetching={isLoading}
    />
  );
};
```

## Column Filtering

Per-column filter popovers via `filter` and `filtering`:

```tsx
<DataTable
  records={filteredRecords}
  columns={[
    {
      accessor: 'name',
      filter: (
        <TextInput
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      ),
      filtering: query !== '',
    },
    {
      accessor: 'department',
      filter: ({ close }) => (
        <MultiSelect
          data={departments}
          value={selected}
          onChange={setSelected}
          comboboxProps={{ withinPortal: false }}
          clearable
        />
      ),
      filtering: selected.length > 0,
    },
  ]}
/>
```

- `filter` renders in a popover — use `comboboxProps={{ withinPortal: false }}` for nested popovers
- `filtering: boolean` shows active indicator on column header
- Library does NOT filter records — you filter `records` before passing to DataTable
- For server-side filtering, use Zustand store + API params (not this)

## Key Differences from BasicTable

| BasicTable (old) | DataTable (mantine-datatable) |
|------------------|-------------------------------|
| `accessorKey` | `accessor` |
| `header` | `title` |
| `meta.cellWidth` | `width` |
| `data` | `records` |
| `pages` + `currentPage` | `totalRecords` + `page` |
| `itemsPerPage` | `recordsPerPage` |
| `isLoading` | `fetching` |
| Manual pagination component | Built-in pagination |

## References

- https://icflorescu.github.io/mantine-datatable/
- https://icflorescu.github.io/mantine-datatable/getting-started/
- https://icflorescu.github.io/mantine-datatable/examples/basic-usage/
- https://icflorescu.github.io/mantine-datatable/examples/pagination/
- https://icflorescu.github.io/mantine-datatable/type-definitions/
- https://icflorescu.github.io/mantine-datatable/examples/searching-and-filtering/
