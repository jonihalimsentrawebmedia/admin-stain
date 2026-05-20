import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ServicesViewModel from './ServicesViewModel'
import useGetServices from './controller/useGetServices'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import ButtonAddServices from './components/ButtonAddServices'
import ButtonGoToGuide from '../panduan/components/ButtonGoToGuide'
import { Button } from '@/components/ui/button.tsx'
import { FaListUl } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ServicesView = () => {
  const { columns } = ServicesViewModel()
  const { loading, meta, serviceList } = useGetServices()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'custom',
            element: <ButtonGoToGuide titleGuide="Layanan" valueGuide="WEBSITE_UTAMA_LAYANAN" />,
          },
          {
            type: 'custom',
            element: (
              <Button
                variant={'outline'}
                className={'border-primary text-primary hover:text-primary'}
                onClick={() => {
                  navigate('academic-resource')
                }}
              >
                <FaListUl />
                Academic Resource
              </Button>
            ),
          },
          {
            type: 'custom',
            element: <ButtonAddServices />,
          },
        ]}
        label="Layanan"
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
        columns={columns}
        data={serviceList}
        meta={meta}
        loading={loading}
        isShowLimit={false}
      />
    </div>
  )
}

export default ServicesView
