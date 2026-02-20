import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import SelectFilter from '@/components/common/filter/SelectFilter'
import { useGetReportAccessChart, useGetYearReportAccess } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import BasicPieChart from './components/BasicPieCharts'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
export function objectToChartArray<T extends Record<string, number>>(
  obj: T
): { name: keyof T; value: number }[] {
  return Object.entries(obj).map(([key, value]) => ({
    name: key as keyof T,
    value,
  }))
}
const ReportsAccessView = () => {
  const [searchParams] = useSearchParams()
  const [showChart, setShowChart] = useState(false)
  const { loading, year } = useGetYearReportAccess()
  const { statistic, loading: loadingChart } = useGetReportAccessChart(
    searchParams.get('year') || ''
  )

  const chartDataTimeService = [
    {
      name: 'kurang dari 10 hari',
      value: statistic?.lama_waktu_pelayanan?.kurang_10_hari ?? 0,
    },
    {
      name: 'lebih dari 10 hari',
      value: statistic?.lama_waktu_pelayanan?.lebih_10_hari ?? 0,
    },
  ]
  const chartDataStatus = [
    {
      name: 'Keseluruhan',
      value: statistic?.status_permohonan_yang_diberikan?.['KESELURUHAN']?.total ?? 0,
    },
    {
      name: 'Sebagian',
      value: statistic?.status_permohonan_yang_diberikan?.['SEBAGIAN']?.total ?? 0,
    },
    {
      name: 'Ditolak',
      value: statistic?.status_permohonan_yang_diberikan?.['DITOLAK']?.total ?? 0,
    },
  ]
  const chartDataReason = [
    {
      name: 'Persyaratan Tidak Lengkap',
      value: statistic?.alasan_penolakan_permohonan?.['PERSYARATAN_TIDAK_LENGKAP']?.total ?? 0,
    },
    {
      name: 'Tidak ada konfirmasi lebih lanjut',
      value:
        statistic?.alasan_penolakan_permohonan?.['TIDAK_ADA_KONFIRMASI_LEBIH_LANJUT']?.total ?? 0,
    },
    {
      name: 'Tidak Dikuasai',
      value: statistic?.alasan_penolakan_permohonan?.['TIDAK_DIKUASAI']?.total ?? 0,
    },
  ]
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Laporan Layanan Akses Publik" />
      <div className="flex gap-4 items-center">
        <div className=" text-[#444]">Pilih Tahun</div>
        <SelectFilter
          loading={loading}
          name="year"
          label=""
          options={year.map((y) => ({ label: y.toString(), value: y.toString() }))}
        />
      </div>
      <Button
        disabled={searchParams.get('year') == undefined}
        className="w-fit"
        onClick={() => {
          setShowChart(true)
        }}
      >
        Buat Laporan
      </Button>
      {searchParams.get('year') &&
        showChart &&
        (loadingChart ? (
          <Skeleton />
        ) : (
          <>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className={'text-primary'}>Tren Kunjungan Website</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statistic.periode ?? []} margin={{ bottom: 60 }}>
                    <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={60} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className={'text-primary text-center'}>Lama Waktu Layanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <BasicPieChart
                    data={chartDataTimeService ?? []}
                    colors={['#27CD7F', '#CD2738']}
                  />
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className={'text-primary text-center'}>
                    Status Permohonan Yang Diberikan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BasicPieChart
                    data={chartDataStatus ?? []}
                    colors={['#27CD7F', '#CDA327', '#CD2738']}
                  />
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className={'text-primary text-center'}>
                    Alasan Penolakan Permohonan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BasicPieChart
                    data={chartDataReason ?? []}
                    colors={['#27CD7F', '#CDA327', '#CD2738']}
                  />
                </CardContent>
              </Card>
            </div>
          </>
        ))}
    </div>
  )
}

export default ReportsAccessView
