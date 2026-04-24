import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsFacultyNews } from '@/pages/modules/website-fakultas/about-faculty/news/columns.tsx'
import { UseGetFacultyNews } from '@/pages/modules/website-fakultas/public-content/news/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const NewsFaculty = () => {
  const columns = ColumnsFacultyNews()
  const { unitNews, loading, meta } = UseGetFacultyNews()
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Berita'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Berita'}
                  valueGuide="FAKULTAS_PROFIL_BERITA"
                />
              ),
            },
          ]}
        />
        <TableCustom data={unitNews} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
