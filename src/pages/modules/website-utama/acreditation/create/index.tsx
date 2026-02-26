import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { AcreditationResolver, type IAcreditationTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AcreditationViewModel from '@/pages/modules/website-utama/acreditation/AcreditationViewModel.tsx'
import InputImage3 from '@/components/common/form/InputImage3.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const CreateAccreditation = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { optionsOrganisasiJoin } = AcreditationViewModel()
  const optionsAcreditationValue = [
    {
      value: 'UNGGUL',
      label: 'UNGGUL',
    },
    {
      value: 'BAIK_SEKALI',
      label: 'BAIK SEKALI',
    },
    {
      value: 'BAIK',
      label: 'BAIK',
    },
    {
      value: 'TIDAK_TERAKREDITASI',
      label: 'TIDAK TERAKREDITASI',
    },
  ]

  const form = useForm<IAcreditationTypeForm>({
    resolver: zodResolver(AcreditationResolver),
  })

  const HandleSave = async (e: IAcreditationTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/akreditas', {
      ...e,
      mulai_berlaku: new Date(e.mulai_berlaku).toISOString(),
      akhir_berlaku: new Date(e.akhir_berlaku).toISOString(),
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          navigate('/modules/website-utama/acreditation')
          toast.success(res?.data?.message || 'Data berhasil disimpan')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 p-5'}>
            <ButtonTitleGroup
              label={'Tambah Data Akreditasi'}
              buttonGroup={[
                {
                  type: 'cancel',
                  label: 'Batal',
                  onClick: () => {
                    navigate(-1)
                  },
                },
                {
                  isDisabled: loading,
                  type: 'save',
                  label: 'Simpan',
                },
              ]}
            />

            <InputImage3 form={form} name="gambar" isRow label="Gambar*" />

            <UploadFileInput
              form={form}
              innerClassName={'w-full bg-white'}
              name={'dokumen_akreditas'}
              label={'Berkas Akreditas'}
              keyname={'key_dokumen_akreditas'}
              accept={'application/pdf'}
              isRow
              required
            />

            <UploadFileInput
              form={form}
              innerClassName={'w-full bg-white'}
              name={'dokumen_sk_akreditas'}
              label={'SK Berkas Akreditas'}
              keyname={'key_dokumen_sk_akreditas'}
              accept={'application/pdf'}
              isRow
              required
            />

            <SelectBasicInput
              data={optionsOrganisasiJoin ?? []}
              form={form}
              name="id_satuan_organisasi_akreditas"
              placeholder="Pilih"
              label="Pilih Universitas / Prodi"
              isRow
              selectClassName="z-50"
              isRequired
            />

            <TextAreaInput isRow form={form} name="uraian" label="Uraian" placeholder="Uraian" />
            <SelectBasicInput
              data={optionsAcreditationValue}
              form={form}
              name="nilai_akreditas"
              placeholder="Pilih"
              label="Nilai Akreditasi"
              isRequired
              isRow
            />
            <TextInput
              form={form}
              name="lembaga_penilaian"
              placeholder="Nama Lembaga Penilai"
              isRow
              label="Lembaga Penilai"
              isRequired
            />
            <TextInput
              form={form}
              name="no_surat_keputusan"
              placeholder="No. Surat Keputusan"
              isRow
              label="No. Surat Keputusan"
              isRequired
            />
            <TextInput
              form={form}
              type="date"
              inputClassName="max-w-[150px]"
              name="mulai_berlaku"
              placeholder="Mulai Berlaku*"
              isRow
              isRequired
              label="Mulai Berlaku"
            />
            <TextInput
              form={form}
              min={form.watch('mulai_berlaku')}
              type="date"
              inputClassName="max-w-[150px]"
              name="akhir_berlaku"
              placeholder="Akhir Berlaku*"
              isRow
              isRequired
              label="Akhir Berlaku"
            />

            <ButtonForm loading={loading} />
          </form>
        </Form>
      </div>
    </>
  )
}
