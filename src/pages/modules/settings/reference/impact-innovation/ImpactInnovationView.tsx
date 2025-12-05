import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetImpactInnovation from './controller/useGetImpactInnovation'
import ImpactInnovationViewModel from './ImpactInnovationViewModel'
import ButtonAddImpactInnovation from './components/ButtonAddImpactInnovation'
import TableCustom from '@/components/common/table/TableCustom'

const ImpactInnovationView = () => {
  const { columns } = ImpactInnovationViewModel()
  const { loading, impactInnovation } = useGetImpactInnovation()
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
        thClassName="text-start"
        tdClassName="text-start"
        loading={loading}
        placeHolderSearch="Cari Kategori Inovasi Berdampak"
      />
    </div>
  )
}

export default ImpactInnovationView
