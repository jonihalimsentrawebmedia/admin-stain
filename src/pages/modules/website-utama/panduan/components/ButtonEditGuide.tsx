import { useState } from 'react'
import type { GuideList } from '../data/type'
import { useForm } from 'react-hook-form'
import { GuideResolver, type IGuideResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { HiPencil } from 'react-icons/hi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import GuideForm from './GuideForm'

interface Props {
  data: GuideList
}
const ButtonEditGuide = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IGuideResolver>({
    resolver: zodResolver(GuideResolver),
  })
const title=Cookies.get('title-guide')
  const queryClient = useQueryClient()

  const valueGuide = Cookies.get('guide')

  const handleSave = async (value: IGuideResolver) => {
    setLoading(true)
    await AxiosClient.put(`/panduan/${valueGuide}/${data?.id_dokumentasi}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: [`list-guide-${valueGuide}`],
          })
          toast.success(res.data.message || 'Success Edit Panduan')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'p-1.5 text-white bg-yellow-500 hover:bg-yellow-600 rounded'}
        onClick={() => {
          setOpen(!open)
          form.reset({
            isi: data.isi,
            judul: data.judul,
          })
        }}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={`Edit Panduan ${title}`}
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

export default ButtonEditGuide
