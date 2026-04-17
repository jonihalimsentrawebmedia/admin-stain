import { Form } from '@/components/ui/form.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaSave } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'

interface props {
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
  workUnit: { id_satuan_organisasi: string; nama_satuan_organisasi: string }[]
}

export const MultipleUnit = (props: props) => {
  const { selected, workUnit } = props
  const form = useForm()

  const queryclient = useQueryClient()
  const HandleSave = async (value: any) => {
    await AxiosClient.patch('/website-utama/sdm/update-multiple-unit-kerja', {
      id_sdm: selected,
      id_unit_kerja: value?.id_unit_kerja,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success')
          queryclient.invalidateQueries({
            queryKey: ['employee'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  return (
    <>
      <div className={'border border-primary p-4 rounded-md flex items-center justify-between'}>
        <p className="font-semibold text-primary">Pembaruan Masal</p>
        <div className={'flex items-center gap-x-1.5 whitespace-nowrap'}>
          <p className="text-blue-500 font-semibold">Jumlah Data Dipilih : ({selected.length})</p>
          <Form {...form}>
            <form
              className={'w-full max-[400px] flex items-center gap-2'}
              onSubmit={form.handleSubmit(HandleSave)}
            >
              <SelectBasicInput
                placeholder={'Pilih Unit Kerja'}
                className={'w-full'}
                form={form}
                usePortal
                name={'id_unit_kerja'}
                data={
                  workUnit?.map((row) => ({
                    label: row?.nama_satuan_organisasi,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
              />
              <Button>
                <FaSave />
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default MultipleUnit
