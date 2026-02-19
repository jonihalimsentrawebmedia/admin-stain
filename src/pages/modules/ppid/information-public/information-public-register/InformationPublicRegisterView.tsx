import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import { useGetInformationPublicRegister } from './controller'
import InformationPublicRegisterViewModel from './InformationPublicRegisterViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const InformationPublicRegisterView = () => {
  const { columns, goToAdd } = InformationPublicRegisterViewModel()
  const { loading, meta, information } = useGetInformationPublicRegister()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: 'Tambah Data',
            onClick: () => {
              goToAdd()
            },
            type: 'add',
          },
        ]}
        label={'Daftar Informasi Publik'}
      />
      <TableCustom
        addFilter={
          <SelectFilter
            isLabelTop
            selectClassName={'min-w-[8rem]'}
            label="Jumlah Data"
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
        data={information}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default InformationPublicRegisterView
