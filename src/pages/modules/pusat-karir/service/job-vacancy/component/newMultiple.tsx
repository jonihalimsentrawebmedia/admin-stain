import { Label } from '@/components/ui/label'
import { DialogBasic } from '@/components/common/dialog/dialogBasic'
import { useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
import { FaTrash } from 'react-icons/fa'
import { UseGetSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/hooks'
import { UseGetSubSpecialization } from '@/pages/modules/pusat-karir/reference/specialization/sub-specialization/hooks'

const groupBySpecialization = (data: any[]) => {
  const map: Record<string, any[]> = {}

  data.forEach((item) => {
    if (!map[item.id_spesialisasi]) {
      map[item.id_spesialisasi] = []
    }

    map[item.id_spesialisasi].push(item)
  })

  return map
}

export const NewMultipleSelectCategory = ({ form, name }: any) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const value = useWatch({
    control: form.control,
    name,
  }) as string[]

  const { specialization } = UseGetSpecialization({
    page: '0',
    limit: '0',
  })

  const { subSpecialization } = UseGetSubSpecialization({
    page: '0',
    limit: '0',
  })

  const groupData = useMemo(() => groupBySpecialization(subSpecialization), [subSpecialization])

  const subMap = useMemo(() => {
    const map: Record<string, string> = {}

    subSpecialization.forEach((s: any) => {
      map[s.id_sub_spesialisasi] = s.nama_spesialisasi
    })

    return map
  }, [subSpecialization])

  const removeItem = (id: string) => {
    form.setValue(
      name,
      value.filter((x) => x !== id)
    )
  }

  return (
    <>
      <div className="grid grid-cols-[12rem_1fr] gap-5">
        <Label>Spesialisasi</Label>

        <div
          className="border rounded p-2 flex flex-wrap gap-2 cursor-pointer bg-white"
          onClick={() => setOpen(true)}
        >
          {value?.length ? (
            value.map((id, k) => (
              <div key={k} className="text-sm border px-2 py-1 rounded flex items-center gap-1">
                {subMap[id] ?? id}

                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeItem(id)
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Pilih Spesialisasi</p>
          )}
        </div>
      </div>

      <DialogBasic className="min-w-5xl" open={open} setOpen={setOpen} title="Pilih Spesialisasi">
        <input
          placeholder="Cari spesialisasi..."
          className="border p-2 w-full mb-4 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-3 gap-6">
          {specialization.map((cat: any, k: number) => (
            <CategoryItem
              key={k}
              cat={cat}
              subList={groupData[cat.id_spesialisasi] ?? []}
              value={value}
              form={form}
              name={name}
              search={search}
            />
          ))}
        </div>
      </DialogBasic>
    </>
  )
}

const CategoryItem = ({ cat, subList, value, form, name, search }: any) => {
  const filtered = subList.filter((s: any) =>
    s.nama_spesialisasi.toLowerCase().includes(search.toLowerCase())
  )

  const ids = filtered.map((s: any) => s.id_sub_spesialisasi)

  const checkedCount = ids.filter((id: string) => value?.includes(id)).length

  const allChecked = checkedCount === ids.length

  const toggleCategory = () => {
    if (allChecked) {
      form.setValue(
        name,
        value.filter((id: string) => !ids.includes(id))
      )
      return
    }

    form.setValue(name, [...new Set([...(value ?? []), ...ids])])
  }

  const toggleSub = (id: string) => {
    if (value?.includes(id)) {
      form.setValue(
        name,
        value.filter((x: string) => x !== id)
      )
      return
    }

    form.setValue(name, [...(value ?? []), id])
  }

  if (!filtered.length) return null

  return (
    <div>
      <Label className="flex items-center gap-2 font-semibold">
        <input type="checkbox" checked={allChecked} onChange={toggleCategory} />
        {cat.nama_spesialisasi}
      </Label>

      <ul className="ml-5">
        {filtered.map((sub: any, k: number) => (
          <Label key={k} className="flex gap-2 py-1">
            <input
              type="checkbox"
              checked={value?.includes(sub.id_sub_spesialisasi)}
              onChange={() => toggleSub(sub.id_sub_spesialisasi)}
            />

            {sub.nama_spesialisasi}
          </Label>
        ))}
      </ul>
    </div>
  )
}
