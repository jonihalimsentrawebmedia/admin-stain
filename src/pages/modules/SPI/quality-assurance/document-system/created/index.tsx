import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import TextInput from '@/components/common/form/TextInput.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DownloadResolver, type DownloadType } from '../data/resolver'
import { UseGetCategoryDocument } from '@/pages/modules/SPI/quality-assurance/document-system/category/hooks'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const AddDocumentSystem = () => {
  const [loading, setLoading] = useState(false)

  const { category, loading: load1 } = UseGetCategoryDocument({ page: '0', limit: '0' })

  const navigate = useNavigate()
  const form = useForm<DownloadType>({
    resolver: zodResolver(DownloadResolver),
  })

  const HandleSubmit = async (e: DownloadType) => {
    setLoading(true)
    await AxiosClient.post('/spi/sistem-dokumen', e)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          navigate('/modules/spi/quality-assurance/document-system')
          toast.success(res.data.message || 'Success tambah data download')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSubmit)}>
          <ButtonTitleGroup
            label={'Tambah Sistem Dokumen'}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => navigate(-1),
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />

          <TextInput
            name={'nama_dokumen'}
            form={form}
            label={'Nama Berkas'}
            placeholder={'Nama Berkas'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <SelectBasicInput
            name={'id_kategori_sistem_dokumen'}
            form={form}
            selectClassName={'w-1/2'}
            label={'Kategori Berkas'}
            placeholder={'Kategori Berkas'}
            isLoading={load1}
            data={
              category?.map((row) => ({
                label: row?.nama_sistem_dokumen,
                value: row?.id_kategori_sistem_dokumen,
              })) ?? []
            }
            isRequired
            isRow
          />

          <InputRadio
            form={form}
            name={'is_google_link'}
            label={'Link Google Drive/Tidak'}
            data={[
              { label: 'Ya', value: true },
              { label: 'Tidak', value: false },
            ]}
            isRequired
            isRow
          />

          {form?.watch('is_google_link') === true ? (
            <TextInput
              name={'link_google'}
              form={form}
              label={'Link Drive'}
              placeholder={'Link Drive'}
              inputClassName={'w-1/2 bg-white'}
              isRow
              isRequired
            />
          ) : (
            <UploadFileInput
              form={form}
              innerClassName={'w-1/2'}
              name={'url_dokumen'}
              label={'Link Berkas'}
              keyname={'key_name'}
              accept={'.pdf'}
              isRow
              required
            />
          )}

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}
