import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UploadImageWitAlt } from '@/pages/modules/website-utama/public-content/news/components/uploadImgAlt.tsx'
import type { AchievementType } from '@/pages/modules/new_editor/publict-content/achievement/data/resolver'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { RichText } from '@/components/common/richtext'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadMultipleImages } from '@/pages/modules/website-utama/public-content/news/components/multipleUploadImg.tsx'

interface Props {
  loading: boolean
  form: UseFormReturn<AchievementType>
  HandleSave: (e: AchievementType) => void
}

export const FormAchievement = (props: Props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5 py-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Tulis Konten Prestasi'}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  navigate(-1)
                },
              },
              { isDisabled: loading, label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />

          <UploadImageWitAlt
            form={form}
            alt={'keterangan_gambar'}
            label={'Gambar Utama (Ukuran 1280 x 478)'}
            name={'gambar'}
            placeholder={'Gambar Utama'}
            uploadUrl={'/upload'}
            required
          />

          <TextAreaInput
            className={'lg:grid-cols-[15rem_1fr]'}
            name={'judul'}
            placeholder={'Judul Konten'}
            label={'Judul Konten'}
            inputClassName={'bg-white'}
            form={form}
            isRequired
            isRow
          />

          <RichText
            className={'lg:grid-cols-[15rem_1fr]'}
            form={form}
            name={'isi_konten'}
            label={'Isi Konten'}
            required
          />

          <TextInput
            label={'Penulis'}
            placeholder={'Penulis'}
            inputClassName={'bg-white'}
            className={'lg:grid-cols-[15rem_1fr]'}
            name={'penulis'}
            form={form}
            isRequired
            isRow
          />

          <UploadMultipleImages
            className={'lg:grid-cols-[15rem_1fr]'}
            form={form}
            name={'gambar_tambahan'}
            label={'Gambar Tambahan'}
            uploadUrl={'/upload'}
            placeholder={'Gambar Tambahan'}
            maxFiles={10}
          />

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
              { isDisabled: loading, label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
