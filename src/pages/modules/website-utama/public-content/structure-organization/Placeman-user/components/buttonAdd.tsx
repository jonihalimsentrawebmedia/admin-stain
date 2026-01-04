import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import {
  PlacemanResolver,
  type PlacemanType,
} from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormPlacemanUser } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export const ButtonAddPlaceman = () => {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<PlacemanType>({
    resolver: zodResolver(PlacemanResolver),
    defaultValues: {
      id_kelompok_organisasi: id,
      show_email_public: false,
      show_no_hp_public: false,
    },
  })

  const queryClient = useQueryClient()

  const HandleSave = async (e: PlacemanType) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/pejabat', {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success tambah data pejabat')
          queryClient.invalidateQueries({
            queryKey: ['list-placeman'],
          })

          form.reset({
            show_email_public: false,
            show_no_hp_public: false,
            id_kelompok_organisasi: id,
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }


  return (
    <>
      <Button
        variant={'outline'}
        className={'border border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Pejabat
      </Button>

      <DialogCustom
        className={'rounded min-w-4xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Pejabat'}
      >
        <FormPlacemanUser
          open={open}
          setOpen={setOpen}
          form={form}
          HandleSave={HandleSave}
          loading={loading}
        />
      </DialogCustom>
    </>
  )
}
