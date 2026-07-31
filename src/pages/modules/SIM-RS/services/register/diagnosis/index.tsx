import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ResolverDiagnosis, type TResolverDiagnosis } from './data/resolver.tsx'
import { FormDiagnosis } from './components/forms.tsx'
import { UseGetDetailRegistration } from '../hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiCheck, BiX } from 'react-icons/bi'
import { UseGetDiagnosis } from '@/pages/modules/SIM-RS/reference/diagnosis/hooks/index.tsx'
import { UseGetProcedure } from '@/pages/modules/SIM-RS/reference/procedure/hooks/index.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const DiagnosisPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading: detailLoading } = UseGetDetailRegistration(id ?? '')
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingValues, setPendingValues] = useState<TResolverDiagnosis | null>(null)

  const { diagnosis } = UseGetDiagnosis({ limit: '100' })
  const { procedure } = UseGetProcedure({ limit: '100' })

  const form = useForm<TResolverDiagnosis>({
    resolver: zodResolver(ResolverDiagnosis),
  })

  if (detailLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Data tidak ditemukan</p>
      </div>
    )
  }

  const HandleBeforeSave = (value: TResolverDiagnosis) => {
    setPendingValues(value)
    setConfirmOpen(true)
  }

  const HandleConfirmSave = async () => {
    if (!pendingValues) return
    setLoading(true)
    const payload = {
      keluhan_utama: pendingValues.keluhan_utama,
      id_diagnosis: pendingValues.id_diagnosis,
      id_procedure: pendingValues.id_procedure,
      catatan: pendingValues.catatan,
      keputusan: pendingValues.keputusan,
      daftar_resep_obat: (pendingValues.daftar_resep_obat ?? []).map((item) => ({
        id_obat: item.id_obat,
        frekuensi: item.frekuensi,
        durasi: item.durasi,
        jumlah: item.jumlah,
      })),
    }
    await AxiosClient.put(`/simrs/pelayanan/pemeriksaan/pendaftaran/${id}`, payload)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          setConfirmOpen(false)
          setPendingValues(null)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/sim-rs/services/registration')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  const diagnosisLabels =
    pendingValues?.id_diagnosis
      ?.map((id) => {
        const found = diagnosis?.find((d) => d.id_diagnosis === id)
        return found ? `${found.kode} - ${found.nama}` : id
      }) ?? []

  const procedureLabels =
    pendingValues?.id_procedure
      ?.map((id) => {
        const found = procedure?.find((p) => p.id_procedure === id)
        return found ? `${found.kode} - ${found.nama}` : id
      }) ?? []

  const keputusanLabel =
    pendingValues?.keputusan === 'RAWAT_JALAN'
      ? 'Rawat Jalan'
      : pendingValues?.keputusan === 'RAWAT_INAP'
        ? 'Rawat Inap'
        : pendingValues?.keputusan ?? '-'

  return (
    <div>
      <ButtonTitleGroup isBack label="Pemeriksaan Pasien" buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_SERVICES" /> }]} />
      <FormDiagnosis
        loading={loading}
        form={form}
        HandleSave={HandleBeforeSave}
        registration={detail}
      />

      <DialogBasic
        title="Simpan Hasil Pemeriksaan"
        description="Apakah Anda yakin ingin menyimpan hasil pemeriksaan berikut?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        className="lg:min-w-2xl rounded"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 border-l-2 border-primary pl-4">
            <div className="flex gap-2">
              <span className="text-gray-500 min-w-[160px]">Keluhan Utama</span>
              <span className="text-gray-900">: {pendingValues?.keluhan_utama || '-'}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 min-w-[160px]">Diagnosa</span>
              <span className="text-gray-900">
                : {diagnosisLabels.length > 0 ? diagnosisLabels.join(', ') : '-'}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 min-w-[160px]">Rencana Tindakan</span>
              <span className="text-gray-900">
                : {procedureLabels.length > 0 ? procedureLabels.join(', ') : '-'}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 min-w-[160px]">Catatan</span>
              <span className="text-gray-900">: {pendingValues?.catatan || '-'}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 min-w-[160px]">Keputusan</span>
              <span className="text-gray-900">: {keputusanLabel}</span>
            </div>
            {(pendingValues?.daftar_resep_obat?.length ?? 0) > 0 && (
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-gray-500">Daftar Resep Obat</span>
                <table className="text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-2 py-1 text-left">#</th>
                      <th className="border px-2 py-1 text-left">Nama Obat</th>
                      <th className="border px-2 py-1 text-center">Frekuensi</th>
                      <th className="border px-2 py-1 text-center">Durasi</th>
                      <th className="border px-2 py-1 text-center">Jumlah</th>
                      <th className="border px-2 py-1 text-right">Harga Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingValues?.daftar_resep_obat?.map((item, idx) => (
                      <tr key={item.id_obat}>
                        <td className="border px-2 py-1">{idx + 1}</td>
                        <td className="border px-2 py-1">{item.nama_obat}</td>
                        <td className="border px-2 py-1 text-center">{item.frekuensi}x/hari</td>
                        <td className="border px-2 py-1 text-center">{item.durasi} hari</td>
                        <td className="border px-2 py-1 text-center">{item.jumlah}</td>
                        <td className="border px-2 py-1 text-right">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(item.harga * item.jumlah)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600">Status akan berubah dari Dipanggil → Selesai</p>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-gray-50"
            >
              <BiX className="size-5" />
              Batal
            </button>
            <button
              type="button"
              onClick={HandleConfirmSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              <BiCheck className="size-5" />
              Simpan
            </button>
          </div>
        </div>
      </DialogBasic>
    </div>
  )
}

export default DiagnosisPage
