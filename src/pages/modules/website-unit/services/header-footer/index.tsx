import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddServiceHeaderFooter } from '@/pages/modules/website-unit/services/header-footer/component/buttonAdd.tsx'
import { ColumnsHeaderFooterService } from '@/pages/modules/website-unit/services/header-footer/data/columns.tsx'
import { UseGetHeaderFooterService } from '@/pages/modules/website-unit/services/header-footer/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const HeaderFooterServices = () => {
  const { serviceHeaderFooter, meta, loading } = UseGetHeaderFooterService()
  const columns = ColumnsHeaderFooterService()
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Layanan Header & Footer'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Layanan Header & Footer"
                  valueGuide="PERPUSTAKAAN_LAYANAN_HEADER_FOOTER"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddServiceHeaderFooter />,
            },
          ]}
        />

        <TableCustom data={serviceHeaderFooter} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
