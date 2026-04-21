import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import ButtonAddUkkUkm from '@/pages/modules/website-utama/UKK-UKM/component/buttonAdd.tsx'
import { USeGetUkkUkm } from '@/pages/modules/website-utama/UKK-UKM/hooks'
import { ColoumnsUkkUkm } from '@/pages/modules/website-utama/UKK-UKM/data/coloumns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '../panduan/components/ButtonGoToGuide'

const UKKUKMPage = () => {
  const navigate = useNavigate()
  const { ukkUkm, loading, meta } = USeGetUkkUkm()
  const columns = ColoumnsUkkUkm()

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup
          buttonGroup={[
             {
            type: 'custom',
            element: <ButtonGoToGuide valueGuide="WEBSITE_UTAMA_UKK_UKM" />,
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
            {
              type: 'custom',
              element: <ButtonAddUkkUkm />,
            },
          ]}
          label="UKK UKM"
        />
        <TableCustom data={ukkUkm} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
export default UKKUKMPage
