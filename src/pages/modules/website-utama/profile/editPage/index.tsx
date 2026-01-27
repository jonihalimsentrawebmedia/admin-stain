import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import SatuanOrganisasiForm from '@/pages/modules/settings/components/form/SatuanOrganisasiForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { SatuanOrganisasiResolver, type SatuanOrganisasiType } from '@/pages/modules/settings/model'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetUniversityData } from '@/pages/modules/website-utama/profile/hooks'
import { useEffect } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const EditPageUniversity = () => {
  const navigate = useNavigate()

  const form = useForm<SatuanOrganisasiType>({
    resolver: zodResolver(SatuanOrganisasiResolver),
  })

  const { detailUniversity } = UseGetUniversityData()

  useEffect(() => {
    if (detailUniversity) {
      form.reset({
        ...detailUniversity,
      })
    }
  }, [detailUniversity])

  const handleSave = async (e: SatuanOrganisasiType) => {
    await AxiosClient.post('/website-utama/profil/draft', {
      ...e,
    }).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message || 'Success Pengajuan update data universitas')
        navigate('/modules/website-utama/profile')
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
              label="Tambah Data Universitas"
            />
            <SatuanOrganisasiForm kelompok="UNIVERSITAS" form={form} />
          </form>
        </Form>
      </div>
    </>
  )
}
