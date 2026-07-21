import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ResolverCreateCPPT, type TResolverCreateCPPT } from '../data/resolver.tsx'
import { UseGetDetailRegistration } from '@/pages/modules/SIM-RS/services/register/hooks/index.tsx'
import { FormCPPT } from '../components/forms.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

const CreateCPPT = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { detail, loading: loadingDetail } = UseGetDetailRegistration(id ?? '')
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverCreateCPPT>({
    resolver: zodResolver(ResolverCreateCPPT),
    defaultValues: {
      id_dokter: '',
      id_ruangan: '',
      tanggal_catat: '',
      keluhan: '',
      catatan: '',
      id_diagnosis: [],
      id_procedure: [],
      daftar_resep_obat: [],
    },
  })

  const HandleSave = async (value: TResolverCreateCPPT) => {
    if (!detail) return
    setLoading(true)
    await AxiosClient.post(
      `/simrs/pelayanan/rawat-inap/${detail.id_pendaftaran}/cppt`,
      {
        id_dokter: value.id_dokter,
        id_ruangan: value.id_ruangan ?? detail.id_ruangan_aktif ?? '',
        tanggal_catat: new Date(value.tanggal_catat).toISOString(),
        keluhan: value.keluhan,
        catatan: value.catatan ?? '',
        id_diagnosis: value.id_diagnosis ?? [],
        id_procedure: value.id_procedure ?? [],
        daftar_resep_obat: (value.daftar_resep_obat ?? []).map((r) => ({
          id_obat: r.id_obat,
          frekuensi: r.frekuensi,
          durasi: r.durasi,
          jumlah: r.jumlah,
        })),
      }
    )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message || 'Berhasil menyimpan catatan CPPT')
          queryClient.invalidateQueries({ queryKey: ['cppt', detail.id_pendaftaran] })
          navigate(`/modules/sim-rs/services/inpatient/detail/${id}`)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal menyimpan catatan CPPT')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loadingDetail) {
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

  return (
    <div className="space-y-5">
      <ButtonTitleGroup
        isBack
        label="Tambah Catatan CPPT"
        buttonGroup={[]}
      />

      <div className="bg-white rounded-lg border p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">No. Pendaftaran</p>
            <p className="text-base font-medium">{detail.no_pendaftaran}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">No. Rekam Medis</p>
            <p className="text-base font-medium">{detail.no_rekam_medis_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nama Pasien</p>
            <p className="text-base font-medium">{detail.nama_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dokter</p>
            <p className="text-base font-medium">{detail.nama_dokter}</p>
          </div>
        </div>
      </div>

      <FormCPPT
        loading={loading}
        form={form}
        HandleSave={HandleSave}
        onCancel={() => navigate(`/modules/sim-rs/services/inpatient/detail/${id}`)}
      />
    </div>
  )
}

export default CreateCPPT
