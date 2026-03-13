import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { UseGetStatusStep } from '../hooks/index'
import { FormCompanyInformation } from './form/companyProfile.tsx'
import { FaCheck } from 'react-icons/fa'
import { FormContactCompany } from './form/contactCompany.tsx'
import { FormBranding } from './form/brandingForm.tsx'
import { FormLegality } from './form/legalityForm.tsx'
import { FormSocialMedia } from './form/socialMediaForm.tsx'

export const UpdatePartnershipData = () => {
  const { id } = useParams()
  const [value, setValue] = useState('1')
  const { status } = UseGetStatusStep((id as string) ?? '')

  const tabValue = [
    {
      name: 'Informasi Perusahaan',
      value: '1',
      status: status?.informasi_perusahaan ?? false,
      element: <FormCompanyInformation setValue={setValue} />,
    },
    {
      name: 'Informasi Kontak',
      value: '2',
      status: status?.informasi_kontak ?? false,
      element: <FormContactCompany setValue={setValue} />,
    },
    {
      name: 'Branding',
      value: '3',
      status: status?.branding ?? false,
      element: <FormBranding setValue={setValue} />,
    },
    {
      name: 'Legalitas',
      value: '4',
      status: status?.legalitas ?? false,
      element: <FormLegality setValue={setValue} />,
    },
    {
      name: 'Media Sosial & Kontak Publik',
      value: '5',
      status: status?.media_social ?? false,
      element: <FormSocialMedia setValue={setValue} />,
    },
  ]

  return (
    <>
      <div className={'space-y-5 bg-white h-full'}>
        <Tabs
          className={'flex gap-5 flex-col lg:!flex-row w-full'}
          value={value}
          onValueChange={(value) => setValue(value)}
        >
          <TabsList
            className={
              'flex flex-nowrap justify-start overflow-y-hidden pb-2 lg:pb-0 overflow-x-auto lg:overflow-x-visible lg:flex-col gap-2.5 w-full lg:w-[250px] !h-full bg-white items-start'
            }
          >
            {tabValue?.map((row, index) => (
              <TabsTrigger
                key={index}
                disabled={index > 0 && !tabValue[index - 1].status}
                value={row?.value}
                className={clsx(
                  'bg-white rounded !shadow-none !drop-shadow-none',
                  'flex items-center gap-1.5 !border rounded-full !p-1.5 border-gray-500',
                  'w-full justify-start !mt-0 data-[state=active]:border-primary',
                  'data-[state=active]:text-primary group data-[state=active]:bg-green-100',
                  row.status && '!border-primary !text-primary bg-green-100'
                )}
              >
                <div
                  className={clsx(
                    'rounded-full size-6 min-w-6 bg-gray-200 group-data-[state=active]:bg-primary',
                    'group-data-[state=active]:text-white flex items-center justify-center',
                    row.status && 'bg-primary text-white'
                  )}
                >
                  {row?.status && <FaCheck className={'size-4'} />}
                </div>
                <p className={'whitespace-nowrap lg:whitespace-pre-wrap'}>{row?.name}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabValue.map((row, index) => (
            <TabsContent key={index} value={row?.value}>
              {row?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
