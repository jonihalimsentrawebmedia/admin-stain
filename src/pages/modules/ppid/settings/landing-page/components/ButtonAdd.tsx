import ButtonForm from '@/components/common/button/ButtonForm'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi'
import ImageUpload from './ImageUpload'
import { LandingPageInstutationResolver, type LandingPageInstutationType } from '../model/resolver'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { SwitchInput } from '@/components/common/form/switchInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

const ButtonAdd = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<LandingPageInstutationType>({
    resolver: zodResolver(LandingPageInstutationResolver),
    defaultValues: {
      is_aktif_sampai_at: false,
    },
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: LandingPageInstutationType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/unit-ppid/background`, {
        ...data,
        aktif_sampai_at: data?.aktif_sampai_at
          ? new Date(data?.aktif_sampai_at).toISOString()
          : null,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['landing-page-pengaturan-unit-ppid'],
        })

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
        Tambah data
      </Button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Gambar Landing Page</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <ImageUpload maxSizeMB={2} form={form} name="gambar_url" label="Gambar(Ukuran 4:2)" />

              <SwitchInput
                form={form}
                name={'is_aktif_sampai_at'}
                label={'Ada Batas Waktu Aktif?'}
                fx={() => {
                  form.setValue('aktif_sampai_at', '')
                }}
                isRow
                isRequired
              />

              <TextInput
                isDisabled={!form.watch('is_aktif_sampai_at')}
                name={'aktif_sampai_at'}
                form={form}
                label={'Aktif Sampai Pada'}
                type={'date'}
                inputClassName={'bg-white'}
                isRow
              />

              <div className="text-center">
                <ButtonForm
                  position="justify-center"
                  loading={loading}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />
              </div>
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonAdd
