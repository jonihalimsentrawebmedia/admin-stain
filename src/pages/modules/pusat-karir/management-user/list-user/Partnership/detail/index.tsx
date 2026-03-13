import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdInfo } from 'react-icons/md'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import clsx from 'clsx'
import { FaCheck } from 'react-icons/fa'
import { CompanyInformation } from './section/infromation.tsx'
import { CompanyContact } from './section/contact.tsx'
import { CompanyBranding } from './section/branding.tsx'
import { CompanyLegality } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/detail/section/legality.tsx'
import { SocialMedia } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/detail/section/socialMedia.tsx'

export const DetailProfilePartnership = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const [value, setValue] = useState('1')

  const tabValue = [
    {
      name: 'Informasi Perusahaan',
      value: '1',
      element: <CompanyInformation />,
    },
    {
      name: 'Informasi Kontak',
      value: '2',
      element: <CompanyContact />,
    },
    {
      name: 'Branding',
      value: '3',
      element: <CompanyBranding />,
    },
    {
      name: 'Legalitas',
      value: '4',
      element: <CompanyLegality />,
    },
    {
      name: 'Media Sosial & Kontak Publik',
      value: '5',
      element: <SocialMedia />,
    },
  ]

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Detail User - Mitra Kerja'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <div className={'flex items-center gap-2'}>
                  <div className="flex items-center gap-2">
                    <div className="size-4 bg-green-500 rounded-full" />
                    Aktif
                  </div>
                  <Button
                    onClick={() =>
                      navigate(`/modules/pusat-karir/management-user/user/mitra-kerja/edit/${id}`)
                    }
                  >
                    <HiPencil />
                    Edit Data User
                  </Button>
                </div>
              ),
            },
          ]}
        />

        <div
          className={
            'text-blue-700 border border-blue-500 p-1.5 px-3 rounded-full w-fit flex gap-2 items-center'
          }
        >
          <MdInfo className={'text-primary-500  size-4'} />
          Silahkan lakukan perubahan informasi User. Perubahan akan disimpan setelah tombol{' '}
          {`"Simpan Perubahan"`} Diklik.
        </div>

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
                value={row?.value}
                className={clsx(
                  'bg-white rounded !shadow-none !drop-shadow-none',
                  'flex items-center gap-1.5 !border rounded-full !p-1.5 border-gray-500',
                  'w-full justify-start !mt-0 data-[state=active]:border-primary',
                  'data-[state=active]:text-primary group data-[state=active]:bg-green-100',
                  '!border-primary !text-primary bg-green-100'
                )}
              >
                <div
                  className={clsx(
                    'rounded-full size-6 min-w-6 bg-gray-200 group-data-[state=active]:bg-primary',
                    'group-data-[state=active]:text-white flex items-center justify-center',
                    'bg-primary text-white'
                  )}
                >
                  <FaCheck className={'size-4'} />
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
