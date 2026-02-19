import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonAddDocument from '../../components/button/ButtonAddDocument'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import InfomarmationAvailableDetailViewModel from './InformationAvailableDetailViewModel'
import useGetInformationAvailableDocument from '../controller/useGetInformationAvailableDocument'

const InformationAvailableDetailView = () => {
  const { columns } = InfomarmationAvailableDetailViewModel()
  const { document, loading, meta, title, idCategory } = useGetInformationAvailableDocument({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: (
              <ButtonAddDocument
                keyLinkPost="information-available-ppip-document"
                linkPost="/unit-ppid/informasi-tersedia-dokumen"
                title="Dokumen"
                titleField={title}
                idCategory={idCategory}
                idName="id_kategori"
              />
            ),
          },
        ]}
        label={title}
        isBack
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
        isShowLimit={false}
      />
    </div>
  )
}

export default InformationAvailableDetailView
