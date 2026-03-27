import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { useNavigate } from 'react-router-dom'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { GroupSkillResolver, type IGroupSkillResolver } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'

export const CreatedGroupSkill = () => {
  const navigate = useNavigate()
  const form = useForm<IGroupSkillResolver>({
    resolver: zodResolver(GroupSkillResolver),
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async (e: IGroupSkillResolver) => {
    setLoading(true)
    AxiosClient.post('/fakultas/kelompok-keahlian', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-fakultas/research/research-group/group-skill')
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        toast.error(err.message || 'Something went wrong')
        setLoading(false)
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'space-y-4'} onSubmit={form.handleSubmit(handleSave)}>
          <ButtonTitleGroup
            label={'Tambah Kelompok Keahlian'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => navigate(-1),
              },
              {
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />

          <UploadPhotoImage form={form} name={'url_gambar'} />
          <TextInput
            name={'nama_kelompok'}
            form={form}
            label={'Nama Kelompok'}
            placeholder={'Nama Kelompok Keahlian'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <RichText
            form={form}
            name={'deskripsi'}
            isRow={true}
            showLabel={true}
            label={'Deskripsi'}
          />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}
