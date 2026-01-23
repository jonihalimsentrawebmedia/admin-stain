import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IAchievementCategory } from '@/pages/modules/website-unit/profile/achievement/data/types.tsx'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  rootData?: IAchievementCategory
}

export const ButtonAddReward = (props: Props) => {
  const { rootData } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm()

  const queryClient = useQueryClient()

  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post(
      `/unit/profil/unit-kategori-penghargaan-penghargaan/${rootData?.id_kategori_penghargaan}/penghargaan`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['reward'],
          })
          form.reset()
          toast.success(res.data.message || 'Success Menambahkan Data Penghargaan')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button variant={'outline'} className={'border-primary'} onClick={() => setOpen(!open)}>
        <BiPlus />
        Tambah Penghargaan
      </Button>

      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Penghargaan'}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className={'space-y-4'}>
            <TextInput
              name={'keterangan'}
              form={form}
              label={'Keterangan'}
              placeholder={'Keterangan'}
              isRow
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}
