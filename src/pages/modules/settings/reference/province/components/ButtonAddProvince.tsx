import { useState } from 'react'
import { ProvinceResolver, type ProvinceType } from '../model/resolver'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { HiPlus } from 'react-icons/hi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { InputText } from '@/components/common/form/InputText'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import { SelectCustom } from '@/components/common/form/SelectCustom'
interface Props {
  optionCountry: {
    label: string
    value: string
  }[]
}
const ButtonAddProvince = ({ optionCountry }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<ProvinceType>({
    resolver: zodResolver(ProvinceResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ProvinceType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/pengaturan/referensi/provinsi`, data)

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-province'],
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
        title={<p className="text-2xl ">Tambah Provinsi</p>}
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
              <InputText
                form={form}
                name="nama_provinsi"
                isRow
                label="Nama Provinsi"
                placeholder="Nama Provinsi"
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

export default ButtonAddProvince
