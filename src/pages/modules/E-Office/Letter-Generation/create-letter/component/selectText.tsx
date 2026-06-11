import { UseGetTypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/hooks'
import { IMailTemplateTypeColumns } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/data/columns.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { Dispatch, SetStateAction } from 'react'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMailTypeLetterTemplate } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import type { IMailTypeLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/data/types.ts'
import type { ITypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/data/types.ts'
import { ArrowLeft } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  id_template: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  rootData?: IMailTypeLetter
  data?: ITypeTemplateLetter
  back?: () => void
  form: UseFormReturn<any>
  name: string
}

const DialogSelectText = (props: Props) => {
  const { id_template, open, setOpen, rootData, data, back, form, name } = props
  const { templateLetter, loading } = UseGetTypeTemplateLetter({
    page: '1',
    limit: '10',
    search: '',
    id_jenis_template_surat: id_template as string,
  })
  const columns = IMailTemplateTypeColumns()
  const columns2: ColumnDef<IMailTypeLetterTemplate>[] = [
    ...columns,
    {
      accessorKey: 'detail',
      header: 'Aksi',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <Button
              variant={'outline'}
              className={'border-primary text-primary'}
              onClick={() => {
                form.setValue(name, data?.uraian)
                setOpen(false)
              }}
            >
              Pilih Template
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <>
      <DialogBasic
        title={`Pilih Template ‘Pembuka’`}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-6xl rounded'}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-4">
          <p className={'text-gray-500'}>Jenis Surat</p>
          <p>{rootData?.nama_jenis_surat}</p>
          <p className={'text-gray-500'}>Jenis Template</p>
          <p>{data?.nama_jenis_template}</p>
        </div>
        <button onClick={back} className={'flex items-center gap-2 my-1.5'}>
          <ArrowLeft className={'size-4 text-primary'} />
          Kembali ke daftar Jenis Surat & Jenis Template
        </button>
        <TableCustom
          columnsName={['action', 'urutan']}
          isShowFilter={false}
          isShowPagination={false}
          columns={columns2}
          data={templateLetter}
          loading={loading}
        />
      </DialogBasic>
    </>
  )
}
export default DialogSelectText
