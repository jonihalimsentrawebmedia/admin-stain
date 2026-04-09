import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import TextInput from '@/components/common/form/TextInput.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { ResolverAuditDocument, type TResolverAuditDocument } from '../data/resolver'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const AddDocumentAudit = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const form = useForm<TResolverAuditDocument>({
    resolver: zodResolver(ResolverAuditDocument),
  })

  const HandleSubmit = async (e: TResolverAuditDocument) => {
    setLoading(true)
    await AxiosClient.post('/spi/daftar-dokumen', e)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          navigate('/modules/spi/quality-assurance/audit/document')
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
            label={'Tambah Dokumen Tinjauan Manajemen'}
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
