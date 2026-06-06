import { UseGetDetailEventActivity } from '@/pages/modules/E-Office/event-activity/event-data/hooks'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card.tsx'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { MdPrint } from 'react-icons/md'
import { generatePreviewAttendancePdf } from '@/pages/modules/E-Office/utils/generateAttendancePdf.ts'
import pdfMake from 'pdfmake/build/pdfmake'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FaEye } from 'react-icons/fa'
import { AttendanceSettingResolver, type AttendanceSettingType } from './data/resolver.tsx'
import FormMoreSignature from '@/pages/modules/E-Office/event-activity/event-data/printAttendance/component/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

const PrintAttendanceList = () => {
  const { id: slug } = useParams()
  const { event } = UseGetDetailEventActivity(slug as string)
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState<string>()
  const [loading, setLoading] = useState(false)

  const form = useForm<AttendanceSettingType>({
    resolver: zodResolver(AttendanceSettingResolver),
    defaultValues: {
      nomor: true,
      nama_peserta: true,
      instansi: true,
      hp: true,
      email: false,
      jabatan: true,
      tanda_tangan: true,
      keterangan: false,
      hasil_cetak: 'portrait',
      jumlah_peserta: 10,
      label_diketahui: '',
      jabatan_diketahui: '',
      nama_diketahui: '',
      label_mengetahui: '',
      jabatan_mengetahui: '',
      nama_mengetahui: '',
      saksi_pendatang: [],
    },
  })

  const HandlePreview = async (values: any) => {
    const { docDefinition } = generatePreviewAttendancePdf({
      values,
      event,
    })

    const blob = await pdfMake.createPdf(docDefinition).getBlob()
    const url = URL.createObjectURL(blob)
    setUrl(url)
    setOpen(true)
  }

  const HandlePrint = (values: any) => {
    const { docDefinition } = generatePreviewAttendancePdf({
      values,
      event,
    })

    pdfMake.createPdf(docDefinition).print()
  }

  const HandleSave = async (values: AttendanceSettingType) => {
    await AxiosClient.post(`eoffice/cetak-daftar-hadir/${slug}`, values)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Cetak Daftar Hadir'} isBack buttonGroup={[]} />
        <Card>
          <CardContent className={'space-y-2.5'}>
            <p className="text-gray-500">Nama Kegiatan</p>
            <p className="text-xl">{event?.nama_kegiatan}</p>
            <div className="grid grid-cols-2 gap-5 max-w-[800px]">
              <div>
                <p className="text-gray-500">Hari Tanggal</p>
                <p>
                  {event?.tanggal_mulai
                    ? format(event?.tanggal_mulai, 'EEEE, dd-MM-yyyy', { locale: id })
                    : ''}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Waktu</p>
                <p>{event?.waktu}</p>
              </div>
              <div>
                <p className="text-gray-500">Tempat</p>
                <p>{event?.tempat}</p>
              </div>
              <div>
                <p className="text-gray-500">Penyelenggara</p>
                <p>{event?.penyelenggara}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form className={'space-y-5'} onSubmit={form.handleSubmit(HandleSave)}>
            <Card>
              <CardContent className={'space-y-1.5'}>
                <CardTitle>Kolom Daftar Hadir</CardTitle>
                <CardDescription>
                  *Tentukan data yang perlu diisi oleh peserta yang hadir
                </CardDescription>
                <div className={'flex items-start gap-4'}>
                  <div className="w-1/2 flex flex-col gap-4 mt-2">
                    <InputRadio
                      form={form}
                      name={'nomor'}
                      label={'Nomor'}
                      data={[{ label: 'Ya', value: true }]}
                      isRow
                    />
                    <InputRadio
                      form={form}
                      name={'Nama_peserta'}
                      label={'Nama Peserta'}
                      isRow
                      data={[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false },
                      ]}
                    />
                    <InputRadio
                      form={form}
                      name={'instansi'}
                      label={'Instansi/Alamat'}
                      isRow
                      data={[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false },
                      ]}
                    />
                    <InputRadio
                      form={form}
                      name={'hp'}
                      label={'HP'}
                      isRow
                      data={[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false },
                      ]}
                    />
                    <InputRadio
                      form={form}
                      name={'email'}
                      label={'Email'}
                      isRow
                      data={[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false },
                      ]}
                    />
                    <InputRadio
                      form={form}
                      name={'jabatan'}
                      label={'Jabatan'}
                      isRow
                      data={[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false },
                      ]}
                    />
                    <InputRadio
                      form={form}
                      name={'tanda_tangan'}
                      label={'Tanda Tangan'}
                      isRow
                      data={[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false },
                      ]}
                    />
                    <InputRadio
                      form={form}
                      name={'keterangan'}
                      label={'Keterangan'}
                      isRow
                      data={[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false },
                      ]}
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-4 mt-2">
                    <InputRadio
                      form={form}
                      name={'hasil_cetak'}
                      label={'Hasil Cetak'}
                      isRow
                      data={[
                        { label: 'Portrait', value: 'portrait' },
                        { label: 'Landscape', value: 'landscape' },
                      ]}
                    />
                    <TextInput
                      form={form}
                      name={'jumlah_peserta'}
                      placeholder={'Jumlah'}
                      label={'Jumlah Row Peserta'}
                      type={'number'}
                      isNumber
                      isRow
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        className={'rounded-full text-white w-fit'}
                        onClick={async (e) => {
                          e.preventDefault()
                          await HandlePreview(form.getValues() as any)
                        }}
                      >
                        <FaEye />
                        Preview
                      </Button>
                      <Button
                        className={'rounded-full text-white w-fit'}
                        onClick={(e) => {
                          e.preventDefault()
                          HandlePrint(form.getValues() as any)
                        }}
                      >
                        <MdPrint />
                        Cetak
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className={'space-y-1.5'}>
                <CardTitle>Penandatangan Daftar Hadir</CardTitle>
                <div className={'flex items-start gap-5'}>
                  <div className={'w-1/2 flex flex-col gap-4 mt-2'}>
                    <p className="text-blue-500 text-lg">Diketahui Oleh</p>
                    <TextInput
                      name={'label_diketahui'}
                      form={form}
                      label={'Label Diketahui'}
                      placeholder={'Label Diketahui'}
                      htmlFor={'label_diketahui'}
                      isRequired
                    />
                    <TextInput
                      name={'nama_diketahui'}
                      form={form}
                      label={'Nama'}
                      placeholder={'Nama'}
                      htmlFor={'diketahui_nama'}
                      isRequired
                    />
                    <TextInput
                      name={'jabatan_diketahui'}
                      form={form}
                      label={'Jabatan'}
                      placeholder={'Jabatan'}
                      htmlFor={'diketahui_jabatan'}
                      isRequired
                    />
                  </div>
                  <div className={'w-1/2 flex flex-col gap-4 mt-2'}>
                    <p className="text-blue-500 text-lg">Yang Mengetahui</p>
                    <TextInput
                      name={'label_mengetahui'}
                      form={form}
                      label={'Label Mengetahui'}
                      placeholder={'Label Mengetahui'}
                      htmlFor={'label_mengetahui'}
                      isRequired
                    />
                    <TextInput
                      name={'nama_mengetahui'}
                      form={form}
                      label={'Nama'}
                      placeholder={'Nama'}
                      htmlFor={'mengetahui_nama'}
                      isRequired
                    />
                    <TextInput
                      name={'jabatan_mengetahui'}
                      form={form}
                      label={'Jabatan'}
                      placeholder={'Jabatan'}
                      htmlFor={'mengetahui_jabatan'}
                      isRequired
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <FormMoreSignature name={'saksi_pendatang'} form={form} />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </div>

      <DialogBasic
        title={'Preview Daftar Hadir'}
        open={open}
        setOpen={setOpen}
        className={'min-w-5xl'}
      >
        <iframe src={url} width={'100%'} height={'600'} />
      </DialogBasic>
    </>
  )
}

export default PrintAttendanceList
