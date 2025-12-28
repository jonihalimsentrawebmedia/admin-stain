import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Plus } from 'lucide-react'

const stats = [
  { label: 'Total Pengunjung', value: '10,000' },
  { label: 'Hari Ini', value: '1,000' },
  { label: 'Kemarin', value: '950' },
  { label: 'Minggu Ini', value: '7,000' },
  { label: 'Bulan Ini', value: '8,000' },
  { label: 'Tahun Ini', value: '10,000' },
]

const chartData = [
  { name: 'Minggu 1', value: 150, color: '#007bff' },
  { name: 'Minggu 2', value: 220, color: '#dc3545' },
  { name: 'Minggu 3', value: 300, color: '#ffc107' },
  { name: 'Minggu 4', value: 400, color: '#28a745' },
  { name: 'Minggu 5', value: 500, color: '#17a2b8' },
]

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen space-y-6">
      <h1 className="text-2xl font-semibold">
        Selamat Datang <span className="text-green-500">Admin Website</span>
      </h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((item, i) => (
          <Card key={i} className="bg-green-600/90 text-white">
            <CardContent className="p-4">
              <p className="text-sm">{item.label}</p>
              <p className="text-xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Konten & Akses */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Konten Yang Diajukan</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="diajukan">
              <TabsList className="mb-4">
                <TabsTrigger value="diajukan">Diajukan</TabsTrigger>
                <TabsTrigger value="proses">Proses</TabsTrigger>
                <TabsTrigger value="ditolak">Ditolak</TabsTrigger>
                <TabsTrigger value="disetujui">Disetujui</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="overflow-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-green-50 text-green-700">
                  <tr>
                    <th className="p-2">Tanggal</th>
                    <th>Jenis</th>
                    <th>Judul</th>
                    <th>Penulis</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">26-12-2025</td>
                      <td>Berita</td>
                      <td>STAIN MADINA Menggelar Kegiatan</td>
                      <td>John Doe</td>
                      <td>
                        <Button size="sm" variant="outline">
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className={'bg-primary-foreground'}>
          <CardHeader>
            <CardTitle>Akses Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              'Tulis Berita',
              'Tulis Pengumuman',
              'Tulis Agenda',
              'Tulis Inovasi Berdampak',
              'Tulis Prestasi',
              'Tambah Berkas Download',
            ].map((item, i) => (
              <Button
                key={i}
                variant="outline"
                className="w-full justify-start border border-primary text-primary hover:text-primary"
              >
                <Plus className="mr-2 h-4 w-4" /> {item}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Tren Kunjungan Website</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
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
