import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { ResolverAttendance, type TResolverAttendance } from './resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { IAttendance } from './hooks.tsx'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IAttendance
}

const ButtonEditAttendance = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const { institution } = UseGetUnitInstitution()

  const form = useForm<TResolverAttendance>({
    resolver: zodResolver(ResolverAttendance),
  })

  console.log(form.formState.errors, 'errors')

  useEffect(() => {
    if (data) {
      form.reset({
        nama_lengkap: data?.nama_lengkap,
        id_unit: data?.id_unit,
        id_unit_kerja: data?.id_unit_kerja,
        jabatan: data?.jabatan,
        no_hp: data?.no_hp,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverAttendance) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/acara/${id}/daftar-hadir/${data?.id_acara_daftar_hadir}`, {
      nama_lengkap: value.nama_lengkap,
      id_unit: value.id_unit,
      id_unit_kerja: value.id_unit_kerja,
      jabatan: value.jabatan,
      no_hp: value.no_hp,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['attendance'],
          })
          form.reset()
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Something went wrong')
      })
  }

  return (
    <>
      <button
        className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Data'} open={open} setOpen={setOpen} className={'min-w-5xl'}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <SelectBasicInput
              name={'id_unit'}
              form={form}
              placeholder={'Asal/ Instansi'}
              label={'Asal/ Instansi'}
              selectClassName={'z-50'}
              isDisabled
              isRequired
              data={
                institution?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_satuan_organisasi,
                })) ?? []
              }
            />
            <SelectBasicInput
              name={'id_unit_kerja'}
              form={form}
              placeholder={'Asal/ Instansi'}
              label={'Asal/ Instansi'}
              selectClassName={'z-50'}
              isRequired
              data={
                institution
                  ?.filter((row) => row.id_satuan_organisasi !== form.getValues('id_unit'))
                  .map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
              }
            />
            <TextInput
              name={'nama_lengkap'}
              form={form}
              label={'Nama Lengkap'}
              placeholder={'Nama Lengkap'}
              htmlFor={'nama'}
              isRequired
            />
            <TextInput
              name={'jabatan'}
              form={form}
              label={'Jabatan'}
              placeholder={'Jabatan'}
              htmlFor={'jabatan'}
              isRequired
            />
            <TextInput
              name={'no_hp'}
              form={form}
              label={'No. HP'}
              placeholder={'No. HP'}
              htmlFor={'no_hp'}
              type={'number'}
              isRequired
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
export default ButtonEditAttendance
