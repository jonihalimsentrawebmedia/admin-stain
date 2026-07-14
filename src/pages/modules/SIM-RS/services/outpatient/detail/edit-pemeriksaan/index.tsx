import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ResolverEditPemeriksaan, type TResolverEditPemeriksaan } from './data/resolver.tsx'
import { FormEditPemeriksaan } from './components/forms.tsx'
import { UseGetDetailRegistration } from '../../../register/hooks/index.tsx'
import { UseGetPemeriksaan } from '../../../register/diagnosis/hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiCheck, BiX } from 'react-icons/bi'
import { UseGetDiagnosis } from '@/pages/modules/SIM-RS/reference/diagnosis/hooks/index.tsx'
import { UseGetProcedure } from '@/pages/modules/SIM-RS/reference/procedure/hooks/index.tsx'

const EditPemeriksaan = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading: detailLoading } = UseGetDetailRegistration(id ?? '')
  const { pemeriksaan, loading: pemeriksaanLoading } = UseGetPemeriksaan(id ?? '')
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingValues, setPendingValues] = useState<TResolverEditPemeriksaan | null>(null)

  const { diagnosis } = UseGetDiagnosis({ limit: '100' })
  const { procedure } = UseGetProcedure({ limit: '100' })

  const form = useForm<TResolverEditPemeriksaan>({
    resolver: zodResolver(ResolverEditPemeriksaan),
  })

  useEffect(() => {
    if (pemeriksaan) {
      form.reset({
        keluhan_utama: pemeriksaan.keluhan_utama ?? '',
        id_diagnosis: pemeriksaan.id_diagnosis ?? [],
        id_procedure: pemeriksaan.id_procedure ?? [],
        catatan: pemeriksaan.catatan ?? '',
        keputusan: pemeriksaan.keputusan ?? '',
      })
    }
  }, [pemeriksaan, form])

  if (detailLoading || pemeriksaanLoading) {
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

  const HandleBeforeSave = (value: TResolverEditPemeriksaan) => {
    setPendingValues(value)
    setConfirmOpen(true)
  }

  const HandleConfirmSave = async () => {
    if (!pendingValues) return
    setLoading(true)
    await AxiosClient.put(`/simrs/pelayanan/pemeriksaan/pendaftaran/${id}`, pendingValues)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          setConfirmOpen(false)
          setPendingValues(null)
          toast.success(res?.data?.message || 'Berhasil memperbarui data pemeriksaan')
          navigate(`/modules/sim-rs/services/outpatient/detail/${id}`)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal memperbarui data pemeriksaan')
      })
  }

  const diagnosisLabels =
    pendingValues?.id_diagnosis
      ?.map((diagId) => {
        const found = diagnosis?.find((d) => d.id_diagnosis === diagId)
        return found ? `${found.kode} - ${found.nama}` : diagId
      }) ?? []

  const procedureLabels =
    pendingValues?.id_procedure
      ?.map((procId) => {
        const found = procedure?.find((p) => p.id_procedure === procId)
        return found ? `${found.kode} - ${found.nama}` : procId
      }) ?? []

  const keputusanLabel =
    pendingValues?.keputusan === 'RAWAT_JALAN'
      ? 'Rawat Jalan'
      : pendingValues?.keputusan === 'RAWAT_INAP'
        ? 'Rawat Inap'
        : pendingValues?.keputusan ?? '-'

  return (
    <div>
      <ButtonTitleGroup isBack label="Edit Hasil Pemeriksaan" buttonGroup={[]} />
      <FormEditPemeriksaan
        loading={loading}
        form={form}
        HandleSave={HandleBeforeSave}
        registration={detail}
      />

      <DialogBasic
        title="Simpan Perubahan Pemeriksaan"
        description="Apakah Anda yakin ingin menyimpan perubahan hasil pemeriksaan berikut?"
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
          </div>

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

export default EditPemeriksaan
