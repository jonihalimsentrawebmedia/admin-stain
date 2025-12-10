import type { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UploadImageWitAlt } from '@/pages/modules/website-utama/public-content/news/components/uploadImgAlt.tsx'
import useGetImpactInnovation from '@/pages/modules/settings/reference/impact-innovation/controller/useGetImpactInnovation.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import type { ImpactInnovationType } from '../data/resolver'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { RichText } from '@/components/common/richtext'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadMultipleImages } from '@/pages/modules/website-utama/public-content/news/components/multipleUploadImg.tsx'

interface Props {
  form: UseFormReturn<ImpactInnovationType>
  loading: boolean
  HandleSave: (e: any) => void
}

export const ImpactInnovationForm = (props: Props) => {
  const { form, loading, HandleSave } = props
  const navigate = useNavigate()
  const { impactInnovation } = useGetImpactInnovation({ isGetAll: true })

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 py-5'}>
          <ButtonTitleGroup
            label={'Tulis Inovasi Berdampak'}
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
            form={form}
            label={'Judul Inovasi Berdampak*'}
            placeholder={'Judul Inovasi Berdampak*'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <SelectBasicInput
            form={form}
            className={'lg:grid-cols-[15rem_1fr]'}
            name={'id_kategori_inovasi_berdampak'}
            placeholder={'Pilih Kategori'}
            data={
              impactInnovation?.map((row) => ({
                label: row?.nama_inovasi,
                value: row?.id_inovasi,
              })) ?? []
            }
            label={'Kategori Inovasi Berdampak'}
            isRequired
            isRow
          />

          <RichText
            form={form}
            name={'isi_inovasi_berdampak'}
            label={'Isi Inovasi Berdampak'}
            className={'lg:grid-cols-[15rem_1fr]'}
            required
          />

          <TextInput
            name={'penulis'}
            className={'lg:grid-cols-[15rem_1fr]'}
            form={form}
            label={'Penulis'}
            inputClassName={'bg-white'}
            placeholder={'Penulis'}
            isRow
            isRequired
          />

          <UploadMultipleImages
            className={'lg:grid-cols-[15rem_1fr]'}
            form={form}
            name={'gambar_tambahan'}
            label={'Gambar Tambahan'}
            uploadUrl={'/upload'}
            placeholder={'Gambar Tambahan'}
            required={true}
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
