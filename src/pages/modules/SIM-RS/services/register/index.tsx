import { useNavigate, useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { UseGetRegistration, UseGetRegistrationStatusCount } from './hooks/index.tsx'
import { ColumnsRegistration } from './data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

const statusList = [
  { key: 'MENUNGGU', label: 'Menunggu' },
  { key: 'DIPANGGIL', label: 'Dipanggil' },
  { key: 'SELESAI', label: 'Selesai' },
  { key: 'DIBATALKAN', label: 'Dibatalkan' },
]

export const RegisterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const activeTab = searchParams.get('status') ?? 'MENUNGGU'
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { statusCount } = UseGetRegistrationStatusCount()
  const { registration, meta, loading } = UseGetRegistration({
    page,
    limit,
    search,
    status: activeTab,
  })

  const columns = ColumnsRegistration()

  const handleTabChange = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('status', value)
      newParams.set('page', '1')
      newParams.delete('search')
      return newParams
    })
  }

  const getStatusCount = (key: string) => {
    if (!statusCount) return 0
    return statusCount[key as keyof typeof statusCount] ?? 0
  }

  return (
    <div className="space-y-5">
      <ButtonTitleGroup
        label="Pendaftaran"
        buttonGroup={[
          {
            type: 'add',
            label: 'Tambah Pendaftaran',
            onClick: () => {
              navigate('add')
            },
          },
        ]}
      />
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full flex flex-row items-start p-0 gap-0 bg-transparent border-b-2 border-[#CDA327] rounded-none h-auto overflow-x-auto flex-nowrap justify-start">
          {statusList.map((s) => (
            <TabsTrigger
              key={s.key}
              value={s.key}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 h-10 rounded-none text-base font-medium border-0 shadow-none data-[state=active]:rounded-t-lg data-[state=active]:bg-[#278374] data-[state=active]:text-white data-[state=inactive]:text-[#252525] data-[state=inactive]:bg-transparent"
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
