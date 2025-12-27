import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { ColumnsOfficialMusic } from '@/pages/modules/website-utama/public-content/musik-resmi/types/columns.tsx'
import { UseGetOfficialMusic } from '@/pages/modules/website-utama/public-content/musik-resmi/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const OfficialMusicPage = () => {
  const navigate = useNavigate()
  const columns = ColumnsOfficialMusic()
  const { meta, officialMusic, loading } = UseGetOfficialMusic()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Data',
              onClick: () => {
                navigate('add')
              },
            },
          ]}
          label="Musik Resmi"
        />

        <TableCustom meta={meta} loading={loading} data={officialMusic} columns={columns} />
      </div>
    </>
  )
}
