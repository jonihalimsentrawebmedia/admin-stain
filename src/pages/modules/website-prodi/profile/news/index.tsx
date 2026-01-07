import { UseGetProdiNews } from '@/pages/modules/website-prodi/public-content/news/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ProfileNewsColumns } from '@/pages/modules/website-prodi/profile/news/data/columns.tsx'

export const NewsPublishedProfile = () => {
  const { loading, prodiNews, meta } = UseGetProdiNews({
    status_publish: 'PUBLISHED',
  })

  const columns = ProfileNewsColumns()

  return (
    <>
      <div className={'space-y-5'}>
        <p className="text-2xl text-primary font-semibold">Berita</p>
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
