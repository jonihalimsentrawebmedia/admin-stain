import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import { UseGetReligion } from '@/pages/modules/E-Office/students/religion/hooks'
import type { IReligion } from '@/pages/modules/E-Office/students/religion/data/types.ts'

const ButtonDataReligion = () => {
  const [open, setOpen] = useState(false)
  const { religion } = UseGetReligion({
    page: '0',
    limit: '0',
  })

  const columns: ColumnDef<IReligion>[] = [
    {
      accessorKey: 'id_mahasiswa_agama',
      header: 'ID Data',
    },
    {
      accessorKey: 'nama',
      header: 'Nama Agama',
    },
  ]

  return (
    <>
      <Button onClick={() => setOpen(!open)} className={'text-white'}>
        Data Agama
      </Button>

      <DialogBasic
        title={'Sumber Data Agama'}
        className={'min-w-4xl'}
        open={open}
        setOpen={setOpen}
      >
        <div className="max-h-[500px] overflow-y-auto">
          <TableCustom
            isShowFilter={false}
            isShowPagination={false}
            data={religion}
            columns={columns}
            columnsName={['']}
          />
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonDataReligion
