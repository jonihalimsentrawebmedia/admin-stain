import { UseGetProdiNews } from '@/pages/modules/website-prodi/public-content/news/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ProfileNewsColumns } from '@/pages/modules/website-prodi/profile/news/data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const NewsPublishedProfile = () => {
  const { loading, prodiNews, meta } = UseGetProdiNews({
    status_publish: 'PUBLISHED',
  })

  const columns = ProfileNewsColumns()

  return (
    <>
      <div className={'space-y-5'}>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
          <p className="text-xl sm:text-2xl text-primary font-semibold">Berita</p>

          <ButtonGoToGuide titleGuide='Berita' valueGuide="PRODI_PROFIL_BERITA" />
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
