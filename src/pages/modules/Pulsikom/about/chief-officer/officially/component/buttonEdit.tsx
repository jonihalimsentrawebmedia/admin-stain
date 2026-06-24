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
import { zodResolver } from '@hookform/resolvers/zod'
import { OfficiallyResolver, type OfficiallyType } from '../data/resolver'
import { UseGetChiefOfficerGroup } from '@/pages/modules/Pulsikom/about/chief-officer/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IOfficially } from '../data/types'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UploadPasPhoto } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/uploadPasphoto.tsx'
import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'

interface Props {
  data: IOfficially
}

export const ButtonEditOfficially = (props: Props) => {
  const { data } = props
  const form = useForm<OfficiallyType>({
    resolver: zodResolver(OfficiallyResolver),
  })

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const { chiefOfficer } = UseGetChiefOfficerGroup()
  const { employee } = UseGetEmployee({
    page: '0',
    limit: '0',
    filter: form?.watch('is_dosen') === true ? 'DOSEN' : 'STAFF',
  })

  useEffect(() => {
    if (data) {
      form.reset({
        url_gambar: data.url_gambar,
        id_kelompok: data?.id_kelompok_pimpinan,
        nama_penjabat: data?.nama_penjabat,
        jabatan: data?.jabatan,
        is_local_data: !!data?.id_sdm,
        is_dosen: data?.is_dosen,
        id_sdm: data?.id_sdm,
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
                placeholder={'Upload Foto'}
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
