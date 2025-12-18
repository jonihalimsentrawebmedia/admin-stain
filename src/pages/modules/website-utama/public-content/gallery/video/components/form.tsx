import type { UseFormReturn } from 'react-hook-form'
import type { VideoType } from '../data/resolver'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'

interface props {
  loading: boolean
  form: UseFormReturn<VideoType>
  HandleSave: (e: VideoType) => void
  open: boolean
  setOpen: (e: boolean) => void
}

export const FormGalleyVideo = (props: props) => {
  const { form, open, setOpen, HandleSave, loading } = props

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5'}>
          <UploadImageRatio form={form} name={'thumbnail'} placeholder={'thumbnail'} />
          <TextInput
            label={'Judul Galeri'}
            form={form}
            name={'judul'}
            placeholder={'Judul Galeri'}
            isRequired
            isRow
          />
          <TextInput
            label={'Link Video'}
            form={form}
            name={'link_video'}
            placeholder={'Link Video'}
            isRequired
            isRow
          />
          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  setOpen(!open)
                },
              },
              {
                isDisabled: loading,
                label: 'Simpan',
                type: 'save',
                onClick: () => {},
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
