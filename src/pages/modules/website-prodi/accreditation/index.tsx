import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddAccreditationProdi from '@/pages/modules/website-prodi/accreditation/components/buttonAdd.tsx'
import { UseGetAccreditationProdi } from '@/pages/modules/website-prodi/accreditation/hooks'
import { AccreditationColumns } from '@/pages/modules/website-prodi/accreditation/components/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetProdiSession } from '@/pages/modules/website-prodi/hooks'

export const AccreditationProdiPage = () => {
  const { session } = UseGetProdiSession()
  const { accreditation, loading, meta } = UseGetAccreditationProdi()
  const columns = AccreditationColumns(session)

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Akreditasi'}
          buttonGroup={[
            { type: 'custom', element: <ButtonAddAccreditationProdi session={session} /> },
          ]}
        />

        <TableCustom data={accreditation} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
