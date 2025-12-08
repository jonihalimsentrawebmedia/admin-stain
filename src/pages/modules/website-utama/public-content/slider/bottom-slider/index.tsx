import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useEffect } from 'react'
import { UseGetStatusBottomSlider } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/hooks'
import { ButtomSubmitSection } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/components/table/submitSection.tsx'
import { EditorProcessSection } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/components/table/editorProcesSection.tsx'
import { BottomDraftSection } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/components/table/draftSection.tsx'
import { BottomRejectSection } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/components/table/RejectSection.tsx'
import { BottomEditorApproveSection } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/components/table/EditorApproveSection.tsx'
import { BottomPublishSection } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/components/table/publishSection.tsx'
import { UnPublishSectionBottom } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/components/table/unpublishSection.tsx'

export const BottomSliderPublicContent = () => {
  const navigate = useNavigate()
  const { status } = UseGetStatusBottomSlider()

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
      element: <BottomDraftSection />,
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
      element: <ButtomSubmitSection />,
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
      element: <BottomRejectSection />,
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
      element: <BottomEditorApproveSection />,
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
      element: <BottomPublishSection />,
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
      element: <UnPublishSectionBottom />,
    },
  ]

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Slider Bawah'}
          buttonGroup={[
            {
              label: 'Tambah Data',
              type: 'add',
              onClick: () => navigate('add'),
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
