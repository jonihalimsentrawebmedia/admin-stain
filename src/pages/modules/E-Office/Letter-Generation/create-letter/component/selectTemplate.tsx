import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { UseGetTypeLetters } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/hooks'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import Search from '@/components/common/table/Search.tsx'
import { UseGetTypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/hooks'
import ColumnsTypeTemplate from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/data/columns.tsx'
import { useParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { ITypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/data/types.ts'
import DialogSelectText from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/selectText.tsx'
import type { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<any>
  name: string
}

const SelectTemplateText = (props: Props) => {
  const { form, name } = props
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [idTemplate, setIdTemplate] = useState('')
  const { id } = useParams()
  const [filter, setFilter] = useState({
    search: '',
    page: '1',
    id_selected: id as string,
  })

  const { letterType } = UseGetTypeLetters({
    page: '0',
    limit: '0',
  })
  const finding = letterType?.find((row) => row?.id_mail_jenis_surat === filter.id_selected)
  const { typeTemplate, loading } = UseGetTypeTemplateLetter({
    page: filter.page,
    limit: '10',
    id_jenis_surat: filter.id_selected,
    search: filter.search,
  })
  const finding2 = typeTemplate?.find((row) => row?.id_mail_jenis_template_surat === idTemplate)

  const { columns } = ColumnsTypeTemplate()
  const columns2: ColumnDef<ITypeTemplateLetter>[] = [
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
                setOpen2(true)
                setOpen(false)
                setIdTemplate(data?.id_mail_jenis_template_surat)
              }}
            >
              Lihat Template
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
        className={'absolute left-0 top-8 text-white'}
      >
        Pilih Template
      </Button>

      <DialogBasic
        title={`Pilih Template ${finding?.nama_jenis_surat} ( ${finding?.kategori_jenis_surat} )`}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-4xl rounded'}
      >
        <div className="flex items-end gap-1.5 w-full">
          <SelectBasic
            label={'Jenis Surat'}
            placeholder={'Pilih Jenis Surat'}
            className={'flex flex-col gap-1 items-start justify-start'}
            value={filter.id_selected}
            onChange={(e) => {
              setFilter({
                ...filter,
                id_selected: e,
              })
            }}
            data={
              letterType?.map((row) => ({
                label: row?.nama_jenis_surat + ` ( ${row?.kategori_jenis_surat} )`,
                value: row?.id_mail_jenis_surat,
              })) ?? []
            }
          />
          <Search
            innerClassName={'p-1 w-full'}
            position={'end'}
            className={'w-full'}
            onSearch={(e) => {
              setFilter({
                ...filter,
                search: e,
              })
            }}
          />
        </div>
        <TableCustom
          columnsName={['action', 'urutan']}
          isShowFilter={false}
          isShowPagination={false}
          columns={columns2}
          data={typeTemplate}
          loading={loading}
        />
      </DialogBasic>

      <DialogSelectText
        id_template={idTemplate}
        open={open2}
        setOpen={setOpen2}
        rootData={finding}
        data={finding2}
        form={form}
        name={name}
        back={() => {
          setOpen(true)
          setOpen2(false)
          setIdTemplate('')
        }}
      />
    </>
  )
}

export default SelectTemplateText
