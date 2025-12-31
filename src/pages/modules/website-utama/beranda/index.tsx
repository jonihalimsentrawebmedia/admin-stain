import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Plus } from 'lucide-react'
import {
  UseGetApprovedList,
  UseGetTotalVisitor,
  UseGetTrentVisitor,
} from '@/pages/modules/website-utama/beranda/hooks'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useState } from 'react'
import { ApprovedSection } from '@/pages/modules/website-utama/beranda/components/Approved/section.tsx'
import { Link } from 'react-router-dom'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import type { Mode } from '@/pages/modules/website-utama/beranda/types'

export default function DashboardAdmin() {
  const [tabsName, setTabsName] = useState('DIAJUKAN_EDITOR')
  const [mode, setMode] = useState<Mode>('harian')

  const { trentVisitor } = UseGetTrentVisitor(mode)

  const chartData =
    (trentVisitor &&
      Object?.entries(trentVisitor).map(([key, value]) => ({
        name: key,
        value: value,
      }))) ??
    []

  const { status } = UseGetTotalVisitor()
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
    { label: 'Tulis Berita', url: '/modules/website-utama/public-content/news/add' },
    { label: 'Tulis Pengumuman', url: '/modules/website-utama/public-content/announcement/add' },
    { label: 'Tulis Agenda', url: '/modules/website-utama/public-content/agenda/add' },
    {
      label: 'Tulis Inovasi Berdampak',
      url: '/modules/website-utama/public-content/achievement/add',
    },
    { label: 'Tulis Prestasi', url: '/modules/website-utama/public-content/achievement/add' },
    { label: 'Tambah Berkas Download', url: '/modules/website-utama/public-content/download/add' },
  ]

  const listMode = [
    { label: 'Harian', value: 'harian' },
    { label: 'Mingguan', value: 'mingguan' },
    { label: 'Bulanan', value: 'bulanan' },
    { label: 'Tahunan', value: 'tahunan' },
  ]

  return (
    <div className="min-h-screen space-y-6">
      <h1 className="text-2xl font-semibold">
        Selamat Datang <span className="text-green-500">Admin Website</span>
      </h1>

      {/* Statistik */}
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

      {/* Konten & Akses */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <Card className="xl:col-span-3">
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
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Jenis Pengunjung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Pengunjung Baru</span>
                <span>50%</span>
              </div>
              <div className="flex justify-between">
                <span>Pengunjung Kembali</span>
                <span>50%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perangkat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Desktop</span>
                <span>40%</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile</span>
                <span>60%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
