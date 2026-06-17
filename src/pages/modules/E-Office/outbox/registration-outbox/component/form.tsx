import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import { type SuratFormType, SuratSchema } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetSessionEOffice } from '@/pages/modules/E-Office/session/hooks.tsx'
import { USeGetLetterNature } from '@/pages/modules/E-Office/reference/letter-nature/hooks'
import { USeGetLetterType } from '@/pages/modules/E-Office/reference/letter-type/hooks'
import { USeGetLetterClassification } from '@/pages/modules/E-Office/reference/letter-classification/hooks'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import { USeGetReminderAgenda } from '@/pages/modules/E-Office/reference/reminder-agenda/hooks'
import { UseGetHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import SelectUseRoleData from '@/pages/modules/E-Office/component/common/selectUser.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IOutbox } from '../data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { IoMdMailOpen } from 'react-icons/io'
import { RiBuildingLine } from 'react-icons/ri'
import { IoChatboxOutline, IoShieldCheckmarkSharp } from 'react-icons/io5'
import {
  FaFileSignature,
  FaHashtag,
  FaRegCalendarAlt,
  FaRegFileAlt,
  FaRegFileArchive,
  FaRegUser,
} from 'react-icons/fa'
import { SelectIconInput } from '@/pages/modules/E-Office/component/common/formIcon/selectIcon.tsx'
import { GoLaw } from 'react-icons/go'
import TextInputIcon from '@/pages/modules/E-Office/component/common/formIcon/TextInputIcon.tsx'
import { BsBell, BsTag } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'
import { UploadDocWithDescription } from '@/pages/modules/E-Office/component/common/formIcon/uploadWithDesc.tsx'

interface IProps {
  data?: IOutbox
}

export const FormRegistrationOutbox = (props: IProps) => {
  const { data } = props

  const form = useForm<SuratFormType>({
    resolver: zodResolver(SuratSchema),
    defaultValues: {
      is_agenda: false,
      is_penting: false,
      is_disposisi: false,
      is_lampiran: false,
      is_samakan_dengan_surat: false,
    },
  })

  const navigate = useNavigate()

  const { institution } = UseGetUnitInstitution()
  const { humanResource } = UseGetHumanResource({ page: '0', limit: '0' })
  const { letterNature } = USeGetLetterNature({ page: '0', limit: '0' })
  const { letterType } = USeGetLetterType({ page: '0', limit: '0' })
  const { letterClassification } = USeGetLetterClassification({ page: '0', limit: '0' })
  const { reminderAgenda } = USeGetReminderAgenda({ page: '0', limit: '0' })
  const {} = UseGetSessionEOffice()

  const [loading, setLoading] = useState(false)

  const HandleSave = async (value: SuratFormType) => {
    setLoading(true)
    if (data) {
      await AxiosClient.put(`/eoffice/surat-keluar/${data?.id_surat_keluar ?? ''}`, {
        ...value,
        list_lampiran:
          value?.list_lampiran?.map((row) => ({
            url: row?.url,
            nama_lampiran: row?.nama_lampiran,
          })) ?? null,
      })
        .then((res) => {
          if (res.data.status) {
            setLoading(false)
            form.reset()
            toast.success('Berhasil membuat surat masuk')
            navigate(
              `/modules/e-office/outbox/registration-outbox/detail/${res?.data?.data?.id_surat_keluar ?? ''}`
            )
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err?.response?.data?.message || 'Gagal membuat surat masuk')
        })
    } else {
      await AxiosClient.post('/eoffice/surat-keluar', {
        ...value,
        list_lampiran:
          value?.list_lampiran?.map((row) => ({
            url: row?.url,
            nama_lampiran: row?.nama_lampiran,
          })) ?? null,
      })
        .then((res) => {
          if (res.data.status) {
            console.log(res)
            setLoading(false)
            form.reset()
            toast.success('Berhasil membuat surat masuk')
            navigate(
              `/modules/e-office/outbox/registration-outbox/detail/${res?.data?.data?.id_surat_keluar ?? ''}`
            )
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err?.response?.data?.message || 'Gagal membuat surat masuk')
        })
    }
  }

  useEffect(() => {
    if (data) {
      form.reset({
        ...(data as unknown as SuratFormType),
        list_id_sdm: data?.pejabat?.map((row) => row?.id_sdm),
        list_lampiran: data?.lampiran.map((row) => ({
          url: row?.lampiran_url,
          nama_lampiran: row?.nama_lampiran,
        })),
      })
    }
  }, [data])

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <div className={'grid grid-cols-2 gap-5 bg-white p-5 rounded border'}>
            <div className="flex items-center gap-2 col-span-2">
              <div className="bg-primary w-fit text-white rounded-lg p-2">
                <IoMdMailOpen className={'size-5'} />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Data Surat Keluar</p>
                <p className="text-gray-500 text-sm">Informasi Lengkap Mengenai Surat Keluar</p>
              </div>
            </div>

            <SelectIconInput
              icon={<RiBuildingLine className={'size-5 text-primary'} />}
              form={form}
              label={'Satuan Kerja'}
              placeholder={'Satuan kerja'}
              name={'id_unit'}
              isRequired
              className={'col-span-2 z-[50]!'}
              data={
                institution?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_satuan_organisasi,
                })) ?? []
              }
            />
            <SelectIconInput
              icon={<IoShieldCheckmarkSharp className={'size-5 text-primary'} />}
              form={form}
              label={'Sifat Surat'}
              placeholder={'Sifat surat'}
              name={'id_sifat_surat'}
              isRequired
              className={'col-span-1 z-[40]!'}
              data={
                letterNature?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_sifat_surat,
                })) ?? []
              }
            />
            <SelectIconInput
              icon={<FaRegFileAlt className={'size-5 text-primary'} />}
              form={form}
              label={'Jenis Surat'}
              placeholder={'Jenis surat'}
              name={'id_jenis_surat'}
              isRequired
              className={'col-span-1 z-[40]!'}
              data={
                letterType?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_jenis_surat,
                })) ?? []
              }
            />
            <SelectIconInput
              icon={<GoLaw className={'size-5 text-primary'} />}
              form={form}
              label={'Klasifikasi Surat'}
              placeholder={'klasifikasi surat'}
              name={'id_klasifikasi_surat'}
              isRequired
              className={'col-span-2 z-[30]!'}
              data={
                letterClassification?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_klasifikasi_surat,
                })) ?? []
              }
            />

            <SelectIconInput
              icon={<FaFileSignature className={'text-primary size-5'} />}
              form={form}
              label={'Penandatangan Surat'}
              placeholder={'Pilih Pegawai Penandatangan Surat'}
              name={'id_penandatangan_sdm'}
              isRequired
              className={'col-span-2 z-[20]!'}
              data={
                humanResource?.map((row) => ({
                  label: row?.nama,
                  value: row?.id_sdm,
                })) ?? []
              }
            />

            <TextInputIcon
              icon={<FaRegUser className={'size-5 text-primary'} />}
              name={'surat_kepada'}
              form={form}
              label={'Penerima Surat'}
              placeholder={'Penerima surat'}
              htmlFor={'penerima_surat'}
              className={'col-span-2'}
              isRequired
            />

            <TextInputIcon
              icon={<FaHashtag className={'size-5 text-primary'} />}
              name={'nomor_surat'}
              form={form}
              label={'Nomor Surat'}
              placeholder={'Nomor surat'}
              className={'col-span-1'}
              htmlFor={'nomor_surat'}
              isRequired
            />

            <TextInputIcon
              icon={<FaRegCalendarAlt className={'size-5 text-primary'} />}
              name={'tanggal_surat'}
              form={form}
              label={'Tanggal Surat'}
              placeholder={'Tanggal surat'}
              className={'col-span-1'}
              htmlFor={'tanggal_surat'}
              type={'date'}
              isRequired
            />

            <TextInputIcon
              icon={<BsTag className={'size-5 text-primary'} />}
              name={'perihal'}
              form={form}
              label={'Perihal'}
              placeholder={'Perihal'}
              htmlFor={'perihal'}
              className={'col-span-2'}
              isRequired
            />

            <TextAreaInput
              name={'ringkasan'}
              form={form}
              label={'Ringkasan Surat'}
              placeholder={'Ringkasan Surat'}
              htmlFor={'ringkasan'}
              className={'col-span-2'}
              isRequired
            />
          </div>

          <div className="border p-5 rounded grid grid-cols-2 gap-5 bg-white">
            <div className="col-span-2">
              <div className="flex items-center gap-2 col-span-2">
                <div className="bg-primary w-fit text-white rounded-lg p-2">
                  <FaRegCalendarAlt className={'size-5'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Data Agenda</p>
                  <p className="text-gray-500 text-sm">Informasi Lengkap Mengenai Agenda</p>
                </div>
              </div>
              <hr className={'my-2 border-green-400'} />
            </div>

            <div className="col-span-2">
              <CheckboxInputBasic
                name={'is_agenda'}
                form={form}
                label={'Aktifkan Agenda'}
                isRequired
              />
            </div>
            {form.watch('is_agenda') === true && (
              <>
                <TextInputIcon
                  icon={<FaRegFileAlt className={'size-5 text-primary'} />}
                  name={'nama_kegiatan'}
                  form={form}
                  label={'Nama Kegiatan'}
                  htmlFor={'nama_kegiatan'}
                  className={'col-span-1'}
                  placeholder={'Nama kegiatan'}
                  isRequired
                />
                <CheckboxInputBasic
                  name={'is_samakan_dengan_surat'}
                  form={form}
                  label={'Samakan dengan perihal surat'}
                  className={'whitespace-nowrap mt-4'}
                  fx={(e) => {
                    if (e) {
                      const same = form.getValues('perihal')
                      form.setValue('nama_kegiatan', same)
                    }
                  }}
                />

                <TextInputIcon
                  icon={<IoChatboxOutline className={'size-5 text-primary'} />}
                  name={'keterangan_agenda'}
                  form={form}
                  label={'Keterangan Agenda (opsional)'}
                  htmlFor={'keterangan_agenda'}
                  className={'col-span-2'}
                  placeholder={'Keterangan agenda'}
                />

                <TextInputIcon
                  icon={<FaRegCalendarAlt className={'size-5 text-primary'} />}
                  name={'tanggal_mulai'}
                  form={form}
                  label={'Mulai Dari'}
                  type={'datetime-local'}
                  htmlFor={'tanggal_mulai'}
                  className={'col-span-1'}
                  isRequired
                />
                <TextInputIcon
                  icon={<FaRegCalendarAlt className={'size-5 text-primary'} />}
                  name={'tanggal_selesai'}
                  form={form}
                  label={'Sampai Dengan'}
                  type={'datetime-local'}
                  htmlFor={'tanggal_selesai'}
                  className={'col-span-1'}
                  isRequired
                />
                <TextInputIcon
                  icon={<GrLocation className={'size-5 text-primary'} />}
                  name={'tempat'}
                  label={'Tempat / Lokasi'}
                  htmlFor={'address'}
                  form={form}
                  className={'col-span-2'}
                  placeholder={'Tempat / Lokasi'}
                  isRequired
                />

                <SelectIconInput
                  icon={<BsBell className={'size-5 text-primary'} />}
                  name={'id_waktu_pengingat_agenda'}
                  form={form}
                  placeholder={'Pilih waktu pengingat agenda'}
                  label={'Waktu Pengingat Agenda'}
                  className={'col-span-2'}
                  isRequired
                  data={
                    reminderAgenda?.map((row) => ({
                      label: `${row?.waktu} Menit`,
                      value: row?.id_waktu_pengigat_agenda,
                    })) ?? []
                  }
                />
                <CheckboxInputBasic
                  name={'is_penting'}
                  form={form}
                  label={'Penting'}
                  isRequired
                  className={'col-span-1'}
                />
              </>
            )}
          </div>

          <div className="border p-5 rounded grid grid-cols-2 gap-5 bg-white">
            <div className="col-span-2">
              <div className="flex items-center gap-2 col-span-2">
                <div className="bg-primary w-fit text-white rounded-lg p-2">
                  <FaRegFileArchive className={'size-5'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Data Lampiran</p>
                  <p className="text-gray-500 text-sm">Informasi Lengkap Mengenai Data Lampiran</p>
                </div>
              </div>
              <hr className={'my-2 border-green-400'} />
            </div>

            <div className="col-span-2">
              <CheckboxInputBasic
                name={'is_lampiran'}
                form={form}
                label={'Aktifkan Lampiran'}
                isRequired
              />
            </div>

            {form?.watch('is_lampiran') === true && (
              <UploadDocWithDescription
                form={form}
                label={'Upload Lampiran'}
                name={'list_lampiran'}
                required
              />
            )}
          </div>

          <div className="border p-5 rounded grid grid-cols-2 gap-5 bg-white">
            <div className="col-span-2">
              <div className="flex items-center gap-2 col-span-2">
                <div className="bg-primary w-fit text-white rounded-lg p-2">
                  <FaRegFileArchive className={'size-5'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Tembusan</p>
                  <p className="text-gray-500 text-sm">
                    Atur Tembusan Dan Pihak Lain Yang Akan Menerima Surat
                  </p>
                </div>
              </div>
              <hr className={'my-2 border-green-400'} />
            </div>

            <div className="col-span-2">
              <CheckboxInputBasic
                name={'is_disposisi'}
                form={form}
                label={'Aktifkan Tembusan'}
                isRequired
              />
            </div>

            {form.watch('is_disposisi') === true && (
              <>
                <div className="col-span-2">
                  <SelectUseRoleData
                    form={form}
                    name={'list_id_sdm'}
                    label={'Pilih Disposisi'}
                    placeholder={'Pilih disposisi'}
                    data={humanResource?.map((row) => ({
                      label: row?.nama,
                      value: row?.id_sdm,
                    }))}
                    isRequired
                  />
                </div>
              </>
            )}
          </div>

          <ButtonForm loading={loading} />
        </form>
      </Form>
    </>
  )
}
