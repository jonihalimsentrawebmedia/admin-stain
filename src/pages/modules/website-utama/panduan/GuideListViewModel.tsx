import { useSearchParams } from "react-router-dom"

import ButtonEditGuide from "./components/ButtonEditGuide"
import type { ColumnDef } from "@tanstack/react-table"
import type { GuideList } from "./data/type"
import { ButtonDeleteGuide } from "./components/ButtonDeleteGuide"


const GuideListViewModel = () => {
const [searchParams] = useSearchParams()
 const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<GuideList>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => <>{(page - 1) * limit + row?.index + 1}</>,
    },
  
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'isi',
      header: 'Isi',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div>
            <div
              className={'tiptap ProseMirror simple-editor'}
              dangerouslySetInnerHTML={{ __html: data?.isi ?? '' }}
            />

           
          </div>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex gap-2 justify-end'}>
           
            <ButtonEditGuide  data={row.original}/>
            <ButtonDeleteGuide data={row.original}/>
          </div>
        )
      },
    },
  ]
  return {
    columns
  }
}

export default GuideListViewModel
