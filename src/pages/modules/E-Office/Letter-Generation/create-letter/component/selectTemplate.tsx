import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import Search from '@/components/common/table/Search.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { UseGetTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/hooks'
import { UseGetTypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/hooks'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMailTypeLetterTemplate } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/data/types.ts'
import { UseGetIsiTemplateSurat } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/isi-template/hooks'
import DialogSelectText from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/selectText.tsx'

interface Props {
  form: UseFormReturn<any>
  name: string
  kode?: string
  id_jenis_surat?: string
}

const SelectTemplateText = (props: Props) => {
  const { form, name, kode, id_jenis_surat } = props
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [idTemplate, setIdTemplate] = useState('')
  const [filter, setFilter] = useState({
    search: '',
    page: '1',
    kode_template: kode as string,
  })

  const { typeTemplate, loading } = UseGetTypeTemplateLetter({
    page: '0',
    limit: '0',
    id_jenis_surat: id_jenis_surat as string,
  })

  const finding = typeTemplate?.find((row) => row?.kode_template === filter.kode_template)

  const { templateLetter } = UseGetTemplateLetter({
    page: '0',
    limit: '0',
    id_jenis_template_surat: finding?.id_mail_jenis_template_surat as string,
  })

  const { isiTemplate, loading: loadingIsi } = UseGetIsiTemplateSurat({
    page: '0',
    limit: '0',
    id_template_surat: idTemplate,
  })

  const columns: ColumnDef<IMailTypeLetterTemplate>[] = [
    {
      accessorKey: '#',
      header: '#',
      cell: ({ row }) => {
        return <>{row.index + 1}</>
      },
    },
    {
      accessorKey: 'uraian',
      header: 'Nama',
    },
    {
      accessorKey: 'action-sex',
      header: 'Aksi',
      cell: ({ row }) => {
        const item = row.original
        return (
          <Button
            variant={'outline'}
            className={'border-primary text-primary'}
            onClick={() => {
              setOpen2(true)
              setOpen(false)
              setIdTemplate(item?.id_mail_template_surat)
            }}
          >
            Lihat Isi Template
          </Button>
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
        className={'lg:absolute left-0 top-8 text-white'}
      >
        Pilih Template
      </Button>

      <DialogBasic title={''} open={open} setOpen={setOpen} className={'lg:min-w-4xl rounded'}>
        <div className="flex items-end gap-1.5 w-full">
          <SelectBasic
            label={'Jenis Surat'}
            placeholder={'Pilih Jenis Surat'}
            className={'flex flex-col gap-1 items-start justify-start'}
            value={filter.kode_template}
            onChange={(e) => {
              setFilter({
                ...filter,
                kode_template: e,
              })
            }}
            data={
              typeTemplate?.map((row) => ({
                label: row?.nama_jenis_surat + ` ( ${row?.nama_jenis_template} )`,
                value: row?.kode_template,
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
          columns={columns}
          data={templateLetter}
          loading={loading}
        />
      </DialogBasic>

      <DialogSelectText
        open={open2}
        setOpen={setOpen2}
        rootData={finding}
        data={isiTemplate ?? []}
        form={form}
        name={name}
        loading={loadingIsi}
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
