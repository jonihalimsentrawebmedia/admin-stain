import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetStandartService from './controller/useGetRegulationPublic'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import RegulationPublicViewModel from './RegulationPublicViewModel'
import ButtonAddDocument from '../../information-public/components/button/ButtonAddDocument'

const RegulationPublicView = () => {
  const { columns } = RegulationPublicViewModel()
  const { document, loading, meta, title } = useGetStandartService({})
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
                keyLinkPost="ppip-regulasi-public"
                linkPost="/unit-ppid/regulasi-public-dokumen"
                title="Dokumen"
                titleField={title}
                idCategory={undefined}
                idName="id_kategori"
              />
            ),
          },
        ]}
        label={'Regulasi Mengenai Keterbukaan Informasi Publik'}
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

export default RegulationPublicView
