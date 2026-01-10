import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useSearchParams } from 'react-router-dom'
import { TAB_LIST } from '@/pages/modules/website-prodi/settings/background/data/constanta.tsx'
import { ButtonAddBackgroundProdi } from '@/pages/modules/website-prodi/settings/background/components/buttonAdd.tsx'
import { UseGetProdiBackground } from '@/pages/modules/website-prodi/settings/background/hooks'
import { ProdiLandingPageColumns } from '@/pages/modules/website-prodi/settings/background/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const BackgroundWebsiteSettings = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const context = searchParams.get('context') ?? TAB_LIST[0].value

  const { meta, prodiBackground, loading } = UseGetProdiBackground()
  const columns = ProdiLandingPageColumns()

  return (
    <>
      <Tabs
        value={context}
        onValueChange={(value) => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            params.set('context', value)
            return params
          })
        }}
        className="w-full"
      >
        <TabsList className="w-full rounded bg-white border-b-black border border-t-0 border-l-0">
          {TAB_LIST.map((item) => (
            <TabsTrigger
              className={`
                  data-[state=active]:bg-black data-[state=active]:text-white
                  rounded-t-lg rounded-b-none p-4
              `}
              key={item.value}
              value={item.value}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_LIST.map((item) => (
          <TabsContent key={item.value} value={item.value} className={'flex flex-col gap-5 mt-5'}>
            <ButtonTitleGroup
              label={'Gambar Background - ' + item?.name}
              buttonGroup={[
                {
                  type: 'custom',
                  element: <ButtonAddBackgroundProdi />,
                },
              ]}
            />

            <TableCustom data={prodiBackground} columns={columns} loading={loading} meta={meta} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
