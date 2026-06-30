import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import { UseGetStudentStatus } from '@/pages/modules/E-Office/students/student-status/hooks'
import type { IStudentStatus } from '@/pages/modules/E-Office/students/student-status/data/types.ts'

const ButtonDataStatus = () => {
  const [open, setOpen] = useState(false)
  const { studentStatus } = UseGetStudentStatus({
    page: '0',
    limit: '0',
  })

  const columns: ColumnDef<IStudentStatus>[] = [
    {
      accessorKey: 'id_mahasiswa_status',
      header: 'ID Data',
    },
    {
      accessorKey: 'nama',
      header: 'Nama Status',
    },
  ]

  return (
    <>
      <Button onClick={() => setOpen(!open)} className={'text-white'}>
        Data Status
      </Button>

      <DialogBasic title={'Sumber Status'} className={'min-w-4xl'} open={open} setOpen={setOpen}>
        <div className="max-h-[500px] overflow-y-auto">
          <TableCustom
            isShowFilter={false}
            isShowPagination={false}
            data={studentStatus}
            columns={columns}
            columnsName={['']}
          />
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonDataStatus
