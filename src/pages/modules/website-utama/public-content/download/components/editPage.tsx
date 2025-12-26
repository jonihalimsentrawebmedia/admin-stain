import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import TextInput from '@/components/common/form/TextInput.tsx'
import { DownloadResolver, type DownloadType } from '../types/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import {
  UseGetCategoryDownload,
  UseGetDownloadDetail,
} from '@/pages/modules/website-utama/public-content/download/hooks'

export const EditDownloadPage = () => {
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const { id } = params

  const { categoryDownload, loading: load1 } = UseGetCategoryDownload({ isGetAll: true })
  const { detailDownload } = UseGetDownloadDetail(id ?? '')

  useEffect(() => {
    if (detailDownload) {
      form.reset({
        nama_berkas: detailDownload?.nama_berkas,
        id_kategori_berkas: detailDownload?.id_kategori_berkas,
        is_link_drive: detailDownload?.is_link_drive,
        link_drive: detailDownload?.link_drive,
        file_url: detailDownload?.file_url,
      })
    }
  }, [detailDownload])

  const navigate = useNavigate()
  const form = useForm<DownloadType>({
    resolver: zodResolver(DownloadResolver),
  })

  console.log(form.formState.errors)

  const HandleSubmit = async (e: DownloadType) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/downloads/${detailDownload?.id_download}`, e)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          navigate('/modules/website-utama/public-content/download')
          toast.success(res.data.message || 'Success tambah data download')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSubmit)}>
          <ButtonTitleGroup
            label={'Tambah Download'}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  navigate('/modules/website-utama/public-content/download')
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />

          <TextInput
            name={'nama_berkas'}
            form={form}
            label={'Nama Berkas'}
            placeholder={'Nama Berkas'}
            inputClassName={'bg-white'}
            isRequired
            isRow
          />

          <SelectBasicInput
            name={'id_kategori_berkas'}
            form={form}
            selectClassName={'w-1/2'}
            label={'Kategori Berkas'}
            placeholder={'Kategori Berkas'}
            isLoading={load1}
            data={
              categoryDownload?.map((row) => ({
                label: row?.nama_kategori,
                value: row?.id_kategori_berkas,
              })) ?? []
            }
            isRequired
            isRow
          />

          <InputRadio
            form={form}
            name={'is_link_drive'}
            label={'Link Google Drive/Tidak'}
            data={[
              { label: 'Ya', value: true },
              { label: 'Tidak', value: false },
            ]}
            isRequired
            isRow
          />

          {form?.watch('is_link_drive') === true ? (
            <TextInput
              name={'link_drive'}
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
              name={'file_url'}
              label={'Link Berkas'}
              keyname={'key_name'}
              isRow
              required
            />
          )}

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  navigate('/modules/website-utama/public-content/download')
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
