import { useState } from 'react'
import { UseGetStudyProgram } from '@/pages/modules/E-Office/students/study-program/hooks'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { IStudyProgram } from '@/pages/modules/E-Office/students/study-program/data/types.ts'
import { toast } from 'react-toastify'
import { FaCopy } from 'react-icons/fa'

const ButtonDataProdi = () => {
  const [open, setOpen] = useState(false)
  const { studyProgram } = UseGetStudyProgram({
    page: '0',
    limit: '0',
  })

  const columns: ColumnDef<IStudyProgram>[] = [
    {
      accessorKey: 'id_satuan_organisasi',
      header: 'ID Data',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center justify-between">
              <p>{data?.id_satuan_organisasi}</p>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(data?.id_satuan_organisasi)
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
      accessorKey: 'nama_prodi',
      header: 'Nama Program Studi',
    },
  ]

  return (
    <>
      <Button onClick={() => setOpen(!open)} className={'text-white'}>
        Data Prodi
      </Button>

      <DialogBasic
        title={'Sumber Data Prodi'}
        className={'min-w-4xl'}
        open={open}
        setOpen={setOpen}
      >
        <div className="max-h-[500px] overflow-y-auto">
          <TableCustom
            isShowFilter={false}
            isShowPagination={false}
            data={studyProgram}
            columns={columns}
            columnsName={['']}
          />
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonDataProdi
