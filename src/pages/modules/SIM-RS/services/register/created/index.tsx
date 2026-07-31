import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ResolverRegistration, type TResolverRegistration } from '../data/resolver.tsx'
import { FormRegistration } from '../components/forms.tsx'
import { UseGetNomorPendaftaran } from '../hooks/index.tsx'
import AxiosClient from '@/provider/axios.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const CreateRegistration = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { nomorPendaftaran } = UseGetNomorPendaftaran()

  const form = useForm<TResolverRegistration>({
    resolver: zodResolver(ResolverRegistration),
    defaultValues: {
      status: 'MENUNGGU',
      tanggal_pendaftaran: new Date().toISOString().split('T')[0],
    },
  })

  useEffect(() => {
    if (nomorPendaftaran) {
      form.setValue('no_pendaftaran', nomorPendaftaran)
    }
  }, [nomorPendaftaran, form])

  const HandleSave = async (value: TResolverRegistration) => {
    setLoading(true)
    await AxiosClient.post('/simrs/pelayanan/pendaftaran', {
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

  return (
    <div>
      <ButtonTitleGroup
        isBack
        label={'Tambah Pendaftaran'}
        buttonGroup={[
          { type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_SERVICES" /> },
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
      <FormRegistration loading={loading} form={form} HandleSave={HandleSave} />
    </div>
  )
}

export default CreateRegistration
