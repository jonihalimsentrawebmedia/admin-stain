import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import { UseGetZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/hooks'
import { ResolverSubZoneIntegrity, type TypeResolverSubZoneIntegrity } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetDetailSubZoneIntegrity } from '../hooks/index.tsx'

export const UpdatedSubCategory = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id_sub } = useParams()

  const { detail } = UseGetDetailSubZoneIntegrity(id_sub as string) ?? ''

  const { zoneIntegrity } = UseGetZoneIntegrity({
    page: '0',
    limit: '0',
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        id_zona_integritas_kategori: detail?.id_zona_integritas_kategori,
        nama_sub_kategori: detail?.nama_sub_kategori,
        deskripsi: detail?.deskripsi,
      })
    }
  }, [detail])

  const form = useForm<TypeResolverSubZoneIntegrity>({
    resolver: zodResolver(ResolverSubZoneIntegrity),
  })

  const HandelSubmit = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(`/fakultas/zona-integritas-sub-kategori/${id_sub}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          navigate(-1)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(HandelSubmit)}>
          <SelectBasicInput
            name={'id_zona_integritas_kategori'}
            form={form}
            placeholder={'Kategori'}
            data={
              zoneIntegrity?.map((row) => ({
                label: row?.nama_kategori,
                value: row?.id_zona_integritas_kategori,
              })) ?? []
            }
            isDisabled
            label={'Kategori'}
            selectClassName={'bg-white'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'nama_sub_kategori'}
            label={'Nama Kategori'}
            inputClassName={'bg-white'}
            placeholder={'Masukkan Nama Kategori'}
            isRequired
            isRow
          />

          <RichText form={form} name={'deskripsi'} label={'Deskripsi'} required isRow />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}
