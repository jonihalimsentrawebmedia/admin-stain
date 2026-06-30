import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import { UseGetAdmissionProcess } from '@/pages/modules/E-Office/students/admission-process/hooks'
import type { IAdmissionProcess } from '@/pages/modules/E-Office/students/admission-process/data/types.ts'

const ButtonAdmission = () => {
  const [open, setOpen] = useState(false)
  const { admissionProcess } = UseGetAdmissionProcess({
    page: '0',
    limit: '0',
  })

  const columns: ColumnDef<IAdmissionProcess>[] = [
    {
      accessorKey: 'id_mahasiswa_jalur_masuk',
      header: 'ID Data',
    },
    {
      accessorKey: 'nama',
      header: 'Nama Jalur Masuk',
    },
  ]

  return (
    <>
      <Button onClick={() => setOpen(!open)} className={'text-white'}>
        Data Jalur Masuk
      </Button>

      <DialogBasic
        title={'Sumber Data Jalur Masuk'}
        className={'min-w-4xl'}
        open={open}
        setOpen={setOpen}
      >
        <div className="max-h-[500px] overflow-y-auto">
          <TableCustom
            isShowFilter={false}
            isShowPagination={false}
            data={admissionProcess}
            columns={columns}
            columnsName={['']}
          />
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonAdmission
