import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useParams } from 'react-router-dom'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { OfficiallyResolver, type OfficiallyType } from '../data/resolver'
import { UseGetChiefOfficerGroup } from '@/pages/modules/Pulsikom/about/chief-officer/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IOfficially } from '../data/types'

interface Props {
  data: IOfficially
}

export const ButtonEditOfficially = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const { chiefOfficer } = UseGetChiefOfficerGroup()
  const form = useForm<OfficiallyType>({
    resolver: zodResolver(OfficiallyResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        url_gambar: data.url_gambar,
        id_kelompok: data?.id_kelompok_pimpinan,
        nama_penjabat: data?.nama_penjabat,
        jabatan: data?.jabatan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.put(`/pusilkom/pimpinan/${id}/${data?.id_pimpinan}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(!open)
          queryClient.invalidateQueries({
            queryKey: ['chief-officially'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <button
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Edit Data Pejabat'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <UploadPhotoImage ratio_width={3} ratio_height={4} name={'url_gambar'} form={form} />
            <SelectBasicInput
              name={'id_kelompok'}
              label={'Kelompok'}
              form={form}
              isDisabled
              isRow
              placeholder={'Kelompok'}
              data={
                chiefOfficer?.map((row) => ({
                  label: row?.nama_kelompok,
                  value: row?.id_kelompok_pimpinan,
                })) ?? []
              }
            />
            <TextInput
              name={'nama_penjabat'}
              form={form}
              label={'Nama Pejabat'}
              placeholder={'Nama Pejabat'}
              isRow
              isRequired
            />

            <TextInput
              name={'jabatan'}
              form={form}
              label={'Jabatan'}
              placeholder={'Jabatan'}
              isRow
              isRequired
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
