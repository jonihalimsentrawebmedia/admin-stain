import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsFacultyNews } from '@/pages/modules/website-fakultas/about-faculty/news/columns.tsx'
import { UseGetFacultyNews } from '@/pages/modules/website-fakultas/public-content/news/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const NewsFaculty = () => {
  const columns = ColumnsFacultyNews()
  const { unitNews, loading, meta } = UseGetFacultyNews()
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup label={'Berita'} buttonGroup={[]} />
        <TableCustom data={unitNews} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
