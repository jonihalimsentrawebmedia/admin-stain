import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useEffect } from 'react'
import { UseGetAgendaStatus } from './hooks/index'
import { DraftSectionAgenda } from './components/table/draftSection'
import { SubmissionSectionAgenda } from './components/table/submissionSection.tsx'
import { ProcessSectionAgenda } from './components/table/processSection.tsx'
import { RejectSectionAgenda } from '@/pages/modules/website-utama/public-content/agenda/components/table/rejectSection.tsx'
import { ApprovedSectionAgenda } from '@/pages/modules/website-utama/public-content/agenda/components/table/approvedSection.tsx'
import { PublishSectionAgenda } from '@/pages/modules/website-utama/public-content/agenda/components/table/publishSection.tsx'
import { UnpublishSectionAgenda } from '@/pages/modules/website-utama/public-content/agenda/components/table/unpublishSection.tsx'

export const AgendaPage = () => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const { status } = UseGetAgendaStatus()
  const statusParams = searchParams.get('status')

  useEffect(() => {
    if (!statusParams) {
      setSearchParams({ status: 'DRAFT' })
    }
  }, [statusParams])

  const DataTabs = [
    {
      id: 1,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Draft</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">{status?.DRAFT}</div>
        </div>
      ),
      value: 'DRAFT',
      element: <DraftSectionAgenda />,
    },
    {
      id: 2,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Diajukan Ke Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.DIAJUKAN_EDITOR}
          </div>
        </div>
      ),
      value: 'DIAJUKAN_EDITOR',
      element: <SubmissionSectionAgenda />,
    },
    {
      id: 3,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Proses Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.PROSES_EDITOR}
          </div>
        </div>
      ),
      value: 'PROSES_EDITOR',
      element: <ProcessSectionAgenda />,
    },
    {
      id: 4,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Ditolak Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.TOLAK_EDITOR}
          </div>
        </div>
      ),
      value: 'TOLAK_EDITOR',
      element: <RejectSectionAgenda />,
    },
    {
      id: 5,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Disetujui Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.DISETUJUI_EDITOR}
          </div>
        </div>
      ),
      value: 'DISETUJUI_EDITOR',
      element: <ApprovedSectionAgenda />,
    },
    {
      id: 6,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Publish</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.PUBLISHED}
          </div>
        </div>
      ),
      value: 'PUBLISHED',
      element: <PublishSectionAgenda />,
    },
    {
      id: 7,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Unpublish</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.UNPUBLISH}
          </div>
        </div>
      ),
      value: 'UNPUBLISH',
      element: <UnpublishSectionAgenda />,
    },
  ]

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Agenda'}
          buttonGroup={[
            {
              type: 'add',
              label: '',
              onClick: () => {},
              element: (
                <Button
                  variant={'outline'}
                  onClick={() => navigate('add')}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  <HiPencil />
                  Tulis Agenda
                </Button>
              ),
            },
          ]}
        />

        <TabsListCustom
          value={statusParams ?? 'DRAFT'}
          onChange={(e) => {
            setSearchParams({ status: e })
          }}
          data={DataTabs}
        />
      </div>
    </>
  )
}
