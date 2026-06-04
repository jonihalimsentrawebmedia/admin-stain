import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { UseGetDispositionDetail } from '@/pages/modules/E-Office/inbox/disposition/hooks'
import { format } from 'date-fns'
import { FaFile } from 'react-icons/fa'
import { ButtonShowDisposition } from '@/pages/modules/E-Office/inbox/registration-inbox/detail/disposisi/component/buttonShow.tsx'
import { UseGetComment } from '@/pages/modules/E-Office/inbox/registration-inbox/detail/comment/hooks'
import { cn } from '@/lib/utils.ts'
import TextInput from '@/components/common/form/TextInput.tsx'
import { IoSend } from 'react-icons/io5'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useState } from 'react'
import ButtonResponseStatusDisposition from '@/pages/modules/E-Office/inbox/disposition/compnent/buttonResponse.tsx'

export const DetailDisposition = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispositionDetail: detail } = UseGetDispositionDetail(id as string)
  const { comment } = UseGetComment(id as string)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/surat-masuk/komentar/${id}`, {
      komentar: value.komentar,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['comment'],
          })
          form.reset({
            comment: '',
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <div className="space-y-5 py-10">
        <ButtonTitleGroup
          label={'Detail Surat Masuk'}
          isBack
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/e-office/inbox/registration-inbox/edit/${id}`),
            },
          ]}
        />

        <Card className={'rounded'}>
          <CardContent className={'space-y-5'}>
            <TitleLine title={'Data Surat'} />
            <div className="grid grid-cols-2 w-fit gap-5 gap-y-4">
              <div className="flex flex-col gap-1.5 col-span-2">
                <p className="text-gray-500">Satuan Kerja: </p>
                <p>{detail?.nama_unit}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Sifat Surat: </p>
                <p>{detail?.nama_sifat_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Jenis Surat: </p>
                <p>{detail?.nama_jenis_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Klasifikasi Surat: </p>
                <p>{detail?.nama_klasifikasi_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Asal Surat: </p>
                <p>{detail?.nama_asal_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Kepada: </p>
                <p>{detail?.penerima_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Nomor Surat: </p>
                <p>{detail?.nomor_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Tanggal: </p>
                <p>{detail?.tanggal_surat ? format(detail?.tanggal_surat, 'dd/MM/yyyy') : ''}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Nomor Agenda: </p>
                <p>{detail?.nomor_agenda}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <p className="text-gray-500">Perihal: </p>
                <p>{detail?.perihal}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <p className="text-gray-500">Tebusan: </p>
                <p>{detail?.tembusan}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <p className="text-gray-500">Ringkasan Surat: </p>
                <p>{detail?.ringkasan}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={'rounded'}>
          <CardContent className={'space-y-5'}>
            <TitleLine title={'Data Agenda'} />
            <div className="grid grid-cols-4 w-fit gap-5 gap-y-4">
              <div className="flex flex-col gap-1.5 col-span-4">
                <p className="text-gray-500">Nama Kegiatan: </p>
                <p>{detail?.nama_kegiatan}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-4">
                <p className="text-gray-500">Keterangan: </p>
                <p>{detail?.keterangan_agenda}</p>
              </div>

              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500">Tanggal Mulai: </p>
                <p>{detail?.tanggal_mulai ? format(detail?.tanggal_mulai, 'dd/MM/yyyy') : ''}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500">Jam Mulai: </p>
                <p>{detail?.tanggal_mulai ? format(detail?.tanggal_mulai, 'HH:mm') : ''}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500">Tanggal Selesai: </p>
                <p>
                  {detail?.tanggal_selesai ? format(detail?.tanggal_selesai, 'dd/MM/yyyy') : ''}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500">Jam Mulai: </p>
                <p>{detail?.tanggal_selesai ? format(detail?.tanggal_selesai, 'HH:mm') : ''}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-4">
                <p className="text-gray-500">Tempat / Lokasi: </p>
                <p>{detail?.tempat}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-4">
                <p className="text-gray-500">Pengingat: </p>
                <p>{detail?.nama_waktu_pengingat_agenda}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={'rounded'}>
          <CardContent className={'space-y-5'}>
            <TitleLine title={'Lampiran'} />
            <div className="grid grid-cols-3 gap-5">
              {detail?.lampiran?.map((item, index) => (
                <Link
                  to={item?.lampiran_url}
                  key={index}
                  target="_blank"
                  className="flex items-center gap-1.5 border p-1.5 rounded"
                >
                  <FaFile />
                  Lampiran FIle {index + 1}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={'rounded'}>
          <CardContent className={'space-y-5'}>
            <TitleLine title={'Disposisi'} />
            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500">Disposisi Dari: </p>
                <p>{detail?.nama_asal_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500">Dikirim : </p>
                <p>{detail?.dikirim_at ? format(detail?.dikirim_at, 'dd/MM/yyyy') : '-'}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500">Status : </p>
                <p>{detail?.status}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500">Dibaca : </p>
                <p>{detail?.dibaca_at ? format(detail?.dibaca_at, 'dd/MM/yyyy') : '-'}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500">Diresponse : </p>
                <p>{detail?.direspon_at ? format(detail?.direspon_at, 'dd/MM/yyyy') : '-'}</p>
              </div>
            </div>

            <div className={'flex items-center gap-5'}>
              <ButtonResponseStatusDisposition data={detail?.pejabat[0] as any} />
              <ButtonShowDisposition data={detail as any} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CardTitle>Komentar</CardTitle>
            <div>
              {comment?.map((row, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-2 w-full',
                    row?.posisi === 'kanan' && 'flex-row-reverse'
                  )}
                >
                  <img
                    src={row?.gambar_penulis ?? '/img/noimg.png'}
                    alt="gambar_penulis"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className={'w-full'}>
                    <p className={'text-end'}>{row?.nama_penulis}</p>
                    <div className={'w-full text-start bg-gray-100 p-4 rounded'}>
                      <p>{row?.komentar}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Form {...form}>
              <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
                <div className="flex items-center gap-1 w-full">
                  <TextInput
                    name={'komentar'}
                    form={form}
                    placeholder={'Tulis Pesan ada Disini'}
                    className={'w-full'}
                    label={''}
                  />
                  <button className={'p-1.5 bg-primary text-white mt-1.5'} disabled={loading}>
                    <IoSend />
                  </button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
