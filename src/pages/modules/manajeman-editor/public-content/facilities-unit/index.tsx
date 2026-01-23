import {  useSearchParams } from 'react-router-dom'
import type { StatusPublish } from '@/pages/modules/website-unit/public-content/news/data/types.ts'
import { useEffect } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { TableDataListFacilities } from './components/facilitiesList'
import { UseGetFacilitiesUnitStatus } from './hooks'

export const FacilitiesUnitEditor = () => {

  const { status } = UseGetFacilitiesUnitStatus()

  const [searchParams, setSearchParams] = useSearchParams()
  const statusParams = searchParams.get('status') as StatusPublish

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
      element: <TableDataListFacilities status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListFacilities status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListFacilities status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListFacilities status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListFacilities status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListFacilities status={statusParams ?? 'DRAFT'} />,
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
      element: <TableDataListFacilities status={statusParams ?? 'DRAFT'} />,
    },
  ]
  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Fasilitas Unit'}
          buttonGroup={[]}
        />

        <TabsListCustom
          triggerClassName={
            'border-primary rounded-none data-[state=active]:bg-primary data-[state=active]:text-white text-black'
          }
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
