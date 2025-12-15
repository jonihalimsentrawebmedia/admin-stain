import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddStructureOrganization } from '../structure-organization/components/buttonAdd.tsx'
import { GroupOrganizationColumns } from '../structure-organization/data/columns.tsx'
import {
  UseGetStructureBackground,
  UseStructureOrganization,
} from '@/pages/modules/website-utama/public-content/structure-organization/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoWarning } from 'react-icons/io5'
import { Image } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const StructureOrganizationPage = () => {
  const columns = GroupOrganizationColumns()
  const { listGroupOrganization, meta, loading } = UseStructureOrganization()
  const { background } = UseGetStructureBackground()

  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Struktur Organisasi'}
          buttonGroup={[
            {
              type: 'custom',
              element:
                background?.length === 0 ? (
                  <Button
                    onClick={() => navigate('background')}
                    variant={'outline'}
                    className="border border-red-500 hover:text-red-500 text-red-500"
                  >
                    <IoWarning className="text-red- hover:text-red-500 size-6" />
                    Gambar Background Belum Ada
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('background')}
                    variant={'outline'}
                    className="border border-primary text-primary hover:text-primary"
                  >
                    <Image className="text-primary" />
                    Gambar Background
                  </Button>
                ),
            },
            {
              type: 'add',
              label: '',
              onClick: () => {},
              element: <ButtonAddStructureOrganization />,
            },
          ]}
        />

        <TableCustom
          meta={meta}
          loading={loading}
          thClassName={'bg-primary-foreground'}
          data={listGroupOrganization}
          columns={columns}
        />
      </div>
    </>
  )
}
