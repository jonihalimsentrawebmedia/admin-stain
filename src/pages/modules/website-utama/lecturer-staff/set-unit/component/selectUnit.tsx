import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import type { IEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'
import { toast } from 'react-toastify'
import { FaSave } from 'react-icons/fa'

interface props {
  data: IEmployee
  status: boolean
  unit: { id_satuan_organisasi: string; nama_satuan_organisasi: string }[]
}

export const SelectUnit = (props: props) => {
  const { data, status, unit } = props

  useEffect(() => {
    if (data) {
      form.reset({
        id_unit_kerja: data?.id_unit_kerja,
      })
    }
  }, [data])

  const form = useForm()

  const HandleSaveOnce = async (value: any) => {
    await AxiosClient.patch(`/website-utama/sdm/update-single-unit-kerja/${data?.id_sdm}`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Form {...form}>
        <form
          className={'w-full max-[400px] flex items-center gap-2'}
          onSubmit={form.handleSubmit(HandleSaveOnce)}
        >
          <SelectBasicInput
            isDisabled={!status}
            placeholder={'Pilih Unit Kerja'}
            className={'w-full'}
            form={form}
            usePortal
            name={'id_unit_kerja'}
            data={
              unit?.map((row) => ({
                label: row?.nama_satuan_organisasi,
                value: row?.id_satuan_organisasi,
              })) ?? []
            }
          />
          <button className={'bg-green-500 text-white p-1.5 rounded hover:bg-green-600'}>
            <FaSave />
          </button>
        </form>
      </Form>
    </>
  )
}
