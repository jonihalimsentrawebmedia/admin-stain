import type { UseFormReturn } from 'react-hook-form'
import type { AgendaType } from '@/pages/modules/website-utama/public-content/agenda/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UploadImageWitAlt } from '@/pages/modules/website-utama/public-content/news/components/uploadImgAlt.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'

interface props {
  loading: boolean
  form: UseFormReturn<AgendaType>
  HandleSave: (e: AgendaType) => void
}

export const AgendaForm = (props: props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 py-5'}>
          <ButtonTitleGroup
            label={'Tulis Agenda'}
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
            width={'w-[212px]'}
            height={'h-[270px]'}
            form={form}
            alt={'keterangan_gambar'}
            label={'Gambar Utama (Ukuran 640 x 720)'}
            name={'gambar'}
            placeholder={'Gambar Utama'}
            uploadUrl={'/upload'}
            required
          />

          <TextAreaInput
            name={'judul'}
            placeholder={'Judul Agenda'}
            label={'Judul'}
            inputClassName={'bg-white'}
            form={form}
            isRow
            isRequired
          />

          <TextInput
            name={'waktu_mulai'}
            form={form}
            inputClassName={'bg-white'}
            label={'Waktu Mulai'}
            type={'datetime-local'}
            isRow
            isRequired
          />

          <TextInput
            name={'waktu_selesai'}
            form={form}
            inputClassName={'bg-white'}
            label={'Waktu Selesai'}
            type={'datetime-local'}
            isRow
          />

          <TextInput
            name={'lokasi_kegiatan'}
            form={form}
            label={'Lokasi Kegiatan'}
            inputClassName={'bg-white'}
            placeholder={'Lokasi Kegiatan'}
            isRow
            isRequired
          />

          <RichText form={form} name={'isi_agenda'} label={'Isi Agenda'} required />

          <TextInput
            name={'penulis'}
            form={form}
            label={'Penulis'}
            inputClassName={'bg-white'}
            placeholder={'Penulis'}
            isRow
            isRequired
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
