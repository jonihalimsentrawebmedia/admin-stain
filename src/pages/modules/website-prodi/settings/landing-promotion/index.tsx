import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPromotionLanding } from './components/buttonAdd'
import { DataLandingPromotion } from '@/pages/modules/website-prodi/settings/landing-promotion/data/constanta.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { UseLandingPromotion } from '@/pages/modules/website-prodi/settings/landing-promotion/hooks'
import { ProdiLandingPromotionColumns } from '@/pages/modules/website-prodi/settings/landing-promotion/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const LandingPromotion = () => {
  const { landingPromotion, meta, loading } = UseLandingPromotion()
  const columns = ProdiLandingPromotionColumns()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Landing Page Promosi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPromotionLanding />,
            },
          ]}
        />

        <Accordion
          type={'single'}
          defaultValue={'data'}
          className={'border-blue-500 border'}
          collapsible
        >
          <AccordionCustom
            headertClassName={'bg-blue-100 rounded'}
            contentClassName={'bg-blue-100 rounded'}
            name={'data'}
            title={'Keterangan Posisi Landing Page Promosi'}
          >
            <ol className="space-y-3 list-decimal  pl-5">
              {DataLandingPromotion.map((item) => (
                <li key={item.id}>
                  <p className="font-medium">{item.title}</p>
                  <div className="ml-5 mt-1 space-y-1 text-sm text-gray-700">
                    {item.items.map((detail, index) => (
                      <p key={index}>
                        <span className="font-semibold">{detail.label}:</span> {detail.value}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </AccordionCustom>
        </Accordion>

        <TableCustom data={landingPromotion} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
