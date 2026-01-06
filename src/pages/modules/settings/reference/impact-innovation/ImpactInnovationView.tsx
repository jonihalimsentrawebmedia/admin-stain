import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetImpactInnovation from './controller/useGetImpactInnovation'
import ImpactInnovationViewModel from './ImpactInnovationViewModel'
import ButtonAddImpactInnovation from './components/ButtonAddImpactInnovation'
import TableCustom from '@/components/common/table/TableCustom'

const ImpactInnovationView = () => {
  const { columns } = ImpactInnovationViewModel()
  const { loading, impactInnovation ,meta} = useGetImpactInnovation()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Kategori Inovasi Berdampak"
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddImpactInnovation />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={impactInnovation}
      tdClassName='whitespace-pre-line text-start'
        thClassName='whitespace-pre-line text-start'
        loading={loading}
        meta={meta}
        placeHolderSearch="Cari Kategori Inovasi Berdampak"
      />
    </div>
  )
}

export default ImpactInnovationView
