import { type UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageWitAlt } from '@/pages/modules/website-utama/public-content/news/components/uploadImgAlt.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import type { INewsTypeForm } from '@/pages/modules/website-utama/public-content/news/data/resolver.tsx'
import useGetNewsCategory from '@/pages/modules/settings/reference/news-category/controller/useGetNewsCategory.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { RichText } from '@/components/common/richtext'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadMultipleImages } from '@/pages/modules/website-utama/public-content/news/components/multipleUploadImg.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator.tsx'
import { TreeCheckboxController } from '@/pages/modules/website-utama/public-content/component/TreeCheckbox.tsx'
import { UseGetTreeData } from '@/pages/modules/website-utama/public-content/component/hooks.tsx'
import ButtonGenerateNewsAI from '@/components/common/button/buttonGenerateAI.tsx'
import { format } from 'date-fns'

interface Props {
  form: UseFormReturn<INewsTypeForm>
  HandleSave: (e: any) => void
  loading: boolean
  is_website_main?: boolean
  label?: string
  url_ai: string
}

export const FormNewsContent = (props: Props) => {
  const { label, form, HandleSave, loading, is_website_main, url_ai } = props
  const { newsCategory, loading: laod1 } = useGetNewsCategory({ isGetAll: true })
  const { treeNodes } = UseGetTreeData()
  const navigate = useNavigate()

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5 p-3 sm:p-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={label ?? 'Tulis Berita'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
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
            name={'judul'}
            form={form}
            isRequired
            isRow
            label={'Judul Berita'}
            className={'items-start'}
            inputClassName={'min-h-[8rem] bg-white'}
            placeholder={'Judul  Berita'}
          />

          <SelectBasicInput
            selectClassName={'w-full sm:w-1/2'}
            form={form}
            label={'Kategori Berita'}
            isRow
            placeholder={'Pilih Kategori Berita'}
            name={'id_kategori_berita'}
            isDisabled={laod1}
            data={
              newsCategory?.map((row) => ({
                label: row?.nama_kategori,
                value: row?.id_kategori,
              })) ?? []
            }
          />

          <ButtonGenerateNewsAI
            urL={url_ai}
            form={form}
            judul={form.watch('judul') ?? ''}
            tanggal={format(new Date(), 'yyyy-MM-dd')}
          />
          <RichText
            form={form}
            name={'isi_berita'}
            label={'Isi Berita'}
            placeholder={'Isi Berita'}
            isRow
            required
          />

          <TextInput
            form={form}
            name={'penulis'}
            label={'Penulis'}
            isRequired
            isRow
            placeholder={'Penulis'}
            inputClassName={'bg-white'}
          />

          <TextInput
            form={form}
            name={'tanggal_berita'}
            label={'Tanggal Berita'}
            type={'date'}
            inputClassName={'bg-white w-full sm:w-1/2'}
            isRequired
            isRow
          />

          <UploadMultipleImages
            form={form}
            name={'berita_gambar_tambahan'}
            label={'Gambar Tambahan (Ukuran 1280 x 478)'}
            uploadUrl={'/upload'}
            placeholder={'Gambar Tambahan'}
            maxFiles={10}
          />

          {is_website_main && (
            <>
              <Separator />
              <div className="p-4 bg-white w-full space-y-4">
                <p className="text-lg sm:text-2xl font-semibold text-primary">Unit Kerja Terkait</p>
                <TreeCheckboxController
                  name="list_unit"
                  control={form.control}
                  data={treeNodes}
                  rules={{ required: 'Pilih minimal satu' }}
                  showSelectAll
                  selectAllLabel={'Pilih Semua'}
                />
              </div>
            </>
          )}

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
