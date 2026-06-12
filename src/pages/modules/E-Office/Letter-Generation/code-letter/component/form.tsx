import { useCallback, useMemo } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import type { TResolverCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/code-letter/data/resolver.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UseGetUnitActive } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { GenerateLetterCodeNumber } from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/exampleView.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { SwitchInput } from '@/components/common/form/switchInput.tsx'

/* ─── Drag-and-drop sortable item ─── */
interface SortableItemProps {
  id: string
  label: string
}

function SortableItem({ id, label }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-lg border bg-white px-3 py-2.5 shadow-sm ${
        isDragging ? 'z-10 shadow-md ring-2 ring-primary/20' : ''
      }`}
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing touch-none text-muted-foreground hover:text-foreground transition-colors"
        {...attributes}
        {...listeners}
        aria-label={`Drag ${label}`}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

/* ─── Susunan fields map ─── */
type SortableId = 'kode_depan' | 'nomor_surat' | 'kode_belakang' | 'bulan' | 'tahun'

interface SortableFieldItem {
  id: SortableId
  label: string
  visible: boolean
}

const SORTABLE_FIELDS: Array<Omit<SortableFieldItem, 'visible'>> = [
  { id: 'kode_depan', label: 'Kode Depan' },
  { id: 'nomor_surat', label: 'Nomor Surat' },
  { id: 'kode_belakang', label: 'Kode Belakang' },
  { id: 'bulan', label: 'Bulan' },
  { id: 'tahun', label: 'Tahun' },
]

/* Maps a sortable id → the form field path for its urutan value */
const URUTAN_FIELD_MAP: Record<SortableId, keyof TResolverCodeLetter> = {
  kode_depan: 'urutan_kode_depan',
  nomor_surat: 'urutan_posisi_utama_no_surat',
  kode_belakang: 'urutan_kode_belakang',
  bulan: 'urutan_bulan',
  tahun: 'urutan_tahun',
}

interface props {
  form: UseFormReturn<TResolverCodeLetter>
  loading: boolean
  HandleSave: (value: TResolverCodeLetter) => void
}

const FormCodeLetterGenerated = (props: props) => {
  const { form, loading, HandleSave } = props
  const navigate = useNavigate()
  const { institution } = UseGetUnitActive()

  const isi_surat_otomatis = form.watch('isi_surat_otomatis')
  const is_perlu_bulan = form.watch('is_perlu_bulan')
  const is_perlu_tahun = form.watch('is_perlu_tahun')

  /* watch nilai urutan agar useMemo ikut bereaksi saat berubah */
  const urutan_kode_depan = form.watch('urutan_kode_depan')
  const urutan_posisi_utama_no_surat = form.watch('urutan_posisi_utama_no_surat')
  const urutan_kode_belakang = form.watch('urutan_kode_belakang')
  const urutan_bulan = form.watch('urutan_bulan')
  const urutan_tahun = form.watch('urutan_tahun')

  const result = GenerateLetterCodeNumber({
    kode_depan: form.watch('kode_depan'),
    urutan_kode_depan,
    kode_belakang: form.watch('kode_belakang'),
    urutan_kode_belakang,
    is_bulan: is_perlu_bulan,
    is_bulan_romawi: form.watch('is_bulan_romawi'),
    is_tahun: is_perlu_tahun,
    urutan_bulan,
    urutan_nomor_surat: urutan_posisi_utama_no_surat,
    urutan_tahun,
  })

  /* ── DnD sensors ── */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  /* ── Derive visible sortable items, sorted by current urutan_* values ── */
  const visibleItems = useMemo<SortableFieldItem[]>(() => {
    const values: Record<SortableId, number> = {
      kode_depan: urutan_kode_depan,
      nomor_surat: urutan_posisi_utama_no_surat,
      kode_belakang: urutan_kode_belakang,
      bulan: urutan_bulan,
      tahun: urutan_tahun,
    }

    const raw: SortableFieldItem[] = SORTABLE_FIELDS.map((item) => ({
      ...item,
      visible: item.id === 'bulan' ? is_perlu_bulan : item.id === 'tahun' ? is_perlu_tahun : true,
    }))

    return raw.filter((i) => i.visible).sort((a, b) => (values[a.id] ?? 0) - (values[b.id] ?? 0))
  }, [
    is_perlu_bulan,
    is_perlu_tahun,
    urutan_kode_depan,
    urutan_posisi_utama_no_surat,
    urutan_kode_belakang,
    urutan_bulan,
    urutan_tahun,
  ])

  /* ── Handle drag end: reorder → update form values ── */
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const ids = visibleItems.map((i) => i.id)
      const oldIndex = ids.indexOf(active.id as SortableId)
      const newIndex = ids.indexOf(over.id as SortableId)
      if (oldIndex === -1 || newIndex === -1) return

      const reordered = arrayMove(visibleItems, oldIndex, newIndex)
      reordered.forEach((item, idx) => {
        const field = URUTAN_FIELD_MAP[item.id]
        form.setValue(field as any, idx + 1, { shouldDirty: true })
      })
    },
    [visibleItems, form]
  )

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <SelectBasicInput
                form={form}
                className={'col-span-2'}
                name={'id_unit'}
                label={'Satuan Kerja'}
                placeholder={'Pilih Satuan Kerja / Tidak Dipilih / NULL'}
                data={
                  institution?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
                showNull
                isRequired
              />
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end">
                <TextInput
                  form={form}
                  name="nama_nomor_surat"
                  label="Nama Bagian Surat"
                  placeholder="Contoh: Surat Tugas"
                  isRequired
                />

                <CheckboxInputBasic
                  form={form}
                  className={'mb-2'}
                  name="isi_surat_otomatis"
                  label="Isi Nomor Otomatis"
                  fx={(e) => {
                    if (e) {
                      form.setValue('urutan_kode_depan', 1)
                      form.setValue('urutan_posisi_utama_no_surat', 2)
                      form.setValue('urutan_kode_belakang', 3)
                      form.setValue('urutan_bulan', 4)
                      form.setValue('urutan_tahun', 5)
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Komponen Surat */}
          <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Komponen Surat</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput form={form} name="kode_depan" label="Kode Depan" placeholder="090" />

                  <TextInput
                    form={form}
                    name="kode_belakang"
                    label="Kode Belakang"
                    placeholder="SPT"
                  />
                </div>

                <InputRadio
                  form={form}
                  label={'Pengisian Nomor Surat'}
                  isRequired
                  isRow
                  name={'pengisian_no_surat'}
                  data={[
                    { label: 'Otomatis', value: 'OTOMATIS' },
                    { label: 'Manual', value: 'MANUAL' },
                  ]}
                />

                <SwitchInput
                  isRow
                  isRequired
                  htmlFor={'bulan'}
                  form={form}
                  name="is_perlu_bulan"
                  label="Perlu Bulan"
                />

                <SwitchInput
                  isRow
                  isRequired
                  htmlFor={'is_romawi'}
                  form={form}
                  name="is_bulan_romawi"
                  label="Bulan Romawi"
                />

                <SwitchInput
                  isRow
                  isRequired
                  htmlFor={'tahun'}
                  form={form}
                  name="is_perlu_tahun"
                  label="Perlu Tahun"
                />
              </CardContent>
            </Card>

            {/* Susunan */}
            <Card>
              <CardHeader>
                <CardTitle>Susunan Nomor Surat</CardTitle>
              </CardHeader>

              <CardContent>
                {isi_surat_otomatis ? (
                  /* ── Auto mode: static (tidak bisa drag) ── */
                  <div className="space-y-2">
                    {visibleItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-lg border bg-gray-50 px-3 py-2.5"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* ── Manual mode: drag-and-drop ── */
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={visibleItems.map((i) => i.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {visibleItems.map((item) => (
                          <SortableItem key={item.id} id={item.id} label={item.label} />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview Nomor Surat</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div
                  className="text-3xl font-bold text-primary"
                  dangerouslySetInnerHTML={{
                    __html: result ?? 'Belum Ada Nomor Surat',
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}

export default FormCodeLetterGenerated
