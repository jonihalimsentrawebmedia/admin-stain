import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddInformationPublic from '../components/button/ButtonAdd'
import FormRichEditor from '../components/form/FormRichEditor'
import useGetInformationRegular from './controller/useGetInformationAvailable'
import InformationRegularViewModel from './InformationAvailableViewModel'
import SelectFilter from '@/components/common/filter/SelectFilter'

const InformationAvailableView = () => {
  const { columns } = InformationRegularViewModel()
  const { document, loading, meta } = useGetInformationRegular({})
  return (
    <div className="flex flex-col gap-4">
      <FormRichEditor
        linkGetData="/unit-ppid/informasi-tersedia"
        linkPostData="/unit-ppid/informasi-tersedia"
        queryKeyGetData="/unit-ppid/informasi-tersedia"
        queryKeyPostData="/unit-ppid/informasi-tersedia"
        title="Informasi Informasi Tersedia Setiap Saat"
      />
      <ButtonAddInformationPublic
        keyLinkPost="information-available-ppip"
        linkPost="/unit-ppid/informasi-tersedia-kategori"
        title="Informasi Informasi Tersedia Setiap Saat"
        
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
            thClassName='whitespace-pre-line!'
      />
    </div>
  )
}

export default InformationAvailableView
