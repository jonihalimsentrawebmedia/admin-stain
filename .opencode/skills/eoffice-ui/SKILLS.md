# E-Office Module — OpenCode Skill

Load this skill when working on the **E-Office (e-office)** module under `src/pages/modules/E-Office/` and `src/router/E-Office/router.tsx`.

---

## 1. Module Overview

E-Office is a full-featured office automation admin panel with:
- **Inbox/Outbox letter management** (registrasi surat masuk & keluar)
- **Disposition & copy-letter** tracking
- **Agenda** management for letters
- **Reference data** (letter nature, type, origin, classification, reminder agenda, purpose type/guest)
- **Guestbook** (buku tamu) with questionnaire (quantitative & qualitative)
- **Event & activity** management with attendance, documentation, expenditure, meeting minutes
- **Service type** master data
- **Settings** (notification recipients, letter header / kop surat)
- **Dashboard** with charts, quick access, and recent inbox list
- **Session** selection (choose university unit before accessing)

---

## 2. Project Structure (Complete File Tree)

```
src/pages/modules/E-Office/
├── agenda/
│   ├── inbox/
│   │   ├── data/
│   │   │   ├── columns.tsx
│   │   │   └── types.ts
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   └── outbox/
│       ├── data/
│       │   └── columns.tsx
│       ├── hooks/
│       │   └── index.tsx
│       └── index.tsx
│
├── component/
│   ├── common/
│   │   ├── captureWebCam/
│   │   │   └── index.tsx
│   │   ├── inputColorPicker.tsx
│   │   ├── selectUser.tsx
│   │   └── tableRecursif.tsx
│   └── layout/
│       ├── index.tsx          (MainLayoutEOffice)
│       ├── menu.tsx           (GenerateMenu — sidebar menu definitions)
│       ├── sideNav.tsx        (SideNavEOffice — sidebar component)
│       └── theme.tsx          (EOfficeThema — theme color provider)
│
├── dashboard/
│   ├── component/
│   │   └── inboxChart.tsx
│   ├── data/
│   │   ├── columns.tsx
│   │   └── types.ts
│   ├── hooks/
│   │   └── index.tsx
│   └── index.tsx
│
├── event-activity/
│   ├── event-data/
│   │   ├── component/
│   │   │   ├── buttonAdd.tsx
│   │   │   ├── buttonDelete.tsx
│   │   │   ├── buttonEdit.tsx
│   │   │   └── form.tsx
│   │   ├── data/
│   │   │   ├── columns.tsx
│   │   │   ├── resolver.tsx
│   │   │   └── types.ts
│   │   ├── detail/
│   │   │   ├── component/
│   │   │   │   ├── documentation/ (buttonAdd, buttonDelete, buttonEdit, hooks, index, resolver)
│   │   │   │   ├── expenditure/   (buttonAdd, buttonDelete, buttonEdit, columns, form, hooks, index, resolver)
│   │   │   │   ├── file-support/  (buttonAdd, buttonDelete, buttonEdit, columns, hooks, resolver, sectionFile)
│   │   │   │   ├── list-attandaces/
│   │   │   │   │   ├── component/ (buttonAdd, buttonDelete, buttonEdit, columns, form, hooks, resolver)
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── meeting-minutes/ (buttonAdd, buttonDelete, buttonEdit, columns, hooks, index)
│   │   │   │   ├── menu-event/
│   │   │   │   │   └── index.tsx
│   │   │   │   └── report-activity/ (hooks, index)
│   │   │   └── index.tsx
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   │   └── printAttendance/
│   │       └── index.tsx
│   └── report/
│       ├── data/
│       │   ├── columns.tsx
│       │   └── types.ts
│       ├── hooks/
│       │   └── index.tsx
│       └── index.tsx
│
├── gustbook/              (NOTE: typo in directory name, should be guestbook)
│   ├── compnent/           (NOTE: typo, should be component)
│   │   ├── buttonDelete.tsx
│   │   └── form.tsx
│   ├── create/
│   │   └── index.tsx
│   ├── data/
│   │   ├── columns.tsx
│   │   ├── resolver.tsx
│   │   └── types.ts
│   ├── hooks/
│   │   └── index.tsx
│   ├── index.tsx
│   └── Updated/
│       └── index.tsx
│
├── inbox/
│   ├── copy-letter/
│   │   ├── data/
│   │   │   ├── columns.tsx
│   │   │   └── types.ts
│   │   ├── detail/
│   │   │   └── index.tsx
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── disposition/
│   │   ├── compnent/       (NOTE: typo, should be component)
│   │   │   ├── buttonResponse.tsx
│   │   │   └── chartNature.tsx
│   │   ├── data/
│   │   │   ├── columns.tsx
│   │   │   └── types.ts
│   │   ├── detail/
│   │   │   └── index.tsx
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── list-inbox/
│   │   ├── component/
│   │   │   └── buttonDelete.tsx
│   │   ├── data/
│   │   │   ├── columns.tsx
│   │   │   └── types.ts
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   └── registration-inbox/
│       ├── component/
│       │   └── form.tsx
│       ├── data/
│       │   ├── resolver.tsx
│       │   └── types.ts
│       ├── detail/
│       │   ├── comment/
│       │   │   ├── component/
│       │   │   │   └── buttonComment.tsx
│       │   │   ├── data/
│       │   │   │   └── types.ts
│       │   │   └── hooks/
│       │   │       └── index.tsx
│       │   ├── disposisi/
│       │   │   └── component/
│       │   │       └── buttonShow.tsx
│       │   └── index.tsx
│       ├── edit/
│       │   └── index.tsx
│       ├── hooks/
│       │   └── index.tsx
│       └── index.tsx
│
├── outbox/
│   ├── list-outbox/
│   │   ├── component/
│   │   │   └── buttonDelete.tsx
│   │   ├── data/
│   │   │   ├── columns.tsx
│   │   │   └── types.ts
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   └── registration-outbox/
│       ├── component/
│       │   └── form.tsx
│       ├── data/
│       │   ├── resolver.tsx
│       │   └── types.ts
│       ├── detail/
│       │   └── index.tsx
│       ├── edit/
│       │   └── index.tsx
│       ├── hooks/
│       │   └── index.tsx
│       └── index.tsx
│
├── questionnaire/
│   ├── component/
│   │   └── buttonDelete.tsx
│   ├── data/
│   │   ├── columns.tsx
│   │   └── types.ts
│   ├── detail/
│   │   ├── culumns.tsx     (NOTE: typo, should be columns.tsx)
│   │   └── index.tsx
│   ├── hooks/
│   │   └── index.tsx
│   ├── index.tsx
│   ├── qualitative/
│   │   ├── component/
│   │   │   ├── addQuestion.tsx
│   │   │   ├── buttonDelete.tsx
│   │   │   ├── columns.tsx
│   │   │   ├── editQuestion.tsx
│   │   │   └── form.tsx
│   │   ├── data/
│   │   │   └── resolver.tsx
│   │   ├── index.tsx
│   │   └── updated/
│   │       └── index.tsx
│   └── quantitative/
│       ├── component/
│       │   ├── addQuestion.tsx
│       │   ├── buttonDelete.tsx
│       │   ├── columns.tsx
│       │   ├── editQuestion.tsx
│       │   └── form.tsx
│       ├── data/
│       │   └── resolver.tsx
│       ├── index.tsx
│       └── updated/
│           └── index.tsx
│
├── reference/
│   ├── human-resource/
│   │   └── hooks.tsx
│   ├── letter-classification/
│   │   ├── component/ (buttonAdd, buttonDelete, buttonEdit, form)
│   │   ├── data/ (columns, resolver, types)
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── letter-nature/
│   │   ├── component/ (buttonAdd, buttonDelete, buttonEdit, form)
│   │   ├── data/ (columns, resolver, types)
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── letter-origin/
│   │   ├── component/ (buttonAdd, buttonDelete, buttonEdit, form)
│   │   ├── data/ (columns, resolver, types)
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── letter-type/
│   │   ├── component/ (buttonAdd, buttonDelete, buttonEdit, form)
│   │   ├── data/ (columns, resolver, types)
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── purpose-guest/
│   │   ├── component/ (buttonAdd, buttonDelete, buttonEdit)
│   │   ├── data/ (columns, types)
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── purpose-type/
│   │   ├── component/ (buttonAdd, buttonDelete, buttonEdit)
│   │   ├── data/ (columns, types)
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── reminder-agenda/
│   │   ├── component/ (buttonAdd, buttonDelete, buttonEdit, form)
│   │   ├── data/ (columns, resolver, types)
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   └── satuan-unit/
│       └── hooks.tsx
│
├── services/
│   └── type-service/
│       ├── component/ (buttonAdd, buttonDelete, buttonEdit, form)
│       ├── data/ (columns, resolver, types)
│       ├── hooks/
│       │   └── index.tsx
│       └── index.tsx
│
├── session/
│   ├── hooks.tsx
│   └── index.tsx
│
├── settings/
│   ├── accept-notification/
│   │   ├── component/ (buttonAdd, buttonDelete, buttonEdit, form)
│   │   ├── data/ (columns, resolver, types)
│   │   ├── hooks/
│   │   │   └── index.tsx
│   │   └── index.tsx
│   └── letter-header/
│       ├── data/ (pdfContentConfig.ts, resolver, types)
│       ├── hooks/
│       │   └── index.tsx
│       └── index.tsx
│
└── utils/
    ├── fontConfig.ts
    └── generateAttendancePdf.ts
```

---

## 3. Router Configuration

### File: `src/router/E-Office/router.tsx`

The router exports `E_OFFICE_ROUTE`, an array of route objects consumed by the parent router at `src/router/index.tsx`:

```tsx
// Parent router integration (in src/router/index.tsx)
{
  path: 'e-office',
  element: (
    <EOfficeThema>
      <MainLayoutEOffice />,
    </EOfficeThema>
  ),
  children: [...E_OFFICE_ROUTE],
},
```

**Route structure** (base path `/modules/e-office`):

| Group | Path | Features |
|-------|------|----------|
| `dashboard` | `dashboard/` | Beranda, user-profile, change-password |
| `inbox` | `inbox/registration-inbox/` | Create (index), detail `:id`, edit `:id` |
| | `inbox/inbox-list/` | List |
| | `inbox/inbox-disposition/` | List, detail `:id` |
| | `inbox/copy-letter/` | List, detail `:id` |
| `outbox` | `outbox/registration-outbox/` | Create (index), detail `:id`, edit `:id` |
| | `outbox/outbox-list/` | List |
| `service` | `service/service-type` | CRUD list |
| `reference` | `reference/letter-nature` | CRUD list |
| | `reference/letter-type` | CRUD list |
| | `reference/letter-origin` | CRUD list |
| | `reference/letter-classification` | CRUD list |
| | `reference/reminder-agenda` | CRUD list |
| | `reference/purpose-type` | CRUD list |
| | `reference/purpose-guest` | CRUD list |
| `agenda` | `agenda/inbox` | List |
| | `agenda/outbox` | List |
| `settings` | `settings/accept-notification` | CRUD list |
| | `settings/letter-header` | CRUD list |
| `guestbook` | `guestbook/guestbook-list/` | List, add, edit `:id` |
| | `guestbook/questionnaire/` | List, quantitative/ (add, edit `:id`, detail `:id`), qualitative/ (add, edit `:id`, detail `:id`) |
| `event-activity` | `event-activity/event-data/` | List (index), detail `:id`, print `:id` |
| | `event-activity/report` | List |

### Route Imports Convention

Every route page is imported from `@/pages/modules/E-Office/...` and follows this pattern:

```tsx
// Named exports for page components
export const RegistrationInbox = () => { ... }

// Default exports for page components
const ListLetterNature = () => { ... }
export default ListLetterNature
```

**Important:** Some components use named exports, others use default exports. Check the actual export style before importing.

---

## 4. Architecture & Patterns

### 4.1 Directory Convention (per feature)

Each feature directory follows this CRUD-oriented structure:

```
feature-name/
├── component/        # UI sub-components (buttonAdd, buttonDelete, buttonEdit, form, etc.)
├── data/             # columns.tsx, resolver.tsx (Zod schema), types.ts (interfaces)
├── hooks/
│   └── index.tsx     # TanStack Query hooks for data fetching
├── detail/           # (optional) detail view with sub-components
├── edit/             # (optional) edit view
└── index.tsx         # Main page component
```

### 4.2 Data Fetching Pattern (TanStack Query)

All hooks follow a consistent pattern using `useQuery` + `useState`:

```tsx
// hooks/index.tsx
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IFeatureType } from './data/types.ts'

export const UseGetFeatureList = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}
  const [list, setList] = useState<IFeatureType[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page)
  if (limit) Params.append('limit', limit)
  if (search) Params.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['feature-key', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/endpoint?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setList(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, list, meta }
}
```

**Key points:**
- Always set `refetchOnWindowFocus: false`
- Use `loading = isLoading || isFetching`
- Destructure `data.data` and `data.meta` from the API response
- Query key includes the params string for cache invalidation
- Use `BasicProps` type from `@/utils/globalType.ts`: `{ page?: string; limit?: string; search?: string }`

### 4.3 API Endpoints Pattern

The module uses `AxiosClient` from `@/provider/axios.tsx`. All E-Office endpoints are prefixed with `/eoffice/`:

| Feature | GET | POST | PUT | DELETE |
|---------|-----|------|-----|--------|
| Letter Nature | `/eoffice/sifat-surat` | `/eoffice/sifat-surat` | `/eoffice/sifat-surat/:id` | `/eoffice/sifat-surat/:id` |
| Letter Type | `/eoffice/jenis-surat` | `/eoffice/jenis-surat` | `/eoffice/jenis-surat/:id` | `/eoffice/jenis-surat/:id` |
| Letter Origin | `/eoffice/asal-surat` | `/eoffice/asal-surat` | `/eoffice/asal-surat/:id` | `/eoffice/asal-surat/:id` |
| Letter Classification | `/eoffice/klasifikasi-surat` | ... | ... | ... |
| Reminder Agenda | `/eoffice/waktu-pengingat-agenda` | ... | ... | ... |
| Inbox (surat masuk) | `/eoffice/surat-masuk` | `/eoffice/surat-masuk` | `/eoffice/surat-masuk/:id` | `/eoffice/surat-masuk/:id` |
| Outbox (surat keluar) | `/eoffice/surat-keluar` | `/eoffice/surat-keluar` | `/eoffice/surat-keluar/:id` | `/eoffice/surat-keluar/:id` |
| Disposition | `/eoffice/disposisi` | ... | ... | ... |
| Copy Letter | `/eoffice/tembusan` | ... | ... | ... |
| Agenda Inbox | `/eoffice/agenda/surat-masuk` | ... | ... | ... |
| Agenda Outbox | `/eoffice/agenda/surat-keluar` | ... | ... | ... |
| Guestbook | `/eoffice/buku-tamu` | `/eoffice/buku-tamu` | `/eoffice/buku-tamu/:id` | `/eoffice/buku-tamu/:id` |
| Questionnaire | `/eoffice/kuisioner` | `/eoffice/kuisioner` | ... | `/eoffice/kuisioner/:id` |
| Event Activity | `/eoffice/acara` | `/eoffice/acara` | `/eoffice/acara/:id` | `/eoffice/acara/:id` |
| Service Type | `/eoffice/jenis-layanan` | `/eoffice/jenis-layanan` | ... | ... |
| HR / SDM | `/eoffice/ref/sdm` | ... | ... | ... |
| Unit / Institution | `/eoffice/ref/satuan-organisasi-children` | ... | ... | ... |
| Notification | `/eoffice/penerima-notifikasi` | ... | ... | ... |
| Letter Header | `/eoffice/kop-surat` | ... | ... | ... |
| Dashboard Counts | `/eoffice/dashboard/counts` | ... | ... | ... |
| Dashboard Inbox | `/eoffice/dashboard/list-surat-masuk` | ... | ... | ... |
| Statistic Inbox | `/eoffice/dashboard/statistik/sifat/surat-masuk` | ... | ... | ... |
| Statistic Outbox | `/eoffice/dashboard/statistik/sifat/surat-keluar` | ... | ... | ... |
| User Session | `/eoffice/user-session` | `/eoffice/user-session` | ... | ... |
| Upload | `/upload` | ... | ... | ... |
| Purpose Type | `/eoffice/ref/jenis-keperluan` | ... | ... | ... |
| Purpose Guest | `/eoffice/ref/tujuan-bertamu` | ... | ... | ... |

### 4.4 CRUD Button Pattern

**ButtonAdd** (create via dialog):
```tsx
const ButtonAddFeature = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolver>({ resolver: zodResolver(ResolverSchema) })
  const queryClient = useQueryClient()

  const HandleSave = async (value: TResolver) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/endpoint', value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['feature-key'] })
          form.reset()
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => toast.error(err.response.data.message || 'Error'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        <BiPlus /> Tambah
      </Button>
      <DialogBasic title="Tambah" open={open} setOpen={setOpen}>
        <FormFeature loading={loading} form={form} HandleSave={HandleSave} />
      </DialogBasic>
    </>
  )
}
```

**ButtonEdit** (update via dialog):
```tsx
const ButtonEditFeature = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm<TResolver>({ resolver: zodResolver(ResolverSchema) })
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) form.reset({ /* map data to form fields */ })
  }, [data])

  const HandleSave = async (value: TResolver) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/endpoint/${data.id}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['feature-key'] })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => toast.error(err.response.data.message || 'Error'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        <HiPencil />
      </button>
      <DialogBasic title="Edit" open={open} setOpen={setOpen}>
        <FormFeature loading={loading} form={form} HandleSave={HandleSave} />
      </DialogBasic>
    </>
  )
}
```

**ButtonDelete** (confirm via dialog):
```tsx
const ButtonDeleteFeature = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/endpoint/${data.id}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['feature-key'] })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => toast.error(err.response.data.message || 'Error'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600">
        <FaTrash />
      </button>
      <DialogBasic title="Hapus" open={open} setOpen={setOpen}>
        {/* Show item details */}
        <ButtonTitleGroup
          label=""
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
            { type: 'custom', element: <Button variant="destructive" onClick={HandleSave} disabled={loading}><FaTrash /> Hapus</Button> },
          ]}
        />
      </DialogBasic>
    </>
  )
}
```

### 4.5 Form Pattern (Modal Dialog)

Forms use `react-hook-form` + `zod` + shadcn `Form` component:

```tsx
// data/resolver.tsx
export const ResolverSchema = z.object({
  field1: z.string({ error: 'Field harus diisi' }),
  field2: z.number({ error: 'Field harus diisi' }),
})
export type TResolverSchema = z.infer<typeof ResolverSchema>
```

```tsx
// component/form.tsx
export const FormFeature = ({ loading, open, setOpen, form, HandleSave }) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(HandleSave)} className="flex flex-col gap-4">
      <TextInput name="field1" form={form} label="Field 1" isRequired />
      <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
    </form>
  </Form>
)
```

### 4.6 Table & Columns Pattern

Tables use `TableCustom` from `@/components/common/table/TableCustom.tsx`:

```tsx
// Page component
const [searchParams] = useSearchParams()
const page = searchParams.get('page') ?? '1'
const limit = searchParams.get('limit') ?? '10'
const search = searchParams.get('search') ?? ''

const { data, meta, loading } = UseGetFeatureList({ page, limit, search })
const columns = ColumnsFeature()

return (
  <div className="space-y-5">
    <ButtonTitleGroup label="Feature" buttonGroup={[...]} />
    <TableCustom data={data} columns={columns} meta={meta} loading={loading} />
  </div>
)
```

```tsx
// data/columns.tsx
export const ColumnsFeature = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IFeature>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => <span>{row.index + 1 + (page - 1) * limit}</span>,
    },
    { accessorKey: 'fieldName', header: 'Field' },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <ButtonEditFeature data={row.original} />
          <ButtonDeleteFeature data={row.original} />
        </div>
      ),
    },
  ]
  return columns
}
```

Key columns pattern notes:
- Column index: `row.index + 1 + (page - 1) * limit`
- Action column uses `flex justify-end w-full gap-2`
- Always read `searchParams` for page/limit at the top

### 4.7 Page Header Pattern

Every list page uses `ButtonTitleGroup`:
```tsx
<ButtonTitleGroup
  label="Page Title"
  buttonGroup={[
    // Action buttons (type: 'custom' for custom elements, 'cancel', etc.)
    { type: 'custom', element: <ButtonAddFeature /> },
  ]}
/>
```

### 4.8 Detail Page Pattern

Detail pages typically:
1. Get `id` from `useParams()`
2. Call a detail hook: `UseGetDetailFeature(id as string)`
3. Display using `Card` + `CardContent` + `TitleLine` sections
4. Include edit button navigating to `edit/:id`

---

## 5. Theme & Layout

### Theme Colors (src/pages/modules/E-Office/component/layout/theme.tsx)
```tsx
setTheme({
  primary: '#14274E',
  'primary-foreground': 'rgb(141,171,223)',
})
```
Primary color: `#14274E` (dark navy).

### Main Layout (MainLayoutEOffice)
- Uses `SideNavEOffice` for sidebar navigation
- Main content area with `Outlet`
- Sticky header with "Kembali Ke Daftar Module" link
- Footer with year

### Sidebar Menu (src/pages/modules/E-Office/component/layout/menu.tsx)
Menu tree with groups:
- Beranda (`/modules/e-office/dashboard`)
- Layanan → Jenis Layanan
- Surat Masuk → Registrasi, Daftar, Disposisi, Tembusan
- Surat Keluar → Registrasi, Daftar
- Agenda → Surat Masuk, Surat Keluar
- Referensi → 7 sub-items
- Buku Tamu → Daftar, Kuisioner
- Acara & Kegiatan → Data Acara, Laporan
- Pengaturan → Penerima Notifikasi, Kop Surat

Base domain: `/modules/e-office`

---

## 6. Common Components (src/pages/modules/E-Office/component/common)

| Component | Description | Props |
|-----------|-------------|-------|
| `selectUser.tsx` | Multi-select with search, chips, used for disposition recipient selection | `name`, `form`, `label`, `data: Option[]` |
| `inputColorPicker.tsx` | Color picker (6 preset colors), used in letter-nature forms | `value`, `onChange`, `label` |
| `captureWebCam/` | Webcam capture → upload to server → set form value | `form`, `name` |
| `tableRecursif.tsx` | Recursive table with expandable rows (for hierarchical data) | `columns`, `data` |

---

## 7. Utility Files

| File | Purpose |
|------|---------|
| `utils/fontConfig.ts` | PDF font configurations (Times New Roman, Roboto) |
| `utils/generateAttendancePdf.ts` | pdfmake-based attendance PDF generation |

---

## 8. Known Codebase Inconsistencies (Watch Out For)

1. **Typo directory names:**
   - `gustbook/` → should be `guestbook/`
   - `compnent/` (inside `gustbook/` and `inbox/disposition/`) → should be `component/`
   - `culumns.tsx` (in `questionnaire/detail/`) → should be `columns.tsx`
   - `list-attandaces/` → should be `list-attendances/`

2. **Export style varies:**
   - Some pages use `export default` (e.g., `ListLetterNature`, `DashboardEOfficePage`)
   - Others use named exports (e.g., `export const RegistrationInbox`, `export const DetailInboxRegistration`)

3. **Hook naming inconsistency:**
   - `USeGetLetterNature` (capital U, S, e)
   - `UseGetDetailInbox` (proper camelCase)
   - `UseGetSessionEOffice` (proper camelCase)

4. **Column file pattern:** Some columns files are named `culumns.tsx` (typo) instead of `columns.tsx`

5. **Dialog usage:** Some delete dialogs use `DialogBasic` with `description`, others don't.

6. **Form implementations:** Some features pass `loading`, `open`, `setOpen`, `form`, `HandleSave` as props to a Form component, while others handle everything inline.

---

## 9. New Feature Checklist

When adding a new feature to E-Office, follow these steps:

1. **Create directory structure:**
   ```
   feature-name/
   ├── component/
   │   ├── buttonAdd.tsx      # (if inline CRUD)
   │   ├── buttonEdit.tsx     # (if inline CRUD)
   │   ├── buttonDelete.tsx   # (if inline CRUD)
   │   └── form.tsx           # (if inline CRUD)
   ├── data/
   │   ├── columns.tsx        # Table column definitions
   │   ├── resolver.tsx       # Zod schema + type
   │   └── types.ts           # TypeScript interfaces
   ├── hooks/
   │   └── index.tsx          # TanStack Query hooks
   └── index.tsx              # Main page component
   ```

2. **Write Zod resolver** in `data/resolver.tsx`
3. **Write TypeScript types** in `data/types.ts`
4. **Write hooks** in `hooks/index.tsx` using the standard pattern
5. **Write columns** in `data/columns.tsx` using the standard pattern
6. **Write form component** in `component/form.tsx` (if dialog-based CRUD)
7. **Write buttonAdd/buttonEdit/buttonDelete** (if dialog-based CRUD)
8. **Write main page** in `index.tsx`
9. **Register in router** at `src/router/E-Office/router.tsx`
10. **Add to sidebar menu** in `src/pages/modules/E-Office/component/layout/menu.tsx`

---

## 10. Common Import Paths

```tsx
// Providers
import AxiosClient from '@/provider/axios.tsx'

// UI Components (shadcn)
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Form } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

// Common Components
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import SelectBasicInput from '@/components/common/form/selectBasicInput.tsx'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import UploadDocument from '@/pages/modules/website-utama/public-content/announcement/components/uploadDocument.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'

// E-Office Specific
import SelectUseRoleData from '@/pages/modules/E-Office/component/common/selectUser.tsx'
import ColorPicker from '@/pages/modules/E-Office/component/common/inputColorPicker.tsx'

// Libraries
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import { BiPlus } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { HiPencil } from 'react-icons/hi'

// Types
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
```
