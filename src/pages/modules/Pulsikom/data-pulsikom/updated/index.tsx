import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import SatuanOrganisasiForm from '@/pages/modules/settings/components/form/SatuanOrganisasiForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { SatuanOrganisasiResolver, type SatuanOrganisasiType } from '@/pages/modules/settings/model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetDetailDataPulsikom } from '../hooks'

export const UpdatedDataPulsikom = () => {
  const navigate = useNavigate()

  const form = useForm<SatuanOrganisasiType>({
    resolver: zodResolver(SatuanOrganisasiResolver),
  })

  const { carrierCenter } = UseGetDetailDataPulsikom()

  useEffect(() => {
    if (carrierCenter) {
      const temp: any = { ...carrierCenter }
      form.reset({
        ...temp,
        parent_id_temp: carrierCenter.id_parent_satuan_organisasi,
      })
    }
  }, [carrierCenter])

  const handleSave = async (e: SatuanOrganisasiType) => {
    await AxiosClient.post('/pusilkom/profil/draft', {
      ...e,
    }).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message || 'Success Pengajuan update data universitas')
        navigate('/modules/pulsikom/data-pulsikom')
      }
    })
  }

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
            <ButtonTitleGroup
              buttonGroup={[
                {
                  label: 'Batal',
                  onClick: () => {
                    navigate(-1)
                  },
                  type: 'cancel',
                },
                {
                  type: 'save',
                  label: 'Simpan',
                  onClick: () => {},
                },
              ]}
              label="Update Data Prodi"
            />
            <SatuanOrganisasiForm form={form} kelompok="UNIT" />
          </form>
        </Form>
      </div>
    </>
  )
}
