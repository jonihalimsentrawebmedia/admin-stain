import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'
import { FormAbout } from './component/formAbout.tsx'
import { useState } from 'react'
import VisionMissionForm from './component/formVision.tsx'
import OrganizationalStructureForm from './component/formOrganization.tsx'
import ContactUsForm from './component/formContact.tsx'
import { UseGetUkkUkmDetail } from '../hooks/index.tsx'

const DetailUkkUKMPage = () => {
  const { id } = useParams()
  const { ukkUkm: detail } = UseGetUkkUkmDetail((id as string) ?? '')

  const [tabsValue, setTabsValue] = useState('about')

  const TabsData = [
    { name: 'Gambaran Umum', value: 'about', element: <FormAbout detail={detail as any} /> },
    { name: 'Visi, Misi, & Tujuan', value: 'vision', element: <VisionMissionForm /> },
    {
      name: 'Struktur Organisasi',
      value: 'organization',
      element: <OrganizationalStructureForm />,
    },
    { name: 'Hubungi Kami', value: 'contact', element: <ContactUsForm /> },
  ]

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup label="Detail Unit Lembaga" isBack buttonGroup={[]} />

        <p className="text-gray-500 font-semibold">Nama Unit - Lembaga</p>
        <p className="text-primary font-semibold text-2xl">{detail?.nama_ukk_ukm}</p>

        <Separator />

        <Tabs
          className={'w-full h-full bg-white flex-col lg:flex-row'}
          value={tabsValue}
          onValueChange={setTabsValue}
        >
          <TabsList
            className={
              'w-full lg:w-auto h-auto lg:h-full flex flex-col gap-2 lg:max-w-[200px] bg-white border p-4 rounded'
            }
          >
            {TabsData.map((row, k) => (
              <TabsTrigger
                value={row?.value}
                key={k}
                className={clsx(
                  'w-full border p-1.5 text-gray-400 rounded',
                  'data-[state=active]:bg-primary/10 data-[state=active]:text-primary',
                  'data-[state=active]:border-primary'
                )}
              >
                <div className="flex items-center w-full text-start justify-start gap-1.5">
                  {IconFlower(row?.value === tabsValue)}
                  {row?.name}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          {TabsData.map((row, k) => (
            <TabsContent value={row?.value} key={k}>
              {row?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
export default DetailUkkUKMPage

function IconFlower(isActive: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.7998 19.2002C16.7997 21.8511 14.6509 24 12 24C9.34913 24 7.2003 21.851 7.2002 19.2002V16.7998H16.7998V19.2002ZM7.2002 16.7998H4.7998C2.14893 16.7997 0 14.6509 0 12C9.79241e-06 9.34911 2.14893 7.2003 4.7998 7.2002H7.2002V16.7998ZM19.2002 7.2002C21.8511 7.2003 24 9.34911 24 12C24 14.6509 21.8511 16.7997 19.2002 16.7998H16.7998V7.2002H19.2002ZM12 0C14.6509 0 16.7997 2.14893 16.7998 4.7998V7.2002H7.2002V4.7998C7.2003 2.14895 9.34913 3.96847e-05 12 0Z"
        fill={isActive ? '#008744' : '#DFDFDF'}
      />
      <circle cx="12.0001" cy="12" r="2.88" fill={isActive ? '#008744' : '#DFDFDF'} />
    </svg>
  )
}
