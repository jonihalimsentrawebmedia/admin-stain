import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetStandartService from './controller/useGetStandartService'
import StandartServiceViewModel from './StandartServiceViewModel'
import ButtonAddDocument from '../components/button/ButtonAddDocument'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const StandartServiceView = () => {
  const { columns } = StandartServiceViewModel()
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
                keyLinkPost="ppip-standart-service"
                linkPost="/unit-ppid/standard-pelayanan-informasi-public"
                title="Dokumen"
                titleField={title}
                idCategory={undefined}
                idName="id_kategori"
              />
            ),
          },
        ]}
        label={"Standar Pelayanan Informasi Publik"}
  
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
            thClassName='whitespace-pre-line!'
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default StandartServiceView
