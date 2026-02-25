import { useSearchParams } from 'react-router-dom'
import { PPID_MENU } from './data/constanta'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddBackgroundPPID from './component/buttonAdd'
import { type Context, UseGetListBackground } from './hooks/index'
import { ColumnsBackground } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const SettingsBackground = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const context = searchParams.get('context') ?? PPID_MENU[0].value

  const { meta, background, loading } = UseGetListBackground(context as Context)
  const columns = ColumnsBackground()

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
        className="w-full !shadow-none !drop-shadow-none"
      >
        <TabsList className="w-full rounded-none !shadow-none !drop-shadow-none bg-white border-b-black border border-t-0 border-l-0">
          {PPID_MENU.map((item) => (
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

        {PPID_MENU.map((item) => (
          <TabsContent key={item.value} value={item.value} className={'flex flex-col gap-5 mt-5'}>
            <ButtonTitleGroup
              label={'Gambar Background - ' + item?.name}
              buttonGroup={[
                {
                  type: 'custom',
                  element: <ButtonAddBackgroundPPID />,
                },
              ]}
            />

            <TableCustom data={background} columns={columns} loading={loading} meta={meta} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
