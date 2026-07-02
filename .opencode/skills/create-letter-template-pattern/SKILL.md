---
name: create-letter-template-pattern
description: Use when creating or completing a new letter template under CreateByTemplate. Follows the established pattern from existing letters (SKAM, SKCA, SPK, SPP, SPM, SKAK).
---

# CreateByTemplate Letter Generation Pattern

Use this skill when creating a new letter type under `src/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/`.

## File Structure

Each letter type folder must contain:

```
{NamaFolder}/
├── index.tsx                         # Page component
├── data/
│   └── resolver.tsx                  # Zod schema + type
└── components/
    ├── form.tsx                      # Form UI component
    └── [optional custom selectors]   # e.g. SelectMultiStudent, SelectMultiDosen
```

## Common Code Pattern

### 1. `data/resolver.tsx` — Zod Schema

```tsx
import { z } from 'zod'

export const ResolverXXX = z.object({
  // --- Standard Fields (always present) ---
  id_nomor_surat_otomatis: z.string({ error: 'Nomor Surat Otomatis harus diisi' }),
  nomor_urut_manual: z.string().nullable().optional(),
  tempat_surat: z.string({ error: 'Tempat Surat harus diisi' }),
  tanggal_surat: z.string({ error: 'Tanggal Surat harus diisi' }),
  id_kop_surat: z.string({ error: 'Kop Surat harus diisi' }),
  id_jenis_template_surat: z.string({ error: 'Jenis Template Surat harus diisi' }),

  // --- Penandatangan Fields ---
  id_penandatangan: z.string({ error: 'Penandatangan harus diisi' }),
  nama_penandatangan: z.string({ error: 'Nama Penandatangan harus diisi' }),
  nip_penandatangan: z.string().optional().nullable(),
  nidn_penandatangan: z.string().optional().nullable(),
  jabatan_penandatangan: z.string({ error: 'Jabatan Penandatangan harus diisi' }),
  id_satuan_kerja_penandatangan: z.string({ error: 'Satuan Kerja Penandatangan harus diisi' }),

  // --- Student Fields (single) ---
  id_mahasiswa: z.string({ error: 'Mahasiswa harus diisi' }),
  nama_mahasiswa: z.string().optional().nullable(),
  nim: z.string().optional().nullable(),
  prodi: z.string().optional().nullable(),
  Fakultas: z.string().optional().nullable(),
  jenjang: z.string().optional().nullable(),
  semester: z.number().optional().nullable(),

  // --- Multi-student (if applicable) ---
  // id_mahasiswa: z.array(z.string()),

  // --- Letter-specific fields go here ---

  penutup: z.string({ error: 'Penutup harus diisi' }),
})

export type TResolverXXX = z.infer<typeof ResolverXXX>
```

### 2. `index.tsx` — Page Component

```tsx
import FormNamaSurat from './components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ResolverXXX, type TResolverXXX } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const NamaSuratPage = () => {
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('XXX-1')
  const navigate = useNavigate()

  const form = useForm<TResolverXXX>({
    resolver: zodResolver(ResolverXXX),
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
    },
  })

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const HandleSave = async (value: TResolverXXX) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-{slug-api}`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
      // convert date fields to ISO as needed
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          form.reset()
          navigate(
            `/modules/e-office/letter-generation/letter-list?id_template=${template?.id_mail_jenis_template_surat}`
          )
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <FormNamaSurat
      template={template}
      form={form}
      loading={loading}
      HandleSave={HandleSave}
    />
  )
}
export default NamaSuratPage
```

### 3. `components/form.tsx` — Form UI

```tsx
import type { UseFormReturn } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { FaRegFileAlt } from 'react-icons/fa'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { FiHash } from 'react-icons/fi'
import TextInput from '@/components/common/form/TextInput.tsx'
import { ReturnOrderData } from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/formLetterNumber.tsx'
import { UseGetLetterHeaderRef } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { UseGetLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import DialogHumanResources from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/components/selectSDM.tsx'
import DialogSelectStudents from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/components/selectStudent.tsx'
import SelectTemplateText from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/selectTemplate.tsx'
import { RichText } from '@/components/common/richtext'
import type { TResolverXXX } from '../data/resolver.tsx'
import type { ILetterTemplateType } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'

interface Props {
  loading: boolean
  HandleSave: (e: TResolverXXX) => void
  form: UseFormReturn<TResolverXXX>
  template?: ILetterTemplateType
}

const FormNamaSurat = (props: Props) => {
  const { id } = useParams()
  const { loading, HandleSave, form, template } = props
  const navigate = useNavigate()
  const { letterHeader } = UseGetLetterHeaderRef()
  const { letterNumber } = UseGetLetterNumberAutomatic({ page: '0', limit: '0' })
  const { institution } = UseGetUnitInstitution({ page: '0', limit: '0' })

  return (
    <Form {...form}>
      <form className={'space-y-5'} onSubmit={form.handleSubmit(HandleSave)}>
        <ButtonTitleGroup
          label={`${template?.nama_jenis_template}`}
          isBack
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => navigate(`/modules/e-office/letter-generation/create-letter/create/${id}`) },
            { type: 'save', label: 'Simpan' },
          ]}
        />

        <div className={'space-y-5'}>
          {/* --- Kop Surat --- */}
          <Card className={'p-2'}>
            <CardContent className={'p-2 space-y-4'}>
              <CardTitle className={'text-xl flex items-center gap-1.5'}>
                <div className="p-1.5 bg-primary text-white rounded"><FaRegFileAlt className={'size-5'} /></div>
                Kop Surat
              </CardTitle>
              <SelectBasicInput
                form={form} name={'id_kop_surat'} label={'Pilih Kop Surat'}
                placeholder={'Pilih Kop Surat'} className={'w-1/2'} usePortal isRequired
                data={letterHeader?.map((row) => ({ label: row?.nama_unit, value: row?.id_kop_surat })) ?? []}
              />
            </CardContent>
          </Card>

          {/* --- Penomoran Surat --- */}
          <Card className={'p-2'}>
            <CardContent className={'p-2 space-y-4 w-full'}>
              <CardTitle className={'text-xl flex items-center gap-1.5'}>
                <div className="p-1.5 rounded bg-primary text-white"><FiHash className={'size-5'} /></div>
                Penomoran Surat
              </CardTitle>
              <div className="grid grid-cols-3 gap-4">
                <SelectBasicInput
                  form={form} name={'id_nomor_surat_otomatis'} placeholder={'Pilih Kode Nomor Surat'}
                  label={'Pilih Kode Nomor Surat'} usePortal isRequired
                  fx={() => { form.setValue('nomor_urut_manual', null) }}
                  data={letterNumber?.map((row) => ({ label: row?.nama_nomor_surat, value: row?.id_nomor_surat_otomatis })) ?? []}
                />
                <TextInput form={form} name={'tempat_surat'} label={'Tempat Surat'} placeholder={'Tempat Surat'} htmlFor={'tempat_surat'} isRequired />
                <TextInput form={form} name={'tanggal_surat'} label={'Tanggal Surat'} type={'date'} htmlFor={'tanggal_surat'} isRequired />
              </div>
              <ReturnOrderData form={form} date={form.watch('tanggal_surat')} name={'nomor_urut_manual'} id={form.watch('id_nomor_surat_otomatis')} />
            </CardContent>
          </Card>

          {/* --- Penandatangan (early or late depending on pattern) --- */}
          {/* SKAM/SKCA/SKAK: section 1; SPP/SPK/SPM: section 5 */}

          {/* --- Mahasiswa (single or multi-select) --- */}
          {/* DialogSelectStudents for single, SelectMultiStudent for multi */}

          {/* --- Letter-specific content section --- */}

          {/* --- Penutup --- */}
          <Card className={'p-2'}>
            <CardContent className={'p-2 space-y-4'}>
              <CardTitle>Penutup</CardTitle>
              <div className="relative">
                <SelectTemplateText id_jenis_surat={template?.id_jenis_surat} kode={'XXX-1'} form={form} name={'penutup'} />
                <RichText form={form} name={'penutup'} label={'Penutup'} placeholder={'Tuliskan Penutup'} showLabel={true} required isRow />
              </div>
            </CardContent>
          </Card>

          {/* --- Penandatangan (if placed at end, e.g. SPP/SPK/SPM) --- */}
        </div>

        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}
export default FormNamaSurat
```

## Sub-Patterns

### A. Academic Letters (SKAM, SKCA, SKAK)
Penandatangan section is **first** (section 1), before Mahasiswa section (section 2).

Components reused:
- `DialogHumanResources` from `SuratKeteranganAktifMahasiswa/components/selectSDM.tsx`
- `DialogSelectStudents` from `SuratKeteranganAktifMahasiswa/components/selectStudent.tsx`

### B. Service Letters (SPP, SPK, SPM)
Pembuka section is first (section 1), Penandatangan is **last** (section 5). These have `lampiran`/`detail_lampiran` dynamic fields, `perihal`, `instansi_pimpinan`, `masukan_di`, `pembuka`.

Components reused:
- `DialogHumanResources` from `SuratKeteranganAktifMahasiswa/components/selectSDM.tsx`
- `SelectMultiStudent` from `SuratPermohonanMagangPKL/components/SelectMultiStudent.tsx` (for multi-student KKN/PKL)
- `SelectMultiDosen` from `SuratPengantarKKN/components/SelectMultiDosen.tsx` (for DPL selection in KKN)

## Template Codes

| Folder | Code | Slug API |
|--------|------|----------|
| SuratKeteranganAktifMahasiswa | SKAM-1 | mail-surat-keterangan-aktif-mahasiswa |
| SuratKeteranganCutiAkademik | SKCA-1 | mail-surat-keterangan-cuti-akademik |
| SuratPengantarKKN | SPK-1 | mail-surat-pengantar-kkn |
| SuratPengantarPenelitian | SPP-1 | mail-surat-pengantar-penelitian |
| SuratPermohonanMagangPKL | SPM-1 | mail-surat-permohonan-magang |
| SuratKeteranganAktifKembali | SKAK-1 | mail-surat-keterangan-aktif-kembali |

## Verification

After creating a new letter:
1. Ensure all 3 files exist (index.tsx, data/resolver.tsx, components/form.tsx)
2. Verify the export name matches the page component name
3. Run `npx tsc --noEmit` to check TypeScript errors
