// UseGetCodeAvailableLetter

import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import { FaCopy } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { UseGetCodeAvailableLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/hooks'

const ButtonCodeTemplateAvailable = () => {
  const [open, setOpen] = useState(false)
  const { codeAvailable } = UseGetCodeAvailableLetter()

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'kode',
      header: 'Kode Template Tersedia',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center justify-between">
              <p>{data?.kode}</p>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(data.kode)
                    toast.success('Berhasil disalin ke clipboard')
                  } catch {
                    toast.error('Gagal menyalin')
                  }
                }}
              >
                <FaCopy />
              </button>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama Template Surat',
    },
  ]

  return (
    <>
      <Button onClick={() => setOpen(!open)} className={'text-white'}>
        Data Template Surat
      </Button>

      <DialogBasic
        title={'Nama Template Surat'}
        className={'min-w-4xl'}
        open={open}
        setOpen={setOpen}
      >
        <div className="max-h-[500px] overflow-y-auto">
          <TableCustom
            isShowFilter={false}
            isShowPagination={false}
            data={codeAvailable}
            columns={columns}
            columnsName={['']}
          />
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonCodeTemplateAvailable
