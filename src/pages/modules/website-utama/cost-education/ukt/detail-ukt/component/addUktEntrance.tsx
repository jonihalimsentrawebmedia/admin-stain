import UseGetEducationalLevel from '@/pages/modules/settings/reference/educational-level/controller/useGetEducationalLevel.tsx'
import UseGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi.tsx'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { InputCheckbox } from '@/components/common/form/InputCheckbox.tsx'
import { UseGetEntrance } from '@/pages/modules/website-utama/cost-education/ukt/entrance-list/hooks'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  id_prodi?: string
  list_id?: string[]
}

export const AddUktEntrance = (props: props) => {
  const { id_prodi, list_id } = props
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const form = useForm()

  const { entrance } = UseGetEntrance({
    page: '0',
    limit: '0',
  })
  const { educationalLevel } = UseGetEducationalLevel({ isGetAll: true })
  const { satuanOrganisasi: faculty } = UseGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: 'FAKULTAS',
  })
  const { satuanOrganisasi: prodi } = UseGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: 'PRODI',
  })

  useEffect(() => {
    if (props) {
      const dataProdi = prodi?.find((row) => row?.id_satuan_organisasi === id_prodi)
      form.reset({
        id_jenjang: dataProdi?.id_jenjang_pendidikan,
        id_fakultas: dataProdi?.parent_id,
        id_prodi: dataProdi?.id_satuan_organisasi,
        id_jalur_masuk: list_id ? list_id : [],
      })
    }
  }, [id_prodi, list_id])

  const queryClient = useQueryClient()
  const HandlerSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/biaya-pendidikan-ukt/prodi/${id_prodi}/jalur-masuk`, {
      id_jalur_masuk: value?.id_jalur_masuk,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['list_price_ukt'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'border-primary text-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah Jalur Masuk
      </Button>

      <DialogBasic
        title={'Tambah Jalur Masuk'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
            <SelectBasicInput
              name={'id_jenjang'}
              form={form}
              placeholder={'Pilih Jenjang'}
              label={'Jenjang'}
              isDisabled
              isRow
              isRequired
              data={
                educationalLevel?.map((row) => ({
                  label: row?.nama_jenjang,
                  value: row?.id_jenjang,
                })) ?? []
              }
            />
            <SelectBasicInput
              name={'id_fakultas'}
              form={form}
              isDisabled
              placeholder={'Pilih Fakultas'}
              label={'Fakultas'}
              isRow
              isRequired
              data={
                faculty?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_satuan_organisasi,
                })) ?? []
              }
            />
            <SelectBasicInput
              name={'id_prodi'}
              form={form}
              placeholder={'Pilih Prodi'}
              label={'Prodi'}
              isRow
              isDisabled
              isRequired
              data={
                prodi?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_satuan_organisasi,
                })) ?? []
              }
            />

            <InputCheckbox
              form={form}
              name={'id_jalur_masuk'}
              label={'Jalur Masuk'}
              isRow
              isRequired
              data={
                entrance?.map((row) => ({
                  value: row?.id_jalur_masuk,
                  label: row?.nama_jalur_masuk,
                })) ?? []
              }
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
