import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ResolverRegistration, type TResolverRegistration } from '../data/resolver.tsx'
import { FormRegistration } from '../components/forms.tsx'
import { UseGetDetailRegistration } from '../hooks/index.tsx'
import { UseGetPemeriksaan } from '../diagnosis/hooks/index.tsx'
import { ResolverDiagnosis, type TResolverDiagnosis } from '../diagnosis/data/resolver.tsx'
import { FormDiagnosis } from '../diagnosis/components/forms.tsx'
import AxiosClient from '@/provider/axios.tsx'

const UpdateRegistration = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { detail, loading: detailLoading } = UseGetDetailRegistration(id ?? '')
  const { pemeriksaan, loading: pemeriksaanLoading } = UseGetPemeriksaan(id ?? '')
  const [loading, setLoading] = useState(false)

  const isSelesai = detail?.status === 'SELESAI'

  const registrationForm = useForm<TResolverRegistration>({
    resolver: zodResolver(ResolverRegistration),
    defaultValues: {
      status: 'MENUNGGU',
    },
  })

  const diagnosisForm = useForm<TResolverDiagnosis>({
    resolver: zodResolver(ResolverDiagnosis),
  })

  useEffect(() => {
    if (detail && !isSelesai) {
      registrationForm.reset({
        no_pendaftaran: detail.no_pendaftaran,
        tanggal_pendaftaran: detail.tanggal_pendaftaran?.split('T')[0] ?? '',
        status: detail.status,
        id_pasien: detail.id_pasien,
        id_poli: detail.id_poli,
        id_dokter: detail.id_dokter,
        sumber_biaya: detail.sumber_biaya ?? [],
      })
    }
  }, [detail, registrationForm, isSelesai])

  useEffect(() => {
    if (pemeriksaan && isSelesai) {
      diagnosisForm.reset({
        keluhan_utama: pemeriksaan.keluhan_utama,
        id_diagnosis: pemeriksaan.id_diagnosis ?? [],
        id_procedure: pemeriksaan.id_procedure ?? [],
        catatan: pemeriksaan.catatan ?? '',
        keputusan: pemeriksaan.keputusan,
        daftar_resep_obat: (pemeriksaan.daftar_resep_obat ?? []).map((item) => ({
          id_obat: item.id_obat,
          nama_obat: item.nama_obat,
          satuan: item.satuan,
          harga: item.harga_satuan,
          frekuensi: item.frekuensi,
          durasi: item.durasi,
          jumlah: item.jumlah,
        })),
      })
    }
  }, [pemeriksaan, diagnosisForm, isSelesai])

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

  const HandleSaveRegistration = async (value: TResolverRegistration) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/pelayanan/pendaftaran/${id}`, {
      ...value,
      tanggal_pendaftaran: new Date(value.tanggal_pendaftaran).toISOString(),
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/sim-rs/services/registration')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  const HandleSavePemeriksaan = async (value: TResolverDiagnosis) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/pelayanan/pemeriksaan/pendaftaran/${id}`, value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/sim-rs/services/registration')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <div>
      <ButtonTitleGroup
        isBack
        label={isSelesai ? 'Edit Hasil Pemeriksaan' : 'Edit Pendaftaran'}
        buttonGroup={[
          {
            type: 'cancel',
            onClick: () => navigate('/modules/sim-rs/services/registration'),
          },
          {
            type: 'save',
            label: 'Simpan',
          },
        ]}
      />
      {isSelesai ? (
        <FormDiagnosis
          loading={loading}
          form={diagnosisForm}
          HandleSave={HandleSavePemeriksaan}
          registration={detail}
        />
      ) : (
        <FormRegistration
          loading={loading}
          form={registrationForm}
          HandleSave={HandleSaveRegistration}
          isEdit
          editStatus={detail.status}
        />
      )}
    </div>
  )
}

export default UpdateRegistration
