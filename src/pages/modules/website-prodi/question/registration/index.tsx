import { UseGetRegistrationProdi } from '@/pages/modules/website-prodi/question/registration/hooks'
import { ColumnsRegistrationProdi } from '@/pages/modules/website-prodi/question/registration/components/columns.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const RegistrationQuestionPage = () => {
  const { registrationProdi, meta, loading } = UseGetRegistrationProdi()
  const columns = ColumnsRegistrationProdi()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide valueGuide="PRODI_JALUR_PENDAFTARAN" />,
            },
          ]}
          label="Pendaftaran"
        />
        <TableCustom columns={columns} data={registrationProdi} loading={loading} meta={meta} />
      </div>
    </>
  )
}
