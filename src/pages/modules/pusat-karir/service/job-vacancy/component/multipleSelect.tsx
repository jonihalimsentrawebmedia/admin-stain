import { Label } from '@/components/ui/label.tsx'
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { UseGetSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/hooks'
import { UseGetSubSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/sub-specialization/hooks'
import { clsx } from 'clsx'
import { FaTrash } from 'react-icons/fa'
import { type FieldValues, type Path, type UseFormReturn, useWatch } from 'react-hook-form'

type SelectedSub = {
  id: string
  nama: string
  parentId: string
}

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
}

export const MultipleSelectCategory = <T extends FieldValues>({ form, name }: FormProps<T>) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<SelectedSub[]>([])
  const [subMap, setSubMap] = useState<Record<string, { nama: string; parentId: string }>>({})

  const formValue = useWatch({
    control: form.control,
    name,
  }) as string[] | undefined

  const { specialization } = UseGetSpecialization({
    page: '0',
    limit: '0',
  })

  useEffect(() => {
    const ids = selected.map((row) => row.id)

    const isSame = JSON.stringify(ids) === JSON.stringify(formValue ?? [])

    if (!isSame) {
      form.setValue(name, ids as any)
    }
  }, [selected])

  useEffect(() => {
    if (!formValue) return

    setSelected((prev) => {
      const prevIds = prev.map((x) => x.id)

      const newItems = formValue
        .filter((id) => !prevIds.includes(id))
        .map((id) => ({
          id,
          nama: subMap[id]?.nama ?? id,
          parentId: subMap[id]?.parentId ?? '',
        }))

      if (newItems.length === 0) return prev

      return [...prev, ...newItems]
    })
  }, [formValue])

  const toggleSub = (sub: SelectedSub) => {
    setSelected((prev) => {
      const exist = prev.find((x) => x.id === sub.id)

      if (exist) {
        return prev.filter((x) => x.id !== sub.id)
      }

      return [...prev, sub]
    })
  }

  const removeItem = (id: string) => {
    setSelected((prev) => prev.filter((x) => x.id !== id))
  }

  const removeByParent = (parentId: string) => {
    setSelected((prev) => prev.filter((x) => x.parentId !== parentId))
  }

  return (
    <>
      <div className="grid grid-cols-[12rem_1fr] gap-5">
        <Label>Spesialisasi</Label>

        <div
          className="border rounded p-2 cursor-pointer bg-white flex flex-wrap gap-2"
          onClick={() => setOpen(true)}
        >
          {selected.length > 0 ? (
            selected.map((row) => (
              <div key={row.id} className="text-sm border p-1.5 rounded flex items-center gap-1">
                {row.nama}

                <FaTrash
                  className="size-3 text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeItem(row.id)
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-sm">Pilih Bidang Specialisasi</p>
          )}
        </div>
      </div>

      <DialogBasic className="min-w-5xl" open={open} setOpen={setOpen} title="Pilih Spesialisasi">
        <div className="grid grid-cols-3 gap-6">
          {specialization.map((item) => (
            <CategoryItem
              key={item.id_spesialisasi}
              item={item}
              selected={selected}
              toggleSub={toggleSub}
              removeByParent={removeByParent}
              setSubMap={setSubMap}
            />
          ))}
        </div>
      </DialogBasic>
    </>
  )
}

type Props = {
  item: any
  selected: SelectedSub[]
  toggleSub: (sub: SelectedSub) => void
  removeByParent: (parentId: string) => void
  setSubMap: Dispatch<SetStateAction<Record<string, { nama: string; parentId: string }>>>
}

const CategoryItem = ({ item, selected, toggleSub, removeByParent, setSubMap }: Props) => {
  const { subSpecialization } = UseGetSubSpecialization({
    id: item.id_spesialisasi,
    page: '0',
    limit: '0',
  })

  useEffect(() => {
    setSubMap((prev) => {
      const newMap = { ...prev }

      subSpecialization.forEach((sub) => {
        newMap[sub.id_sub_spesialisasi] = {
          nama: sub.nama_spesialisasi,
          parentId: item.id_spesialisasi,
        }
      })

      return newMap
    })
  }, [subSpecialization])

  const parentRef = useRef<HTMLInputElement>(null)

  const subs = subSpecialization.map((s) => s.id_sub_spesialisasi)

  const checkedCount = subs.filter((id) => selected.some((x) => x.id === id)).length

  const allChecked = checkedCount === subs.length
  const isPartial = checkedCount > 0 && checkedCount < subs.length

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.indeterminate = isPartial
    }
  }, [isPartial])

  const toggleCategory = () => {
    if (allChecked) {
      removeByParent(item.id_spesialisasi)
      return
    }

    subSpecialization.forEach((sub) => {
      toggleSub({
        id: sub.id_sub_spesialisasi,
        nama: sub.nama_spesialisasi,
        parentId: item.id_spesialisasi,
      })
    })
  }

  return (
    <div>
      <Label className="flex items-center gap-2 font-semibold">
        <input ref={parentRef} type="checkbox" checked={allChecked} onChange={toggleCategory} />

        {item.nama_spesialisasi}
      </Label>

      <ul className="ml-5">
        {subSpecialization.map((sub, k) => {
          const checked = selected.some((x) => x.id === sub.id_sub_spesialisasi)

          return (
            <Label
              key={sub.id_sub_spesialisasi}
              className="flex items-center gap-2 whitespace-nowrap relative pl-4 py-2"
            >
              <span
                className={clsx(
                  'absolute left-1.5 top-0 w-[1.5px] bg-primary',
                  subSpecialization.length - 1 === k ? 'h-1/2' : 'h-full'
                )}
              />

              <span className="absolute left-1.5 top-3.5 w-[10px] bg-primary h-[1.5px]" />

              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  toggleSub({
                    id: sub.id_sub_spesialisasi,
                    nama: sub.nama_spesialisasi,
                    parentId: item.id_spesialisasi,
                  })
                }
              />

              {sub.nama_spesialisasi}
            </Label>
          )
        })}
      </ul>
    </div>
  )
}
