import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegencyResolver, type RegencyType } from '../model/resolver'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { HiPlus } from 'react-icons/hi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { SelectCustom } from '@/components/common/form/SelectCustom'
import { InputText } from '@/components/common/form/InputText'
import ButtonForm from '@/components/common/button/ButtonForm'
import useGetCountry from '../../country/controller/useGetCountry'
import useGetProvince from '../../province/controller/useGetProvince'
import { Form } from '@/components/ui/form'

const ButtonAddRegency = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<RegencyType>({
    resolver: zodResolver(RegencyResolver),
  })
  const { country } = useGetCountry({ isGetAll: true })
  const { province } = useGetProvince({ isGetAll: true, id_negara: form.watch('id_negara') })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: RegencyType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/pengaturan/referensi/kabupaten`, data)

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-regency'],
        })
        setOpen(false)
        form.reset()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  const optionCountry = country.map((item) => {
    return {
      value: item.id_negara,
      label: item.nama_negara,
    }
  })
  const optionProvince = province.map((item) => {
    return {
      value: item.id_provinsi,
      label: item.nama_provinsi,
    }
  })
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        variant={'outline'}
        className={'bg-white text-primary border-primary hover:text-primary'}
      >
        <HiPlus />
        Tambah Data
      </Button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Kabupaten</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <SelectCustom
                isRow
                data={optionCountry}
                form={form}
                name="id_negara"
                label="Negara"
                placeholder="Pilih Negara"
                level1
              />
              <SelectCustom
                isRow
                data={optionProvince}
                form={form}
                name="id_provinsi"
                label="Provinsi"
                placeholder="Pilih Provinsi"
                level2
                isDisabled={form.watch('id_negara') == undefined}
              />
              <InputText
                form={form}
                name="nama_kabupaten"
                isRow
                label="Nama Kabupaten"
                placeholder="Nama Kabupaten"
              />
              <ButtonForm
                loading={loading}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonAddRegency
