import { UseGetNewsProdi } from '@/pages/modules/website-utama/program-studi/detail/controller/useGetNews.tsx'
import { useParams } from 'react-router-dom'
import { ProdiNewsColumns } from '@/pages/modules/website-utama/program-studi/detail/berita/cloumns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '../../../panduan/components/ButtonGoToGuide'

const NewsProgramStudyView = () => {
  const { id } = useParams()
  const { prodiNews, loading, meta } = UseGetNewsProdi(id ?? '')
  const columns = ProdiNewsColumns()

  return (
    <>
      <div className={'space-y-5'}>
        <div className='flex gap-4 items-center justify-between'>
 <p className="text-2xl text-primary font-semibold">Berita</p>
          <ButtonGoToGuide titleGuide='Berita' valueGuide="WEBSITE_UTAMA_SATUAN_ORGANISASI_BERITA" />

        </div>
       
        <TableCustom
          className={'border'}
          tdClassName={'whitespace-pre-line border'}
          columns={columns}
          meta={meta}
          data={prodiNews}
          loading={loading}
        />
      </div>
    </>
  )
}

export default NewsProgramStudyView
