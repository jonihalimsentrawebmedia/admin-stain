import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { Dispatch, SetStateAction } from 'react'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMailIsiTemplateSurat } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/isi-template/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { ArrowLeft } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { ITypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/data/types.ts'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  rootData?: ITypeTemplateLetter
  data: IMailIsiTemplateSurat[]
  back?: () => void
  form: UseFormReturn<any>
  name: string
  loading: boolean
}

const DialogSelectText = (props: Props) => {
  const { open, setOpen, rootData, data, back, form, name, loading } = props

  const columns: ColumnDef<IMailIsiTemplateSurat>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="font-medium">{row.index + 1}</p>
      },
    },
    {
      accessorKey: 'uraian',
      header: 'Uraian',
      cell: ({ row }) => {
        const item = row.original
        return <div dangerouslySetInnerHTML={{ __html: item?.uraian ?? '' }} />
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action-toot',
      header: 'Aksi',
      cell: ({ row }) => {
        const item = row.original
        return (
          <Button
            variant={'outline'}
            className={'border-primary text-primary'}
            onClick={() => {
              form.setValue(name, item?.uraian)
              setOpen(false)
            }}
          >
            Pilih Template
          </Button>
        )
      },
    },
  ]

  return (
    <>
      <DialogBasic
        title={`Pilih Isi Template`}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-6xl rounded'}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-4">
          <p className={'text-gray-500'}>Jenis Template</p>
          <p>{rootData?.nama_jenis_template}</p>
        </div>
        <button onClick={back} className={'flex items-center gap-2 my-1.5'}>
          <ArrowLeft className={'size-4 text-primary'} />
          Kembali ke daftar Template
        </button>
        <TableCustom
          columnsName={['action', 'urutan']}
          isShowFilter={false}
          isShowPagination={false}
          columns={columns}
          data={data}
          loading={loading}
        />
      </DialogBasic>
    </>
  )
}
export default DialogSelectText
