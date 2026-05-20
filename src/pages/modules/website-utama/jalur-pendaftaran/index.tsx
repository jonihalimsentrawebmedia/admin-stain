import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetRegisterPath } from '@/pages/modules/website-utama/jalur-pendaftaran/hooks'
import { ColumnsRegistrationPath } from '@/pages/modules/website-utama/jalur-pendaftaran/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ButtonGoToGuide from '../panduan/components/ButtonGoToGuide'

export const RegistrationPathPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { loading, registerPath, meta } = UseGetRegisterPath({
    page: page,
    limit: limit,
    search: search,
  })
  const coloumns = ColumnsRegistrationPath()
  const navigate = useNavigate()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Jalur Pendaftaran"
                  valueGuide="WEBSITE_UTAMA_JALUR_PENDAFTARAN"
                />
              ),
            },
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
