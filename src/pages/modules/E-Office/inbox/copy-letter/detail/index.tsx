import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { format } from 'date-fns'
import { FaFile } from 'react-icons/fa'
import { UseGetCopyLetterDetail } from '@/pages/modules/E-Office/inbox/copy-letter/hooks'

export const DetailCopyLetterPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { copyLetterDetail: detail } = UseGetCopyLetterDetail(id as string)

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
                  target="_blank"
                  key={index}
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
            <TitleLine title={'Tembusan'} />
            <div className="grid grid-cols-3 gap-5">
              {detail?.pejabat.map((row, index) => (
                <div
                  key={index}
                  className={'flex items-center gap-1.5 p-4 border rounded bg-blue-50'}
                >
                  <img
                    src={row?.gambar_sdm ?? '/img/noimg.png'}
                    alt="gambar"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p>{row?.nama_sdm}</p>
                    <p>{row?.list_disposisi?.[0] ?? ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
