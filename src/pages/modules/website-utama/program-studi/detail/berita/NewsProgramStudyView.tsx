import { UseGetNewsProdi } from '@/pages/modules/website-utama/program-studi/detail/controller/useGetNews.tsx'
import { useParams } from 'react-router-dom'
import { ProdiNewsColumns } from '@/pages/modules/website-utama/program-studi/detail/berita/cloumns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const NewsProgramStudyView = () => {
  const { id } = useParams()
  const { prodiNews, loading } = UseGetNewsProdi(id ?? '')
  const columns = ProdiNewsColumns()

  return (
    <>
      <div className={'space-y-5'}>
        <p className="text-2xl text-primary font-semibold">Berita</p>
        <TableCustom
          className={'border'}
          tdClassName={'whitespace-pre-line border'}
          columns={columns}
          data={prodiNews}
          loading={loading}
        />
      </div>
    </>
  )
}

export default NewsProgramStudyView
