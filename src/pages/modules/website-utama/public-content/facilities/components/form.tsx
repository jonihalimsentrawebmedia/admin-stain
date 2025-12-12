import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UploadImageRatio } from './uploadImageRatio.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { FacilitiesType } from '../data/resolver'
import { RichText } from '@/components/common/richtext'

interface props {
  loading: boolean
  form: UseFormReturn<FacilitiesType>
  HandleSave: (e: FacilitiesType) => void
}

export const FormFacilities = (props: props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 py-5'}>
          <ButtonTitleGroup
            label={'Tambah Fasilitas'}
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

          <UploadImageRatio
            required
            label={'Gambar Utama (Ukuran 4:3)'}
            form={form}
            name={'gambar'}
          />

          <TextInput
            form={form}
            placeholder={'Nama Fasilitas'}
            name={'nama_fasilitas'}
            label={'Nama Fasilitas'}
            isRequired
            isRow
          />

          <RichText form={form} name={'deskripsi'} label={'Deskripsi'} required />

          <TextInput
            form={form}
            placeholder={'Alamat'}
            name={'alamat'}
            label={'Alamat'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            placeholder={'Link Google Maps'}
            name={'link_google_map'}
            label={'Link Google Maps'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            placeholder={'Jam Operasional'}
            name={'jam_operasional'}
            label={'Jam Operasional'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            placeholder={'No Hp Pembantu'}
            name={'no_hp_pembantu'}
            label={'No Hp Pembantu'}
            type={'number'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            placeholder={'Email Pembantu'}
            name={'email_pembantu'}
            label={'Email Pembantu'}
            type={'email'}
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
