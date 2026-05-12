import { useNavigate, useParams } from 'react-router-dom'
import { UseGetEmployeeById } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useForm } from 'react-hook-form'
import {
  StatusActiveResolver,
  type TStatusActiveResolver,
} from '@/pages/modules/website-utama/lecturer-staff/set-status-active/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetStatusActive } from '@/pages/modules/website-utama/lecturer-staff/status-active/hooks'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const EditStatusActiveEmployee = () => {
  const { id } = useParams()
  const { employee } = UseGetEmployeeById(id as string)

  const { statusActive } = UseGetStatusActive({
    page: '0',
    limit: '0',
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useForm<TStatusActiveResolver>({
    resolver: zodResolver(StatusActiveResolver),
    defaultValues: {
      id_sdm: id,
    },
  })

  const HandleSave = async (value: TStatusActiveResolver) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/sdm-status-aktif-history`, {
      ...value,
      sejak: value?.sejak ? new Date(value?.sejak).toISOString() : null,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate(`/modules/website-utama/staff-lecturer/set-status-active/history/${id}`)
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className="flex flex-col gap-4 bg-white">
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <ButtonTitleGroup
              label="Tambah Status Aktif"
              buttonGroup={[
                { type: 'cancel', label: 'Batal', onClick: () => navigate(-1) },
                { type: 'save', isDisabled: loading, label: 'Simpan' },
              ]}
            />
            <p className="text-xl font-semibold text-green-500">Informasi Dosen / Staff</p>
            <div className="flex items-start gap-4">
              <img
                src={employee?.gambar_url}
                alt="image user"
                className={'w-[180px] h-[240px] object-cover'}
              />

              <div className="grid grid-cols-[12rem_1fr] gap-4">
                <p className="text-gray-500">Nama</p>
                <p>{employee?.nama}</p>
                <p className="text-gray-500">NIK</p>
                <p>{employee?.nik}</p>
                <p className="text-gray-500">NIP</p>
                <p>{employee?.nip}</p>
                <p className="text-gray-500">Golongan</p>
                <p>{employee?.nama_pangkat_golongan}</p>
                <p className="text-gray-500">Unit Kerja</p>
                <p>{employee?.nama_unit_kerja}</p>
                <p className="text-gray-500">Status</p>
                <p>{employee?.nama_status}</p>
              </div>
            </div>

            <p className="text-xl font-semibold text-green-500">Tambah Status Aktif Baru</p>

            <SelectBasicInput
              name={'id_status_aktif'}
              form={form}
              label={'Status Aktif'}
              placeholder={'Pilih Status Aktif'}
              usePortal
              isRequired
              isRow
              data={
                statusActive?.map((row) => ({
                  label: row?.nama_status,
                  value: row?.id_status_aktif_sdm,
                })) ?? []
              }
            />
            <TextInput
              name={'sejak'}
              form={form}
              label={'Sejak'}
              placeholder={'Sejak'}
              htmlFor={'sejak'}
              type={'date'}
              className={'w-1/2'}
              isDisabled={loading}
              isRow
              isRequired
            />
            <TextAreaInput
              name={'alasan'}
              form={form}
              label={'Alasan / Keterangan'}
              placeholder={'Alasan / Keterangan'}
              htmlFor={'Alasan'}
              isDisabled={loading}
              isRow
              isRequired
            />

            <UploadFileInput
              form={form}
              name={'url_lampiran'}
              keyname={'key_url_lampiran'}
              label={'Lampiran (Optional)'}
              isRow
              accept={'.pdf,.docx'}
            />

            <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
          </form>
        </Form>
      </div>
    </>
  )
}
