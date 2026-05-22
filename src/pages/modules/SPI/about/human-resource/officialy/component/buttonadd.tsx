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
import { zodResolver } from '@hookform/resolvers/zod'
import { OfficiallyResolver, type OfficiallyType } from '../data/resolver'
import { UseGetChiefOfficerGroup } from '../../hooks/index.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UploadPasPhoto } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/uploadPasphoto.tsx'

export const ButtonAddOfficially = () => {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<OfficiallyType>({
    resolver: zodResolver(OfficiallyResolver),
    defaultValues: {
      id_kelompok: id,
    },
  })
  const { chiefOfficer } = UseGetChiefOfficerGroup({
    page: '0',
    limit: '0',
  })
  const { employee } = UseGetEmployee({
    page: '0',
    limit: '0',
    filter: form?.watch('is_dosen') === true ? 'DOSEN' : 'STAFF',
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
            <InputRadio
              form={form}
              name={'is_local_data'}
              label={'Pilih Dari Data Dosen/Staff'}
              data={[
                { label: 'Ya', value: true },
                { label: 'Tidak', value: false },
              ]}
              fx={() => {
                form.setValue('is_dosen', null)
                form.setValue('id_sdm', null)
                form.setValue('nama_penjabat', '')
                form.setValue('jabatan', '')
              }}
              isRequired
              isRow
            />

            {!!form?.watch('is_local_data') && (
              <>
                <InputRadio
                  form={form}
                  name={'is_dosen'}
                  label={'Jenis User'}
                  data={[
                    { label: 'Dosen', value: true },
                    { label: 'Staff', value: false },
                  ]}
                  fx={() => {
                    form.setValue('nama_penjabat', '')
                    form.setValue('jabatan', '')
                  }}
                  isRequired
                  isRow
                />
              </>
            )}

            {!!form?.watch('is_local_data') && (
              <SelectBasicInput
                isDisabled={loading || !form.watch('is_local_data')}
                fx={(e) => {
                  const employeeFind = employee?.find((row) => row?.id_sdm === e.value)
                  form.setValue('url_gambar', employeeFind?.gambar_url ?? '')
                  form.setValue('nama_penjabat', employeeFind?.nama ?? '')
                  form.setValue('jabatan', employeeFind?.nama_jabatan_struktural ?? '')
                }}
                name={'id_sdm'}
                form={form}
                label={'Pilih Dosen / Staff'}
                placeholder={'Pilih Dosen / Staff'}
                showNull
                selectClassName={'z-[60]'}
                isRow
                data={
                  employee?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_sdm,
                  })) ?? []
                }
              />
            )}

            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <div />
              <UploadPasPhoto
                label={'Foto Profil (4x6)'}
                name={'url_gambar'}
                form={form}
                required
                placeholder={'Uplaod Foto'}
                canUpload={!form.watch('is_local_data')}
              />
            </div>

            <TextInput
              form={form}
              name="nama_penjabat"
              isRow
              label="Nama"
              placeholder="Nama"
              isDisabled={!!form.watch('is_local_data')}
            />

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
