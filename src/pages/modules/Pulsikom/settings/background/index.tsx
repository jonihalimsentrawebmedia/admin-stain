import { useSearchParams } from 'react-router-dom'
import { PULSIKOMMENU } from './data/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddBackground from './component/buttonAdd'
import { type Context, UseGetListBackground } from './hooks/index'
import { ColumnsBackground } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const SettingsBackground = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const context = searchParams.get('context') ?? PULSIKOMMENU[0].value

  const { meta, background, loading } = UseGetListBackground({
    page: page,
    limit: limit,
    search: search,
    context: context as Context,
  })
  const columns = ColumnsBackground()

  return (
    <>
      <div className="flex justify-end mb-4">
        <ButtonGoToGuide
          titleGuide={'Gambar Background'}
          valueGuide="PUSILKOM_PENGATURAN_BACKGROUND"
        />
      </div>
      <Tabs
        value={context}
        onValueChange={(value) => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            params.set('context', value)
            return params
          })
        }}
        className="w-full !shadow-none !drop-shadow-none"
      >
        <TabsList className="w-full rounded-none !shadow-none !drop-shadow-none bg-white border-b-black border border-t-0 border-l-0">
          {PULSIKOMMENU.map((item) => (
            <TabsTrigger
              className={`
                  data-[state=active]:bg-black data-[state=active]:text-white
                  rounded-t-lg rounded-b-none p-4 shadow-none drop-shadow-none
              `}
              key={item.value}
              value={item.value}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {PULSIKOMMENU.map((item) => (
          <TabsContent key={item.value} value={item.value} className={'flex flex-col gap-5 mt-5'}>
            <ButtonTitleGroup
              label={'Gambar Background - ' + item?.name}
              buttonGroup={[
                {
                  type: 'custom',
                  element: <ButtonAddBackground />,
                },
              ]}
            />

            <TableCustom
              isShowFilter={false}
              data={background}
              columns={columns}
              loading={loading}
              meta={meta}
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
