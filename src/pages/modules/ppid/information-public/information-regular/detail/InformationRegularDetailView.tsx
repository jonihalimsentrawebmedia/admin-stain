import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetInformationRegularDocument from '../controller/useGetInformationRegularDocument'
import InformationRegularDetailViewModel from './InformationRegularDetailViewModel'
import ButtonAddDocument from '../../components/button/ButtonAddDocument'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const InformationRegularDetailView = () => {
  const { columns } = InformationRegularDetailViewModel()
  const { document, loading, meta, title, idCategory } = useGetInformationRegularDocument({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        link="/modules/ppid/information-public/information-regular"
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: (
              <ButtonAddDocument
                keyLinkPost="information-regular-ppip-document"
                linkPost="/unit-ppid/informasi-berkala-dokumen"
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

export default InformationRegularDetailView
