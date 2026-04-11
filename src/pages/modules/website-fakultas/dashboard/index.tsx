import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Plus } from 'lucide-react'
import { UseGetApprovedList, UseGetTotalVisitor, UseGetTrentVisitor } from './hooks/index.tsx'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useState } from 'react'
import { ApprovedSection } from './components/Approved/section'
import { Link, useLocation } from 'react-router-dom'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import type { Mode } from './types/index'
import { FiExternalLink } from 'react-icons/fi'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import { UseGetSessionFaculty } from '@/pages/modules/website-fakultas/component/select-session/get-seeion.tsx'

export default function DashboardFaculty() {
  const [tabsName, setTabsName] = useState('DIAJUKAN_EDITOR')
  const [mode, setMode] = useState<Mode>('harian')
  const location = useLocation()
  const path = location.pathname
  const isEditor = path.includes('editor')
  const { trentVisitor } = UseGetTrentVisitor(mode)

  const chartData =
    (trentVisitor &&
      Object?.entries(trentVisitor).map(([key, value]) => ({
        name: key,
        value: value,
      }))) ??
    []

  const { status } = UseGetTotalVisitor()
  const { profileUser } = UseGetUserProfile()
  const { session } = UseGetSessionFaculty()
  const { approvedList } = UseGetApprovedList(tabsName ?? '')

  const TabsList = [
    {
      id: 1,
      name: 'Diajukan Ke Editor',
      value: 'DIAJUKAN_EDITOR',
      element: <ApprovedSection data={approvedList} />,
    },
    {
      id: 2,
      name: 'Disetujui Editor',
      value: 'DISETUJUI_EDITOR',
      element: <ApprovedSection data={approvedList} />,
    },
    {
      id: 3,
      name: 'Proses Editor',
      value: 'PROSES_EDITOR',
      element: <ApprovedSection data={approvedList} />,
    },
    {
      id: 4,
      name: 'Tolak Editor',
      value: 'TOLAK_EDITOR',
      element: <ApprovedSection data={approvedList} />,
    },
  ]

  const actions = [
    { label: 'Tulis Berita', url: '/modules/website-fakultas/public-content/news/add' },
    { label: 'Tulis Agenda', url: '/modules/website-fakultas/public-content/agenda/add' },
    { label: 'Tulis Pengumuman', url: '/modules/website-fakultas/public-content/announcement/add' },
  ]

  const listMode = [
    { label: 'Harian', value: 'harian' },
    { label: 'Mingguan', value: 'mingguan' },
    { label: 'Bulanan', value: 'bulanan' },
    { label: 'Tahunan', value: 'tahunan' },
  ]

  return (
    <div className=" mt-4 flex flex-col gap-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Selamat Datang <span className="text-primary">{profileUser?.nama_lengkap}</span>
        </h1>
        <Link
          to={session?.domain ? `https://${session?.domain}` : '#'}
          target={'_blank'}
          className={'flex flex-col gap-1 items-start justify-center'}
        >
          <Button variant={'outline'} className={'border-primary text-primary hover:text-primary'}>
            <FiExternalLink />
            Buka Website
          </Button>
          <p className="text-primary text-sm">{session?.domain}</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {status?.map((item, i) => (
          <Card
            key={i}
            className="bg-primary-foreground hover:bg-primary hover:text-white text-primary border-primary"
          >
            <CardContent className="p-4 relative">
              <p className="text-sm">{item.label}</p>
              <p className="text-xl font-bold">
                {new Intl.NumberFormat('id-ID').format(item.value)}
              </p>
              {item?.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className={isEditor ? 'xl:col-span-4' : 'xl:col-span-3'}>
          <p className="text-primary font-semibold text-2xl">Konten Yang Diajukan</p>
          <TabsListCustom data={TabsList} value={tabsName} onChange={setTabsName} />
        </div>

        <Card className={'bg-primary-foreground'}>
          <CardHeader>
            <CardTitle>Akses Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 flex flex-col">
            {actions?.map((item, i) => (
              <Link to={item?.url} key={i}>
                <Button
                  variant="outline"
                  className="w-full justify-start border border-primary text-primary hover:text-primary"
                >
                  <Plus className="mr-2 h-4 w-4" /> {item?.label}
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1  gap-6">
        <Card className={isEditor ? 'xl:col-span-4' : 'xl:col-span-3'}>
          <CardHeader>
            <CardTitle className={'text-primary'}>Tren Kunjungan Website</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <SelectBasic
              className={'mb-2'}
              label={'Data Bersadarkan'}
              data={listMode}
              value={mode}
              onChange={setMode}
              isRow
            />
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData ?? []} margin={{ bottom: 60 }}>
                <XAxis
                  dataKey="name"
                  angle={mode === 'harian' ? -75 : mode == 'bulanan' ? -45 : 0}
                  textAnchor="end"
                  interval={0}
                  height={60}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#297D56" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
