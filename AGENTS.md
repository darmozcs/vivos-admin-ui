before write anything, read the full content of ./.agents folder

## Architecture

- **React 19** The project uses React 19 with TanStack Router, internationalized with react-i18next and i18next. Always guide yourself by the documentation.
  - **Domain based modules** The project divides the source code by domains: `common` groups all the shared features of the project. There are also infrastructure modules: `auth` for authentication, `layouts` for the application shell, and `providers` for the global providers.
  - **Design system** The project uses Mantine dev as the component library, with a custom theme located in `./src/theme.ts`. If you need to add a new variant of a component, add it preferably in that file.
  - **Forms** Use React Hook Form + Yup (`react-hook-form`, `@hookform/resolvers`). Define schemas in the module folder, not inline in components.
  - **UI** is Mantine dev. Use Mantine components for interactive elements (inputs, dialogs, buttons). If the component is a basic Mantine component (e.g., Button), do not create custom sx styles; look into `./src/theme.ts` and use the defined variants and colors. If you cannot resolve a previously defined component or variant, ask about your thinking before implementing a custom component. Always use Mantine defined components in order to compose and create a complex one.
  - **Container pattern** The container pattern is used, in which basic components are stateless and, in turn, are composed into container components (`.container.tsx`) that handle the component's logic. Each domain must only have imports from its own domain or from common. If something is common to more than one domain, it must be refactored and placed in common.
  - **Data fetching** Uses TanStack Query (React Query) All queries and mutations live in `./src/DAL/` organized by domain.
  - **Mocking** Uses MSW (Mock Service Worker) for API mocking in development, configurable via `VITE_ENABLE_MOCKS` env var.

## Explanation of Folders

- **./public/locales** This folder contains the translation files organized by language (`EN`, `ES`) and by namespace (e.g. `common.json`). These files house the translations used throughout the application.
- **./src/models** This folder contains the files that hold the interfaces of the different entities reflected in the DB and used throughout the platform. ONLY ENTITY INTERFACES.
- **./src/pages** This folder contains the files that represent the pages, which are then rendered in the `page.tsx` components of each route. As a convention, they must be named as `[PageName].page.tsx`.
- **./src/DAL** This is the data access layer. The hooks responsible for the system's HTTP calls must live in this layer, organized by domain (`./src/DAL/[domain name]/`). Shared constants (cache keys, API paths) live in `./src/DAL/const/`.
- **./src/config** This folder houses the validated environment variables and their yup schema (`config.ts`, `env.schema.ts`). All env vars must be accessed exclusively through `@/config`.
- **./src/libs** This folder contains cross-cutting utilities (e.g., `./src/libs/http/` for the axios client instance).
- **./src/types** This folder houses the types, enums, and interfaces used throughout the platform, except for those representing entities.
- **./src/store** The global states of the application must be located in this folder. For this purpose, only zustand must be used.
- **./src/DAL/[domain name]** This folder includes the hooks for data fetching and mutation of the application, separated by modules.
- **./src/DAL/const** This folder includes the definitions of constants that will be used in the DAL.
- **./src/modules/[domain name]** This folder includes the distinct folders that group the code of the different domains, which are `common`, plus the infrastructure modules `auth`, `layouts`, and `providers`. Inside each of these folders are the different folders that group code by functionality and file type. All follow this subfolder pattern: `[domain name]/-/components/` `-/containers/` `-/hooks/` `-/const/` `-/schemas/`, where:
- **[ ./src/modules/[domain name]/components/ ]** Groups the stateless components associated with that domain. Each component lives inside its containing folder and is exported in the barrel file of the components folder. Components inside this folder cannot have associated logic; they must be completely stateless components that, if they need actions, must expose an interface so that the container handles that logic.
- **[ ./src/modules/[domain name]/containers/ ]** Groups the stateful containers associated with that domain. They always follow the naming convention `[ContainerName].container.tsx`. These components are responsible for integrating other stateless components and providing them with functionality or logic through the props the stateless components receive. They can never integrate other containers. They can never import stateless components or hooks from other domains, except from common. If it needs to import something already defined in another domain, it must be refactored so that the file lives in common.
- **[ ./src/modules/[domain name]/const/ ]** Groups the files that include constants to be used within the module. They follow the convention `[fileName].const.ts`. Inside them, all variables to be defined must be in UPPER_SNAKE_CASE.
- **[ ./src/modules/[domain name]/hooks/ ]** Groups the hooks to be used within the module.
- **[ ./src/modules/[domain name]/schemas/ ]** Groups the yup schemas to be used within the module. This is the only place where schemas for form validations can be saved. Files must follow the naming convention `[schemaName].schema.ts`.

## Definitions of Modules

- Common: Common features across the platform.
- Auth: Authentication and authorization features.
- Layouts: Application shell and layout components.
- Providers: Global providers wrapping the application.

## Conventions

- Important, always follow the conventions!
- Always use async/await when required.
- Always use import/export.
- Components or containers must not be extensive (no more than 100 lines) nor redundant. The composition principle must be followed, whereby a large component is split into small components that are composed together.
- Always use the components defined in Mantine instead of creating new components or using HTML tags.
- Always follow the styles defined in the theme.
- All texts used within the application must be internationalized.
- Components must follow this structure.
- All created components and containers must consider responsive design and adapt their dimensions for each breakpoint.
- Never use magic strings. If strings are needed to manage states, etc., they must be extracted into constant files (`.const.ts`).
- Logic must never live in containers. If logic is needed, it must live in its associated hook.
- Do not call `fetch` directly in components — use TanStack Query hooks.
- Do not add client-side only workarounds for data that should come from the server.
- Do not create monolithic page components; break them into module pieces.
- In the DAL, the hooks for data fetching and mutation must follow this convention: if it is a data fetching hook, it must be named `[useActionItDoes].query.ts`; if it is a data mutation hook, it must be named `[useActionItDoes].mutation.ts`.
- Data fetching or mutation must live exclusively in the DAL; no HTTP calls should be made outside of it.
- TanStack React Query will always be used for data fetching or mutation.
- Never use magic strings for cache keys of calls; always add the key to be used in the file `./src/DAL/const/key.const.ts`.
- Definitions of key constants must follow this convention:

```ts
// Example data
export const VEHICLE_DETAIL = "VEHICLE_DETAIL"; // If it is a detail (a call that includes a unique identifier for a resource)
export const VEHICLE_LIST = "VEHICLE_LIST"; // If it is a listing
```

````
- Definitions of backend service paths must reside in `./src/DAL/const/apiPaths.const.ts`, following this structure:

```ts
export const BASE_PATH = "/api/v1";
export const USER_PATH = BASE_PATH + "/user"; // In case it has no parameters
export const USER_DETAIL_PATH = ({ id }: User["id"]) => `${USER_PATH}/${id}`; // In case it has parameters

````

- Components must follow this structure:

```ts
      interface ComponentNameProps {} // In case props are needed
      interface ComponentNameProps extends ComponentProps {} // In case props are needed and the parent component needs to pass props from outside

      export const ComponentName = ({prop1, prop2, ...rest}:ComponentNameProps) => {
          return(
              <Component {...rest}>{...rest of the component}</Component>
          )
      }

```

- Containers must follow this structure:

```ts
    interface ComponentNameContainerProps {} // In case props are needed
    interface ComponentNameContainerProps extends ComponentProps {} // In case props are needed and the parent component needs to pass props from outside
    // The name must end with the word Container
    export const ComponentNameContainer = ({prop1, prop2, ...rest}:ComponentNameContainerProps) => {
      // The logic must live in a hook useComponentNameContainer and be used here
        return(
            <ComponentContainer {...rest}>{...rest of the component}</ComponentContainer>
        )
    }

```

````
  - Hooks must follow this structure:

  ```ts
    interface HookNameProps {} // In case props are needed
    export const useHookName = ({...}:HookNameProps) => {
        ...Body of the hook
        return {}
    }

````

- Pages must follow this structure:

```ts
  interface PageNameProps {} // Receives the props from page.tsx, route parameters, etc.
  export const PageName = ({...}:PageNameProps) => {
      // Can contain logic
      // Can integrate things from any domain
      return(
          <Body of the page>
      )
  }

```

- The `.const.ts` files must follow this structure:

```ts
// Every value here is an example
    export const MIN_AMOUNT = 1
    export const COLORS_BY_STATUS = {
        ACTIVE: "#0fFF23",
        INACTIVE: "ff0000"
    } as const
    export enum DEFAULT_VALUES {...}

```

# Agent Instructions

Before performing any task:

1. Read this file.
2. Load any relevant skill from `.ai/skills`.
3. Follow the skill instructions unless they conflict with this document.

## Available Skills

- .ai/skills/clean-code/SKILL.md
- .ai/skills/code-reviewer/SKILL.md
- .ai/skills/frontend-design/SKILL.md
- .ai/skills/hook-development/SKILL.md
- .ai/skills/react-best-practices/SKILL.md
- .ai/skills/senior-qa/SKILL.md
- .ai/skills/typescript-expert/SKILL.md

## How to Create a Component

- Analyze which domain the component belongs to.
- Create the component inside `./src/modules/[domain name]/components/[componentName]/ComponentName.tsx`.
- If the component needs to be split into several components, include them inside the folder `./src/modules/[domain name]/components/[componentName]`.
- Export the component in the barrel file of `./src/modules/[domain name]/components`.
- If the component renders text, it must be internationalized.
- If the component is longer than 150 lines of code, it must be split into smaller components.

## How to Create a Container

- Analyze which domain the container belongs to.
- Create the container inside `./src/modules/[domain name]/containers/[containerName]/ContainerName.container.tsx`.
- If the container needs to be split into several components, include them inside the folder `./src/modules/[domain name]/components/[containerName]`.
- Create the associated hook inside `./src/modules/[domain name]/hooks/[containerName]/useContainerName.ts`.
- Export the component in the barrel file of `./src/modules/[domain name]/containers`.
- Export the hook in the barrel file of `./src/modules/[domain name]/hooks`.
- If the component renders text, it must be internationalized.

## How to Create a Page

- When a new route is created, define the structure of the route. In the folder `./src/pages/`, analyze if a page belonging to that route already exists; if not, create a new page in that location. Inside pages, you can import from any domain and add logic.
- When you have that file, it must be imported into the `page.tsx` file of the router.
- All routes created within the router must have defined and internationalized Metadata. All metadata must be internationalized; at least the `title` and `description` of the page must be guaranteed. Metadatas must be defined following how TanStack Router handles them.

## How to Create a Context

- Create the context inside `./src/modules/[domain name]/contexts/[contextName].context.tsx`.
- The provider, the context, and the access hook must live in the same file, following this structure:

```tsx
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useMasterFilters } from "@/modules/common/hooks";
import type { MasterFilters, Pagination } from "@/types";

interface MasterFiltersContextValue {
  filters: MasterFilters;
  pagination: Pagination;
  setFilter: <TKey extends keyof MasterFilters>(
    key: TKey,
    value: MasterFilters[TKey],
  ) => void;
  setPagination: <TKey extends keyof Pagination>(
    key: TKey,
    value: Pagination[TKey],
  ) => void;
  resetFilters: () => void;
}

const FILTERS_INITIAL: MasterFilters = {
  search: "",
  status: undefined,
  state: undefined,
};

const MasterFiltersContext = createContext<
  MasterFiltersContextValue | undefined
>(undefined);

export const MasterFiltersProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { filters, pagination, setFilter, setPagination, resetFilters } =
    useMasterFilters<MasterFilters>(FILTERS_INITIAL);

  return (
    <MasterFiltersContext.Provider
      value={{
        filters,
        pagination,
        setFilter,
        setPagination,
        resetFilters,
      }}
    >
      {children}
    </MasterFiltersContext.Provider>
  );
};

export const useMasterFiltersContext = () => {
  const context = useContext(MasterFiltersContext);

  if (!context) {
    throw new Error(
      "useMasterFiltersContext must be used within MasterFiltersProvider",
    );
  }

  return context;
};
```

- Default values must be defined as constants next to the context (e.g. `FILTERS_INITIAL`).
- The provider must delegate its logic to a hook of the module (`./src/modules/[domain name]/hooks/`) instead of implementing it inline.
- The access hook must be named `use[Xxx]Context` and must throw an error when used outside the provider.
- Export the file in the barrel of `./src/modules/[domain name]/contexts`.

## How to Use Modals

- The project uses `@mantine/modals` (modals manager). `ModalsProvider` is already configured in `./src/modules/providers/containers/AppProviders.tsx` inside `MantineProvider` and `I18nextProvider`.
- Default confirm labels (`confirm`/`cancel`) and shared `modalProps` (currently `centered: true`) are defined on the provider, internationalized via `common:modals.labels.confirm` and `common:modals.labels.cancel`. Do not duplicate labels in each call; only override them when the action context requires it.
- Use `modals.open` for content modals, `modals.openConfirmModal` for confirmations, and `modals.openContextModal` for modals registered in the provider.
- All texts inside modals (titles, children, buttons) must be internationalized.

## How to Create a Data Access or Modification Hook

- When you want to access data coming from backend services, hooks must be created in the DAL.
- You must define the domain to which the hook would belong.
- You must check if a hook that does what you intend doesn't already exist within the DAL, in the folder of that domain.
- If there is one, use it without rewriting it; if it doesn't exist, create it.
- You must keep in mind the naming convention for the DAL.
- You will not use magic strings for the API route. Instead, you will check in `./src/DAL/const/apiPaths.const.ts` if the route you intend to call already exists. If it exists, use it; if not, add it and use it.

## DAL service example

```ts
import { EXAMPLE_PATH } from "@/DAL/const";
import type { ExampleEntity } from "@/models";
import type { AxiosResponse } from "axios";
import { httpClient } from "@/libs";

export const getExampleService = async (): Promise<AxiosResponse<ExampleEntity[]>> =>
  await httpClient.get(EXAMPLE_PATH);
```

## DAL query example

```ts
import { EXAMPLE_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getExampleService } from "../services";

export const useGetExamples = () => {
  return useApiQuery({
    queryKey: [EXAMPLE_LIST],
    queryFn: async () => await getExampleService(),
  });
};
```

## DAL mutation example

```ts
import { EXAMPLE_PATH } from "@/DAL/const";
import type { ExampleEntity } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/libs";

interface ExamplePayload {
  name: string;
}

const createExampleService = async (payload: ExamplePayload): Promise<ExampleEntity> => {
  const { data } = await httpClient.post<ExampleEntity>(EXAMPLE_PATH, payload);
  return data;
};

export const useCreateExampleMutation = () =>
  useMutation({
    mutationFn: createExampleService,
  });
```

## Table container example

```ts
import { useExampleQuery } from '@/DAL'
import { DataTable } from '@/libs/ui/table'
import { useTranslation } from 'react-i18next'
import { getExampleTableColumns } from '../const/exampleTableColumns.const'

export const ExampleTableContainer = () => {
  const { t } = useTranslation('example')
  const columns = getExampleTableColumns(t)

  const { data, isLoading } = useExampleQuery()

  const records = data?.data?.content ?? []
  const totalElements = data?.data?.totalElements ?? 0

  return (
    <DataTable
      records={records}
      columns={columns}
      totalRecords={totalElements}
      page={page}
      onPageChange={setPage}
      recordsPerPage={limit}
      onRecordsPerPageChange={setLimit}
      fetching={isLoading}
    />
  )
}
```

## Table config example

Column definitions must be a **function that receives `t`** so titles are internationalized. All columns must have explicit `width` (px). The wrapper uses `table-layout: fixed` — fixed pixel widths prevent column compression and enable horizontal scroll on overflow.

```ts
import type { TFunction } from 'i18next'
import type { DataTableColumn } from '@/libs/ui/table'

export const getExampleTableColumns = (
  t: TFunction,
): DataTableColumn<ExampleEntity>[] => [
  {
    accessor: 'id',
    title: t('columns.id', 'ID'),
    width: 80,
  },
  {
    accessor: 'name',
    title: t('columns.name', 'Name'),
    width: 300,
  },
  {
    accessor: 'status',
    title: t('columns.status', 'Status'),
    width: 150,
  },
  {
    accessor: 'createdAt',
    title: t('columns.createdAt', 'Created'),
    width: 180,
  },
]
```

## DataTable wrapper defaults

The wrapper at `./src/libs/ui/table/DataTable.tsx` applies project-wide defaults. Do **not** re-declare these at usage sites:

| Prop | Default |
|---|---|
| `withTableBorder` | `false` |
| `withColumnBorders` | `false` |
| `borderRadius` | `"sm"` |
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

## Column filtering (client-side)

Mantine DataTable supports per-column filter popovers via `filter` and `filtering`:

- `filter` — React node rendered in a popover below the column header. Can be a function `({ close }) => ReactNode` to access the close action.
- `filtering` — `boolean` that shows a visual indicator when the filter is active.

The library does NOT filter records for you — you filter the `records` array in your component.

```tsx
import { TextInput } from '@mantine/core';
import { useState } from 'react';

const [query, setQuery] = useState('');

const columns = [
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
];

// Filter records before passing to DataTable
const filtered = records.filter((r) =>
  r.name.toLowerCase().includes(query.toLowerCase())
);

<DataTable records={filtered} columns={columns} />
```

> **Note:** For server-side filtering (our standard pattern), use a Zustand store with `getQueryParams()` and pass filters as API params. Column filters are for small, client-side datasets.
