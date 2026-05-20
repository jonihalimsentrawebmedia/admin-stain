import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
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
import { UseGetChiefOfficerGroup } from '../../hooks/index.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'

export const ButtonAddOfficially = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const { chiefOfficer } = UseGetChiefOfficerGroup({
    page: '0',
    limit: '0',
  })
  const form = useForm<OfficiallyType>({
    resolver: zodResolver(OfficiallyResolver),
    defaultValues: {
      id_kelompok: id,
    },
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post(`/spi/pimpinan/${id}`, { ...value })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(!open)
          queryClient.invalidateQueries({
            queryKey: ['chief-officially-spi'],
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
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Pejabat
      </Button>

      <DialogBasic
        title={'Tambah Pejabat'}
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
              placeholder={'Kelompok'}
              isRow
              isDisabled
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
              name={'nip'}
              form={form}
              label={'NIP'}
              placeholder={'NIP'}
              type={'number'}
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
