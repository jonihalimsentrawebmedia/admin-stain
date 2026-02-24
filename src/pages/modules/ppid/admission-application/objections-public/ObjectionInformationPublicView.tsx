import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import { useGetObjectionsPublic } from './hooks'
import ObjectionInformationPublicViewModel from './ObjectionInformationPublicViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const ObjectionInformationPublicView = () => {
  const { columns } = ObjectionInformationPublicViewModel()
  const { loading, objecionsPublic, meta } = useGetObjectionsPublic({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Keberatan Atas Layanan Informasi Publik" />

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
        data={objecionsPublic}
        meta={meta}
        loading={loading}
        isShowLimit={false}
        thClassName="whitespace-pre-line"
        tdClassName="whitespace-pre-line"
      />
    </div>
  )
}

export default ObjectionInformationPublicView
