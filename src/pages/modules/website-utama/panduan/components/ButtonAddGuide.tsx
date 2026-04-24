import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GuideResolver, type IGuideResolver } from '../data/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { BiPlus } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import GuideForm from './GuideForm'

const ButtonAddGuide = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const title = Cookies.get('title-guide')

  const form = useForm<IGuideResolver>({
    resolver: zodResolver(GuideResolver),
  })
  const valueGuide = Cookies.get('guide')
  const queryClient = useQueryClient()

  const handleSave = async (value: IGuideResolver) => {
    setLoading(true)
    await AxiosClient.post(`/panduan/${valueGuide}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: [`list-guide-${valueGuide}`],
          })
          toast.success(res.data.message || 'Success Tambah Panduan')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }
  const isAdmin = Cookies.get('is_admin') == 'true' ? true : false
  if (!isAdmin) {
    return <></>
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'text-primary hover:text-primary border-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Panduan {title}
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={`Tambah Panduan ${title}`}
        className={'rounded lg:max-w-7xl'}
        disableOutsideDialog
      >
        <GuideForm
          form={form}
          loading={loading}
          onCancel={() => {
            setOpen(false)
          }}
          handleSave={handleSave}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonAddGuide
