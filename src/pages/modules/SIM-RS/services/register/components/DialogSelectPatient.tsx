import { useEffect, useMemo, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { format } from 'date-fns'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPatient } from '@/pages/modules/SIM-RS/reference/patient/data/types.ts'
import { UseGetPatient, UseGetDetailPatient } from '@/pages/modules/SIM-RS/reference/patient/hooks/index.tsx'
import type { TResolverRegistration } from '../data/resolver.tsx'
import { BiSearch } from 'react-icons/bi'
import { Input } from '@/components/ui/input.tsx'

interface Props {
  form: UseFormReturn<TResolverRegistration>
}

export const DialogSelectPatient = ({ form }: Props) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null)

  const idPasien = form.watch('id_pasien')
  const { detail: patientDetail } = UseGetDetailPatient(idPasien ?? '')

  useEffect(() => {
    if (idPasien && patientDetail && !selectedPatient) {
      setSelectedPatient(patientDetail)
    }
  }, [idPasien, patientDetail, selectedPatient])

  const { patient, loading } = UseGetPatient({ page: '1', limit: '50', search })

  const dialogColumns: ColumnDef<IPatient>[] = useMemo(
    () => [
      {
        accessorKey: 'no_rekam_medis',
        header: 'No. Rekam Medis',
      },
      {
        accessorKey: 'nama_lengkap',
        header: 'Nama Pasien',
      },
      {
        accessorKey: 'nik',
        header: 'NIK',
      },
      {
        accessorKey: 'action',
        header: '',
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => {
              form.setValue('id_pasien', row.original.id_pasien)
              setSelectedPatient(row.original)
              setOpen(false)
            }}
            className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/80"
          >
            Pilih
          </button>
        ),
      },
    ],
    [form]
  )

  const displayColumns: ColumnDef<IPatient>[] = useMemo(
    () => [
      {
        accessorKey: 'order',
        header: '#',
        cell: ({ row }) => <>{row.index + 1}</>,
      },
      {
        accessorKey: 'no_rekam_medis',
        header: 'No. Rekam Medis',
      },
      {
        accessorKey: 'nik',
        header: 'Nama - NIK',
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.nama_lengkap}</p>
            <p className="text-xs text-gray-500">{row.original.nik}</p>
          </div>
        ),
      },
      {
        accessorKey: 'jenis_kelamin',
        header: 'Jenis Kelamin',
        cell: ({ row }) => (
          <>{row.original.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</>
        ),
      },
      {
        accessorKey: 'tanggal_lahir',
        header: 'Tanggal Lahir',
        cell: ({ row }) => {
          const date = new Date(row.original.tanggal_lahir)
          return format(date, 'dd-MM-yyyy')
        },
      },
    ],
    []
  )

  return (
    <>
      <div className="flex items-start gap-2 flex-col">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/80"
        >
          Pilih Pasien
        </button>
        {selectedPatient && (
          <TableCustom
            data={[selectedPatient]}
            columns={displayColumns}
            isShowFilter={false}
            isShowPagination={false}
          />
        )}
      </div>
      <DialogBasic open={open} setOpen={setOpen} title="Pilih Pasien" className="sm:min-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <BiSearch className="text-gray-400 size-5" />
          <Input
            placeholder="Cari nama atau No. Rekam Medis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white"
          />
        </div>
        <TableCustom
          data={patient}
          columns={dialogColumns}
          loading={loading}
          isShowPagination={false}
          isShowFilter={false}
        />
      </DialogBasic>
    </>
  )
}
