import { UseGetRegistrationProdi } from '@/pages/modules/website-prodi/question/registration/hooks'
import { ColumnsRegistrationProdi } from '@/pages/modules/website-prodi/question/registration/components/columns.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const RegistrationQuestionPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { registrationProdi, meta, loading } = UseGetRegistrationProdi({
    limit: limit,
    page: page,
    search: search,
  })
  const columns = ColumnsRegistrationProdi()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide="Pendaftaran" valueGuide="PRODI_JALUR_PENDAFTARAN" />
              ),
            },
          ]}
          label="Pendaftaran"
        />
        <TableCustom columns={columns} data={registrationProdi} loading={loading} meta={meta} />
      </div>
    </>
  )
}
