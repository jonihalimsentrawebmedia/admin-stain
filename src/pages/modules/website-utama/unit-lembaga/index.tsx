import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetUnitInstitution } from '@/pages/modules/website-utama/unit-lembaga/hooks'
import { ColumnsUnitInstitution } from '@/pages/modules/website-utama/unit-lembaga/data/coloumns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { IoMdImage } from 'react-icons/io'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonGoToGuide from '../panduan/components/ButtonGoToGuide'

const UnitInstitutionPage = () => {
  const columns = ColumnsUnitInstitution()
  const { unitInstitution, loading, meta } = UseGetUnitInstitution()
  const navigate = useNavigate()
  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup
          label="Unit Lembaga"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide valueGuide="WEBSITE_UTAMA_UNIT_LEMBAGA" />,
            },
            {
              type: 'custom',
              element: (
                <Button
                  onClick={() => navigate('background')}
                  variant={'outline'}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  <IoMdImage />
                  Gambar Background
                </Button>
              ),
            },
          ]}
        />
        <TableCustom columns={columns} data={unitInstitution} loading={loading} meta={meta} />
      </div>
    </>
  )
}

export default UnitInstitutionPage
