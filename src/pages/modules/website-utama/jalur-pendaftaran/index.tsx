import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetRegisterPath } from '@/pages/modules/website-utama/jalur-pendaftaran/hooks'
import { ColumnsRegistrationPath } from '@/pages/modules/website-utama/jalur-pendaftaran/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useNavigate } from 'react-router-dom'

export const RegistrationPathPage = () => {
  const { loading, registerPath, meta } = UseGetRegisterPath()
  const coloumns = ColumnsRegistrationPath()
  const navigate = useNavigate()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
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
          label="Jalur Pendaftaran"
        />

        <TableCustom columns={coloumns} data={registerPath} loading={loading} meta={meta} />
      </div>
    </>
  )
}
