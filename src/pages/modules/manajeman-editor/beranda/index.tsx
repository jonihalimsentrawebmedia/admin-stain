import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Plus } from 'lucide-react'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import type { Mode } from '@/pages/modules/website-utama/beranda/types'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import {
  UseGetApprovedListEditor,
  UseGetApprovedListEditorStatus,
  UseGetTotalVisitorEditor,
  UseGetTrentVisitorEditor,
} from '@/pages/modules/manajeman-editor/beranda/hooks'
import { ApprovedSectionEditor } from '@/pages/modules/manajeman-editor/beranda/components/Approved/section.tsx'
import type { status } from '@/pages/modules/new_editor/data/types/data.tsx'

export default function DashboardAdminEditor() {
  const [tabsName, setTabsName] = useState<status>('DIAJUKAN_EDITOR')
  const [mode, setMode] = useState<Mode>('harian')
  const location = useLocation()
  const path = location.pathname
  const isEditor = path.includes('editor')
  const { trentVisitor, visitor, device } = UseGetTrentVisitorEditor(mode)

  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const chartData =
    (trentVisitor &&
      Object?.entries(trentVisitor).map(([key, value]) => ({
        name: key,
        value: value,
      }))) ??
    []

  const { status } = UseGetTotalVisitorEditor()
  const { profileUser } = UseGetUserProfile()
  const { approvedList, loading, meta } = UseGetApprovedListEditor({
    status: tabsName ?? '',
    page: page,
    limit: limit,
  })
  const { status: total } = UseGetApprovedListEditorStatus()

  const TabsList = [
    {
      id: 1,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Diajukan Ke Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {total?.DIAJUKAN_EDITOR}
          </div>
        </div>
      ),
      value: 'DIAJUKAN_EDITOR',
      element: (
        <ApprovedSectionEditor
          loading={loading}
          meta={meta}
          data={approvedList}
          status={tabsName}
        />
      ),
    },
    {
      id: 2,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Proses Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {total?.PROSES_EDITOR}
          </div>
        </div>
      ),
      value: 'PROSES_EDITOR',
      element: (
        <ApprovedSectionEditor
          loading={loading}
          meta={meta}
          data={approvedList}
          status={tabsName}
        />
      ),
    },
    {
      id: 3,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Disetujui Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {total?.DISETUJUI_EDITOR}
          </div>
        </div>
      ),
      value: 'DISETUJUI_EDITOR',
      element: (
        <ApprovedSectionEditor
          loading={loading}
          meta={meta}
          data={approvedList}
          status={tabsName}
        />
      ),
    },
    {
      id: 4,
      name: (
        <div className="p-2 flex items-center gap-1.5">
          <p>Ditolak Editor</p>
          <div className="bg-red-500 size-4 text-white rounded-full text-xs">
            {total?.TOLAK_EDITOR}
          </div>
        </div>
      ),
      value: 'TOLAK_EDITOR',
      element: (
        <ApprovedSectionEditor
          loading={loading}
          meta={meta}
          data={approvedList}
          status={tabsName}
        />
      ),
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
        Selamat Datang <span className="text-green-500">{profileUser?.nama_lengkap}</span>
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className={isEditor ? 'xl:col-span-4' : 'xl:col-span-3'}>
          <p className="text-primary font-semibold text-2xl">Konten Yang Diajukan</p>
          <TabsListCustom
            data={TabsList}
            value={tabsName}
            onChange={(e) => {
              setTabsName(e as status)
              const ParamsSearch = new URLSearchParams()
              ParamsSearch.set('page', '1')
              setSearchParams(ParamsSearch)
            }}
          />
        </div>

        {!isEditor && (
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
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
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
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {!isEditor && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Jenis Pengunjung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Pengunjung Baru</span>
                  <span>
                    {visitor?.baru} (
                    {(
                      ((visitor?.baru ?? 0) /
                        ((visitor?.baru ?? 0) + (visitor?.kembali ?? 0) || 1)) *
                      100
                    ).toFixed(2)}
                    %)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pengunjung Kembali</span>
                  <span>
                    {visitor?.kembali} (
                    {(
                      ((visitor?.kembali ?? 0) /
                        ((visitor?.baru ?? 0) + (visitor?.kembali ?? 0) || 1)) *
                      100
                    ).toFixed(2)}
                    %)
                  </span>
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
                  <span>
                    {device?.desktop} (
                    {(
                      ((device?.desktop ?? 0) /
                        ((device?.mobile ?? 0) + (device?.desktop ?? 0) || 1)) *
                      100
                    ).toFixed(2)}
                    %)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Mobile</span>
                  <span>
                    {device?.mobile} (
                    {(
                      ((device?.mobile ?? 0) /
                        ((device?.mobile ?? 0) + (device?.desktop ?? 0) || 1)) *
                      100
                    ).toFixed(2)}
                    %)
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
