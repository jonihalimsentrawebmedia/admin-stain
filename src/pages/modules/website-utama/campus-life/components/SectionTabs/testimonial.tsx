import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddTestimonial } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/Testimoni/buttonAdd.tsx'
import { UseGetCampusTestimonial } from '@/pages/modules/website-utama/campus-life/hooks'
import { TestimonialColumns } from '@/pages/modules/website-utama/campus-life/types/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const TestimonialSection = () => {
  const { testimonial, meta, loading } = UseGetCampusTestimonial()
  const columns = TestimonialColumns()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Testimoni'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddTestimonial />,
            },
          ]}
        />

        <TableCustom
          addFilter={
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Tampilkan"
              name={'limit'}
              options={[
                { label: '10 Data', value: '10' },
                { label: '25 Data', value: '25' },
                { label: '50 Data', value: '50' },
                { label: '100 Data', value: '100' },
              ]}
            />
          }
          data={testimonial}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
