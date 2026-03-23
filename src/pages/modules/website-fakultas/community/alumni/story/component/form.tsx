import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import type { StoryForm } from '@/pages/modules/website-fakultas/academic/ppsm/story/data/resolver.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UseGetProdiFaculty } from '@/pages/modules/website-fakultas/refarence/prodi.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

interface Props {
  form: UseFormReturn<StoryForm>
  HandleSave: (data: StoryForm) => void
  loading: boolean
  label: string
}

export const FormStoryAlumni = (props: Props) => {
  const { form, HandleSave, loading, label } = props
  const navigate = useNavigate()

  const { prodiFaculty } = UseGetProdiFaculty()

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            isBack
            label={label}
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
            name={'nama_lengkap'}
            form={form}
            label={'Nama Lengkap'}
            placeholder={'Nama Lengkap'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <SelectBasicInput
            name={'id_prodi'}
            form={form}
            placeholder={'Pilih Prodi'}
            label={'Prodi'}
            selectClassName={'w-1/2'}
            usePortal
            isRow
            isRequired
            data={
              prodiFaculty?.map((row) => ({
                label: row?.nama,
                value: row?.id_satuan_organisasi,
              })) ?? []
            }
          />

          <TextInput
            name={'tahun_lulus'}
            form={form}
            label={'Tahun Lulus'}
            placeholder={'Tahun Lulus'}
            inputClassName={'bg-white w-1/2'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <RichText form={form} name={'cerita'} label={'Cerita'} isRow required />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}
