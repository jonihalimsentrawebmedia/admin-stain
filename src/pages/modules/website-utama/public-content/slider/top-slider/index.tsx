import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { UseGetStatusSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/hooks'
import { useEffect } from 'react'
import { DraftSection } from './components/table/draftSection.tsx'
import { SubmitSection } from './components/table/submitSection.tsx'
import { PublishSection } from './components/table/publishSection.tsx'
import { UnPublishSection } from './components/table/unpublishSection.tsx'
import { EditorProcessSection } from './components/table/editorProcesSection.tsx'
import { RejectSection } from './components/table/RejectSection.tsx'
import { EditorApproveSection } from './components/table/EditorApproveSection'
import { toast } from 'react-toastify'

export const TopSliderPublicContent = () => {
  const navigate = useNavigate()
  const { status } = UseGetStatusSlider()

  const [searchParams, setSearchParams] = useSearchParams()

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
      element: <DraftSection />,
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
      element: <SubmitSection />,
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
      element: <EditorProcessSection />,
    },
    {
      id: 4,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Ditolak Ke Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.TOLAK_EDITOR}
          </div>
        </div>
      ),
      value: 'TOLAK_EDITOR',
      element: <RejectSection />,
    },
    {
      id: 5,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Disetujui Ke Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {status?.DISETUJUI_EDITOR}
          </div>
        </div>
      ),
      value: 'DISETUJUI_EDITOR',
      element: <EditorApproveSection />,
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
      element: <PublishSection />,
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
      element: <UnPublishSection />,
    },
  ]

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Slider Atas'}
          buttonGroup={[
            {
              label: 'Tambah Data',
              type: 'add',
              onClick: () => {
                if (status && status?.DRAFT > 0) {
                  toast.info('Silahkan Ajukan Data Terlebih Dahulu')
                } else {
                  navigate('add')
                }
              },
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
