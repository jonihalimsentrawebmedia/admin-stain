---
name: preview-button-pattern
description: Use when adding a Preview button (disabled when form is invalid, active when valid) to a create/edit form, with PDF preview dialog after saving via API.
---

# Preview Button Pattern — Disabled Until Form is Valid

Use this skill when adding a **Preview** button to a letter/create form that:
- Is **disabled** when the form is not fully filled (validated via Zod)
- Becomes **active** when all required fields are filled
- On click, **saves the form data via API**, generates a PDF from the response, and shows it in a dialog

## Files Modified

Two files need changes:

### 1. `index.tsx` — Page Component

**Add imports:**
```tsx
import { useRef } from 'react'
import { GenerateLetterSKAM } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKAM/pdfgenerate.ts' // adjust to your letter type
import type { ISKAMLettter } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKAM/types.ts' // adjust to your letter type
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import pdfmake from '@/utils/pdfmake.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
```

**Add state variables:**
```tsx
const [openPdfDialog, setOpenPdfDialog] = useState(false)
const [pdfUrl, setPdfUrl] = useState<string | null>(null)
const pdfUrlRef = useRef<string | null>(null)
```

**Add `mode: 'onChange'` to `useForm`** so `form.formState.isValid` updates reactively:
```tsx
const form = useForm<TResolverXXX>({
  resolver: zodResolver(ResolverXXX),
  mode: 'onChange', // ← KEY: enables real-time isValid
  defaultValues: { ... },
})
```

**Add cleanup:**
```tsx
const cleanupPdfUrl = () => {
  if (pdfUrlRef.current) {
    URL.revokeObjectURL(pdfUrlRef.current)
    pdfUrlRef.current = null
  }
  setPdfUrl(null)
}

useEffect(() => {
  return () => { cleanupPdfUrl() }
}, [])
```

**Add `HandlePreview` function:**
```tsx
const HandlePreview = async (value: TResolverXXX) => {
  setLoading(true)
  try {
    const res = await AxiosClient.post(`/eoffice/mail-{slug-api}`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
    })

    if (res.data.status) {
      const data: ISomeLetterType = res.data.data

      let logoBase64 = ''
      try {
        if (data.kop_surat?.url_logo) {
          logoBase64 = await GetBase64FromUrl(data.kop_surat.url_logo)
        }
      } catch (e) {
        console.warn('[HandlePreview] Gagal konversi logo ke base64:', e)
      }

      const pdfDefinition = GenerateLetterXXX({ logo: logoBase64, data, header: data.kop_surat })
      const blob = await pdfmake.createPdf(pdfDefinition).getBlob()
      const url = URL.createObjectURL(blob)
      cleanupPdfUrl()

      pdfUrlRef.current = url
      setPdfUrl(url)
      setOpenPdfDialog(true)
      toast.success('Preview berhasil dibuat')
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || err?.message || 'Error')
  } finally {
    setLoading(false)
  }
}
```

**Add dialog JSX after the form:**
```tsx
<DialogBasic
  title="Preview Surat"
  open={openPdfDialog}
  setOpen={handleCloseDialog}
  disableOutsideDialog
  className={'min-w-5xl'}
>
  <div className="w-full h-[80vh]">
    {pdfUrl && (
      <iframe src={pdfUrl} className="w-full h-full border-0" title="Preview Surat PDF" />
    )}
  </div>
</DialogBasic>
```

**Pass `HandlePreview` to form:**
```tsx
<FormNamaSurat
  template={template}
  form={form}
  loading={loading}
  HandleSave={HandleSave}
  HandlePreview={HandlePreview}
/>
```

### 2. `components/form.tsx` — Form UI

**Add imports:**
```tsx
import { Button } from '@/components/ui/button.tsx'
import { FaRegEye } from 'react-icons/fa'
```

**Add optional `HandlePreview` prop:**
```tsx
interface Props {
  loading: boolean
  HandleSave: (e: TResolverXXX) => void
  HandlePreview?: (e: TResolverXXX) => void  // ← optional
  form: UseFormReturn<TResolverXXX>
  template?: ILetterTemplateType
}
```

**Destructure + compute isValid via `form.watch()`:**
> ⚠️ `form.formState.isValid` often doesn't trigger re-renders. Use `form.watch()` instead.
```tsx
const { loading, HandleSave, HandlePreview, form, template } = props
const formValues = form.watch()
const isValid = !!(
  formValues.id_nomor_surat_otomatis &&
  formValues.tempat_surat &&
  formValues.tanggal_surat &&
  formValues.id_kop_surat &&
  formValues.id_jenis_template_surat &&
  formValues.id_mahasiswa &&
  formValues.tahun_akademik &&
  formValues.penutup &&
  formValues.id_penandatangan &&
  formValues.nama_penandatangan &&
  formValues.jabatan_penandatangan &&
  formValues.id_satuan_kerja_penandatangan
  // add other required (non-optional, non-nullable) fields here
)
```

**Add preview button in ButtonTitleGroup (conditionally):**
```tsx
<ButtonTitleGroup
  label={`${template?.nama_jenis_template}`}
  isBack
  buttonGroup={[
    { type: 'cancel', label: 'Batal', onClick: () => navigate(`...`) },
    ...(HandlePreview
      ? [
          {
            type: 'custom' as const,
            element: (
              <Button
                key="preview"
                type="button"
                disabled={!isValid}
                onClick={form.handleSubmit(HandlePreview)}
                variant={'outline'}
                className="border-primary text-primary bg-white hover:text-primary"
              >
                <FaRegEye />
                Preview
              </Button>
            ),
          },
        ]
      : []),
    { type: 'save', label: 'Simpan' },
  ]}
/>
```

## Key Points

1. **`mode: 'onChange'`** is required on `useForm` — without it, validation stays `false` until first submit (default: `'onSubmit'`)
2. **Use `form.watch()` instead of `form.formState.isValid`** — `formState.isValid` often doesn't trigger re-renders when validation state changes. `form.watch()` on all required fields is more reliable.
3. **`HandlePreview` is optional** — the update/detail page doesn't pass it, so it's conditionally rendered
4. **`form.handleSubmit(HandlePreview)`** is used as `onClick` — this validates then calls the handler
5. **`type="button"`** on the preview button prevents it from triggering `<form onSubmit>`
6. **PDF is generated from the API response** — the POST saves the letter, returns full data including `kop_surat`
7. **`cleanupPdfUrl`** revokes the blob URL to prevent memory leaks
8. **Button has `variant="outline"`** to visually distinguish it from the primary "Simpan" button

## Verification

After implementing:
1. `npx tsc --noEmit` — should pass cleanly
2. Open form → Preview button should be disabled
3. Fill all required fields → Preview button should become active
4. Click Preview → form validates → saves via API → PDF dialog appears
