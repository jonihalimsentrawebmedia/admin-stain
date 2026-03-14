import { type Status, UseGetVerificationPartnership } from './hooks/index'
import { useState } from 'react'
import {
  ColumnsPendingPartnership,
  ColumnsRejectPartnership,
  ColumnsRevisionPartnership,
} from './data/columns'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'
import { MdInfo } from 'react-icons/md'
import { ButtonApproveAll } from './component/buttonApproveAll.tsx'
import { ButtonRejectAll } from './component/buttonRejectAll.tsx'
import { ButtonPendingAll } from './component/buttonPendingAll.tsx'

export const PartnershipUserVerification = () => {
  const [status, setStatus] = useState<Status>('PENDING')
  const { verification, loading: loadVerification } = UseGetVerificationPartnership({
    status: status,
  })

  const columns1 = ColumnsPendingPartnership()
  const columns2 = ColumnsRevisionPartnership()
  const columns3 = ColumnsRejectPartnership()

  const [collectId, setCollectId] = useState<string[]>([])

  const TabsData = [
    {
      value: 'PENDING',
      label: 'Pending',
      element: (
        <>
          <div
            className={clsx(
              'border border-blue-700 text-blue-700 w-fit rounded-full',
              ' px-3 p-1.5 my-4 flex items-center gap-1.5'
            )}
          >
            <MdInfo className={'size-5'} />
            Data pendaftar yang belum verifkasi email akan otomatis terhapus dalam 24 jam setelah
            mendaftar.
          </div>
          <TableBasic
            columns={columns1 as any}
            data={verification as any}
            loading={loadVerification}
            rowIdKey={'id_pencari_kerja'}
            onSelectedRowsChange={setCollectId}
          />
        </>
      ),
    },
    {
      value: 'REVISI',
      label: 'Revisi',
      element: (
        <>
          <div
            className={clsx(
              'border border-blue-700 text-blue-700 w-fit rounded-full',
              ' px-3 p-1.5 my-4 flex items-center gap-1.5'
            )}
          >
            <MdInfo className={'size-5'} />
            Untuk data yang sudah direvisi, data akan kembali masuk ke status <b>“Pending”</b>
          </div>
          <TableBasic
            columns={columns2 as any}
            data={verification as any}
            loading={loadVerification}
            rowIdKey={'id_pencari_kerja'}
            onSelectedRowsChange={setCollectId}
          />
        </>
      ),
    },
    {
      value: 'DITOLAK',
      label: 'Ditolak',
      element: (
        <>
          <div
            className={clsx(
              'border border-blue-700 text-blue-700 w-fit rounded-full',
              ' px-3 p-1.5 my-4 flex items-center gap-1.5'
            )}
          >
            <MdInfo className={'size-5'} />
            Email dari pendaftar yang ditolak tidak dapat digunakan lagi.
          </div>
          <TableBasic
            columns={columns3 as any}
            data={verification as any}
            loading={loadVerification}
            rowIdKey={'id_pencari_kerja'}
            onSelectedRowsChange={setCollectId}
          />
        </>
      ),
    },
  ]

  return (
    <>
      <Tabs
        value={status}
        onValueChange={(e) => {
          setStatus(e as Status)
        }}
        className="w-full"
      >
        <TabsList
          className={
            'bg-white w-full! h-full! flex rounded-full! overflow-hidden border-primary border p-0!'
          }
        >
          {TabsData?.map((row, k) => (
            <TabsTrigger
              key={k}
              value={row?.value}
              className={clsx(
                'rounded-none! shadow-none! border-x-primary',
                'data-[state=active]:bg-primary data-[state=active]:text-white p-2',
                k == 0 && 'rounded-l-full border-l-0',
                TabsData.length - 1 === k && 'border-r-0'
              )}
            >
              {row?.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TabsData?.map((row, k) => (
          <TabsContent key={k} value={row?.value}>
            {collectId.length > 0 && (
              <div className="border border-primary p-2 mt-4 flex items-center justify-between rounded">
                <p className="text-primary">Verifikasi Sekaligus</p>
                <div className={'flex items-center gap-1.5'}>
                  {collectId.length} Dipilih
                  <ButtonRejectAll setCollect={setCollectId} collect={collectId} status={status} />
                  {status === 'PENDING' && (
                    <ButtonApproveAll
                      status={status}
                      collect={collectId}
                      setCollect={setCollectId}
                    />
                  )}
                  {(status === 'REVISI' || status === 'DITOLAK') && (
                    <ButtonPendingAll
                      status={status}
                      collect={collectId}
                      setCollect={setCollectId}
                    />
                  )}
                </div>
              </div>
            )}
            {row?.element}
            {collectId.length > 0 && (
              <div className="border border-primary p-2 mt-4 flex items-center justify-between rounded">
                <p className="text-primary">Verifikasi Sekaligus</p>
                <div className={'flex items-center gap-1.5'}>
                  {collectId.length} Dipilih
                  <ButtonRejectAll setCollect={setCollectId} collect={collectId} status={status} />
                  {status === 'PENDING' && (
                    <ButtonApproveAll
                      status={status}
                      collect={collectId}
                      setCollect={setCollectId}
                    />
                  )}
                  {(status === 'REVISI' || status === 'DITOLAK') && (
                    <ButtonPendingAll
                      status={status}
                      collect={collectId}
                      setCollect={setCollectId}
                    />
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
