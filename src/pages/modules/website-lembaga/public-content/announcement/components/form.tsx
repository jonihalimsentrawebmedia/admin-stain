import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import type { AnnouncementType } from '@/pages/modules/website-utama/public-content/announcement/data/resolver.tsx'
import { RichText } from '@/components/common/richtext'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadDocument } from '@/pages/modules/website-utama/public-content/announcement/components/uploadDocument.tsx'

interface props {
  form: UseFormReturn<AnnouncementType>
  HandleSave: (e: AnnouncementType) => void
  loading: boolean
}

export const AnnouncementForm = (props: props) => {
  const { form, HandleSave } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 py-5'}>
          <ButtonTitleGroup
            label={'Tulis Pengumuman'}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  navigate(-1)
                },
              },
              { label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />

          <TextAreaInput
            label={'Judul Pengumuman'}
            className={'items-start'}
            placeholder={'Judul Pengumuman'}
            name={'judul_pengumuman'}
            form={form}
            isRequired
            isRow
          />
          <RichText form={form} name={'isi_pengumuman'} label={'Isi Pengumuman'} required />

          <TextInput
            label={'Penulis'}
            placeholder={'Penulis'}
            isRow
            isRequired
            name={'penulis'}
            form={form}
          />

          <UploadDocument form={form} name={'dokumens'} label={'Dokumen'} required />

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  navigate(-1)
                },
              },
              { label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
