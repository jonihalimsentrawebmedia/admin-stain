import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import { ButtonRevision } from './component/buttonRevision.tsx'
import { ButtonReject } from './component/buttonReject.tsx'
import { ButtonApprove } from './component/buttonApprove.tsx'
import { ButtonPending } from './component/buttonPending.tsx'
import { clsx } from 'clsx'
import { UseGetDetailVerificationPartnership } from '../hooks/index.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { useState } from 'react'

export const DetailDataCompanyVerification = () => {
  const { id } = useParams()
  const { detail } = UseGetDetailVerificationPartnership((id as string) ?? '')

  const [tabActive, setTabActive] = useState('step_1')

  const TabsData = [
    {
      value: 'step_1',
      label: 'Informasi Perusahaan',
      element: <></>,
    },
    {
      value: 'step_2',
      label: 'Informasi Kontak',
      element: <></>,
    },
  ]

  return (
    <>
      <div className={'space-y-4 bg-white p-5'}>
        <ButtonTitleGroup
          label={'Periksa Data User - Pencari Kerja'}
          buttonGroup={[
            {
              type: 'custom',
              element: detail?.status_pendaftaran !== 'REVISI' && <ButtonRevision data={detail} />,
            },
            {
              type: 'custom',
              element: detail?.status_pendaftaran !== 'DITOLAK' && <ButtonReject data={detail} />,
            },
            {
              type: 'custom',
              element: detail?.status_pendaftaran === 'PENDING' && <ButtonApprove data={detail} />,
            },
            {
              type: 'custom',
              element: (detail?.status_pendaftaran === 'REVISI' ||
                detail?.status_pendaftaran === 'DITOLAK') && <ButtonPending data={detail} />,
            },
          ]}
        />

        <div
          className={clsx(
            'border border-blue-700 text-blue-700 w-fit rounded-full',
            ' px-3 p-1.5 my-4 flex items-center gap-1.5'
          )}
        >
          <MdInfo className={'size-5'} />
          Pasitkan data yang diisi benar.
        </div>

        <Tabs className={'mt-5'} value={tabActive} onValueChange={(e) => setTabActive(e)}>
          <TabsList className={'bg-white rounded w-fit h-full! flex gap-x-4'}>
            {TabsData?.map((row, k) => {
              return (
                <TabsTrigger
                  key={k}
                  value={row?.value}
                  className={clsx(
                    'shadow-none! border! border-primary rounded-full text-gray-400 p-1.5 px-3',
                    'group data-[state=active]:text-primary'
                  )}
                >
                  <div
                    className={clsx(
                      'rounded-full p-1.5 text-xs size-7 text-primary bg-muted',
                      'flex items-center justify-center group-data-[state=active]:bg-primary',
                      'group-data-[state=active]:text-white'
                    )}
                  >
                    {k + 1}.
                  </div>{' '}
                  {row?.label}
                </TabsTrigger>
              )
            })}
          </TabsList>
          {TabsData?.map((row, k) => (
            <TabsContent key={k} value={row?.value}>
              {row?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
