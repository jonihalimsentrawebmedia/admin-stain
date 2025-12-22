import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EducationalLevelResolver, type EducationalLevelType } from '../model/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { HiPlus } from 'react-icons/hi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import { InputText } from '@/components/common/form/InputText'
import ButtonForm from '@/components/common/button/ButtonForm'

const ButtonAddEducationalLevel = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<EducationalLevelType>({
    resolver: zodResolver(EducationalLevelResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: EducationalLevelType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/pengaturan/referensi/jenjang-pendidikan`, data)

      if (res.data.status) {
        await queryClient.invalidateQueries({
          queryKey: ['settings-educational-level'],
        })
        toast.success(res.data.message)
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
        title={<p className="text-2xl ">Tambah Jenjang Pendidikan Pendidikan</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <InputText
                form={form}
                name="kode_jenjang"
                isRow
                label="Kode Jenjang Pendidikan"
                placeholder="Cth: S1, S2, S3"
              />
              <InputText
                form={form}
                name="nama_jenjang"
                isRow
                label="Nama Jenjang Pendidikan"
                placeholder="Cth: Sarjana"
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

export default ButtonAddEducationalLevel
