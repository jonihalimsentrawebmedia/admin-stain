import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddInformationPublic from '../components/button/ButtonAdd'
import FormRichEditor from '../components/form/FormRichEditor'
import useGetInformationRegular from './controller/useGetInformationRegular'
import InformationRegularViewModel from './InformationRegularViewModel'
import SelectFilter from '@/components/common/filter/SelectFilter'


const InformationRegularView = () => {
  const { columns } = InformationRegularViewModel()
  const { document, loading, meta } = useGetInformationRegular({})
  return (
    <div className="flex flex-col gap-4">
      <FormRichEditor
        linkGetData="/unit-ppid/informasi-berkala"
        linkPostData="/unit-ppid/informasi-berkala"
        queryKeyGetData="/unit-ppid/informasi-berkala"
        queryKeyPostData="/unit-ppid/informasi-berkala"
        title="Informasi Berkala"
      />
    
      <ButtonAddInformationPublic
        keyLinkPost="information-regular-ppip"
        linkPost="/unit-ppid/informasi-berkala-kategori"
        title="Informasi Berkala"
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
        data={document}
        loading={loading}
        meta={meta}
      />
    </div>
  )
}

export default InformationRegularView
