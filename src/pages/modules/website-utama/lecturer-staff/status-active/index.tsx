import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetStatusActive } from '@/pages/modules/website-utama/lecturer-staff/status-active/hooks'
import ButtonAddStatusActive from '@/pages/modules/website-utama/lecturer-staff/status-active/component/buttonAdd.tsx'
import { ColumnsStatusActive } from '@/pages/modules/website-utama/lecturer-staff/status-active/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

const StatusActivePage = () => {
  const { statusActive, loading, meta } = UseGetStatusActive()
  const coloumns = ColumnsStatusActive()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label="Status Aktif Kepegawaian"
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Data Dosen dan Staff"
                  valueGuide="WEBSITE_UTAMA_DOSEN_STAFF_SET_STATUS"
                />
              ),
            },
            { type: 'custom', element: <ButtonAddStatusActive /> },
          ]}
        />

        <TableCustom columns={coloumns} data={statusActive} loading={loading} meta={meta} />
      </div>
    </>
  )
}

export default StatusActivePage
