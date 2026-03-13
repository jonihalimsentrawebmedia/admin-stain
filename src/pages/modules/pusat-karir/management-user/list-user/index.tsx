import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'
import { BottonSelectTypeUser } from '@/pages/modules/pusat-karir/management-user/list-user/component/ButtonAdd.tsx'
import { JobsSeekersTableList } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers'
import { PartnershipListData } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership'

export const ManagementListUserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type') ?? 'PENCARI_KERJA'

  const HandleTabs = (value: string) => {
    const params = new URLSearchParams()
    params.append('type', value)
    setSearchParams(params)
  }

  const TabsData = [
    {
      value: 'PENCARI_KERJA',
      label: 'Pencari Kerja',
      element: <JobsSeekersTableList />,
    },
    {
      value: 'MITRA_KERJA',
      label: 'Mitra Kerja',
      element: <PartnershipListData />,
    },
  ]

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          label={'Daftar User'}
          buttonGroup={[
            {
              type: 'custom',
              element: <BottonSelectTypeUser />,
            },
          ]}
        />

        <Tabs value={type} onValueChange={(e) => HandleTabs(e)} className="w-full">
          <TabsList className={'bg-white rounded w-full! h-full! flex gap-x-4'}>
            {TabsData?.map((row, k) => (
              <TabsTrigger
                key={k}
                value={row?.value}
                className={clsx(
                  'rounded! shadow-none! border border-primary',
                  'data-[state=active]:bg-primary data-[state=active]:text-white p-2'
                )}
              >
                {row?.label}
              </TabsTrigger>
            ))}
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
