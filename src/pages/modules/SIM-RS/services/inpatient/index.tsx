import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { UseGetRegistration } from '../register/hooks/index.tsx'
import { UseGetRegistrationStatusInapCount } from './data/types.tsx'
import { ColumnsInpatient } from './data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

const statusList = [
  { key: 'MENUNGGU_RUANGAN', label: 'Menunggu Ruangan' },
  { key: 'DIRAWAT', label: 'Dirawat' },
  { key: 'PULANG', label: 'Pulang' },
]

export const InpatientPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = searchParams.get('status_rawat_inap') ?? 'MENUNGGU_RUANGAN'
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { statusInapCount } = UseGetRegistrationStatusInapCount()
  const { registration, meta, loading } = UseGetRegistration({
    page,
    limit,
    search,
    is_inap: 'true',
    status_rawat_inap: activeTab,
  })

  const columns = ColumnsInpatient()

  const handleTabChange = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('status_rawat_inap', value)
      newParams.set('page', '1')
      newParams.delete('search')
      return newParams
    })
  }

  const getStatusCount = (key: string) => {
    if (!statusInapCount) return 0
    return statusInapCount[key as keyof typeof statusInapCount] ?? 0
  }

  return (
    <div className="space-y-5">
      <ButtonTitleGroup label="Rawat Inap" buttonGroup={[]} />
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full justify-start flex flex-row items-start p-0 gap-0 bg-transparent border-b-2 border-primary rounded-none h-auto overflow-x-auto flex-nowrap">
          {statusList.map((s) => (
            <TabsTrigger
              key={s.key}
              value={s.key}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 h-10 rounded-none text-base font-medium border-0 shadow-none data-[state=active]:rounded-t-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-[#252525] data-[state=inactive]:bg-transparent"
            >
              <span>{s.label}</span>
              <span className="flex items-center justify-center w-6 h-6 bg-[#CD2738] text-white text-xs rounded-full">
                {getStatusCount(s.key)}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {statusList.map((s) => (
          <TabsContent key={s.key} value={s.key}>
            <TableCustom data={registration} columns={columns} loading={loading} meta={meta} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default InpatientPage
