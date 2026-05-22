import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput'
import ButtonForm from '@/components/common/button/ButtonForm'
import {
  type IManagementUnitTypeForm,
  ManagementUnitResolver,
} from '@/pages/modules/website-utama/program-studi/detail/model/management-unit.tsx'
import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UploadPasPhoto } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/uploadPasphoto.tsx'

const ButtonAddManagementUnit = () => {
  const form = useForm<IManagementUnitTypeForm>({
    resolver: zodResolver(ManagementUnitResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { employee } = UseGetEmployee({
    page: '0',
    limit: '0',
    filter: form?.watch('is_dosen') === true ? 'DOSEN' : 'STAFF',
  })

  const queryClient = useQueryClient()

  const handleSave = async (e: IManagementUnitTypeForm) => {
    setLoading(true)
    await AxiosClient.post(`/prodi/profil/unit-pengelola`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['management-unit'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah unit pengelola')
          form.reset()
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
        onClick={() => {
          setOpen(true)
        }}
        className="border border-primary hover:text-primay text-primary"
      >
        <Plus />
        Tambah
      </Button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Tambah Unit Pengelola'}
        width="50%"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
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
                form.setValue('nama', '')
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
                    form.setValue('nama', '')
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
                  form.setValue('gambar_url', employeeFind?.gambar_url ?? '')
                  form.setValue('nama', employeeFind?.nama ?? '')
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
                name={'gambar_url'}
                form={form}
                required
                placeholder={'Uplaod Foto'}
                canUpload={!form.watch('is_local_data')}
              />
            </div>
            <TextInput form={form} name="jabatan" isRow label="Jabatan" placeholder="Jabatan" />
            <TextInput
              form={form}
              name="urutan"
              isRow
              isNumber
              type="number"
              label="Urutan"
              placeholder="Urutan"
            />
            <ButtonForm
              loading={loading}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}

export default ButtonAddManagementUnit
