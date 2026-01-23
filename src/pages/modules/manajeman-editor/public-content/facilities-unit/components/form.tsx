import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import { UploadImageWitAlt } from '@/pages/modules/website-utama/public-content/news/components/uploadImgAlt.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { RichText } from '@/components/common/richtext'
import { UploadMultipleImages } from '@/pages/modules/website-utama/public-content/news/components/multipleUploadImg.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { FacilitiesUnitResolverType } from '@/pages/modules/website-unit/public-content/Facilities/data/resolver'

interface Props {
  form: UseFormReturn<FacilitiesUnitResolverType>
  loading: boolean
  HandleSave: (e: FacilitiesUnitResolverType) => void
}

export const FormFacilitiesUnit = (props: Props) => {
  const { form, loading, HandleSave } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Edit Fasilitas Unit'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => navigate(-1),
              },
              {
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />
          <UploadImageWitAlt
            form={form}
            alt={'keterangan_gambar'}
            label={'Gambar Utama (Ukuran 4:3)'}
            name={'gambar'}
            placeholder={'Gambar Utama'}
            uploadUrl={'/upload'}
            width={'w-[400px]'}
            height={'h-[300px]'}
            required
          />
          <TextAreaInput
            name={'nama_fasilitas'}
            form={form}
            isRequired
            isRow
            label={'Nama Fasilitas'}
            className={'items-start'}
            inputClassName={'min-h-[8rem] bg-white'}
            placeholder={'Nama Fasilitas'}
          />

          <RichText form={form} name={'deskripsi'} label={'Deskripsi'} required />
          <UploadMultipleImages
            form={form}
            name={'unit_fasilitas_gambar_tambahan'}
            label={'Gambar Tambahan dengan (Ukuran 4:3)'}
            uploadUrl={'/upload'}
            placeholder={'Gambar Tambahan'}
            maxFiles={10}
          />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}
