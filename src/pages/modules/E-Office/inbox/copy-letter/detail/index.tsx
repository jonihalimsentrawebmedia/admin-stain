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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                <p className="text-gray-500 text-sm">Satuan Kerja: </p>
                <p>{detail?.nama_unit}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500 text-sm">Sifat Surat: </p>
                <p>{detail?.nama_sifat_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500 text-sm">Jenis Surat: </p>
                <p>{detail?.nama_jenis_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500 text-sm">Klasifikasi Surat: </p>
                <p>{detail?.nama_klasifikasi_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500 text-sm">Asal Surat: </p>
                <p>{detail?.nama_asal_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500 text-sm">Kepada: </p>
                <p>{detail?.penerima_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500 text-sm">Nomor Surat: </p>
                <p>{detail?.nomor_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500 text-sm">Tanggal: </p>
                <p>{detail?.tanggal_surat ? format(detail?.tanggal_surat, 'dd/MM/yyyy') : ''}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500 text-sm">Nomor Agenda: </p>
                <p>{detail?.nomor_agenda}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                <p className="text-gray-500 text-sm">Perihal: </p>
                <p>{detail?.perihal}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                <p className="text-gray-500 text-sm">Tembusan: </p>
                <p>{detail?.tembusan}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                <p className="text-gray-500 text-sm">Ringkasan Surat: </p>
                <p>{detail?.ringkasan}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={'rounded'}>
          <CardContent className={'space-y-5'}>
            <TitleLine title={'Data Agenda'} />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-4">
                <p className="text-gray-500 text-sm">Nama Kegiatan: </p>
                <p>{detail?.nama_kegiatan}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-4">
                <p className="text-gray-500 text-sm">Keterangan: </p>
                <p>{detail?.keterangan_agenda}</p>
              </div>

              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500 text-sm">Tanggal Mulai: </p>
                <p>{detail?.tanggal_mulai ? format(detail?.tanggal_mulai, 'dd/MM/yyyy') : ''}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500 text-sm">Jam Mulai: </p>
                <p>{detail?.tanggal_mulai ? format(detail?.tanggal_mulai, 'HH:mm') : ''}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500 text-sm">Tanggal Selesai: </p>
                <p>
                  {detail?.tanggal_selesai ? format(detail?.tanggal_selesai, 'dd/MM/yyyy') : ''}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1">
                <p className="text-gray-500 text-sm">Jam Selesai: </p>
                <p>{detail?.tanggal_selesai ? format(detail?.tanggal_selesai, 'HH:mm') : ''}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-4">
                <p className="text-gray-500 text-sm">Tempat / Lokasi: </p>
                <p>{detail?.tempat}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-4">
                <p className="text-gray-500 text-sm">Pengingat: </p>
                <p>{detail?.nama_waktu_pengingat_agenda}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={'rounded'}>
          <CardContent className={'space-y-5'}>
            <TitleLine title={'Lampiran'} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {detail?.lampiran?.map((item, index) => (
                <Link
                  to={item?.lampiran_url}
                  target="_blank"
                  key={index}
                  className="flex items-center gap-1.5 border p-1.5 rounded"
                >
                  <FaFile />
                  Lampiran File {index + 1}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={'rounded'}>
          <CardContent className={'space-y-5'}>
            <TitleLine title={'Tembusan'} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {detail?.pejabat.map((row, index) => (
                <div
                  key={index}
                  className={'flex items-center gap-1.5 p-3 sm:p-4 border rounded bg-blue-50'}
                >
                  <img
                    src={row?.gambar_sdm ?? '/img/noimg.png'}
                    alt="gambar"
                    className="w-10 sm:w-14 h-10 sm:h-14 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base truncate">{row?.nama_sdm}</p>
                    <p className="text-xs sm:text-sm truncate">{row?.list_disposisi?.[0] ?? ''}</p>
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
