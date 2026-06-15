import { MdInfo } from 'react-icons/md'
import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { UseGetLetterAssigmentDetail } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/hooks'
import { format } from 'date-fns'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { ILetterAssignmentEmployee } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types.ts'

interface props {
  id: string
}

export const ButtonInfoAssignment = (props: props) => {
  const { id } = props

  const [open, setOpen] = useState(false)
  const { detail } = UseGetLetterAssigmentDetail(id)

  const columns: ColumnDef<ILetterAssignmentEmployee>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p>{row?.index + 1}</p>
      },
    },
    {
      accessorKey: 'nama_lengkap',
      header: 'Nama Pegawai',
    },
    {
      accessorKey: 'nip',
      header: 'NIP',
    },
  ]

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-500 text-white p-1.5 hover:bg-blue-600 rounded"
      >
        <MdInfo />
      </button>

      <DialogBasic
        title={'Daftar Pegawai Kegiatan'}
        open={open}
        setOpen={setOpen}
        className={'min-w-4xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4 p-4 bg-blue-100 rounded'}>
          <p className="text-gray-500">Tanggal Surat</p>
          <p>{detail?.tanggal_surat ? format(detail?.tanggal_surat, 'dd MMMM yyyy') : ''}</p>
          <p className="text-gray-500">No. Surat</p>
          <p>{detail?.nomor_surat}</p>
          <p className="text-gray-500">Uraian</p>
          <p>{detail?.kegiatan?.join(', ')}</p>
        </div>

        <div>
          <p className="font-semibold">Jumlah Pegawai - {detail?.pegawai.length} Orang</p>
          <TableBasic columns={columns} data={detail?.pegawai ?? []} />
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonInfoAssignment
