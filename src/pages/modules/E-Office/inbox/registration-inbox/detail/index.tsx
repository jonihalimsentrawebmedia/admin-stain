import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/hooks'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { format } from 'date-fns'
import { FaFile } from 'react-icons/fa'
import { ButtonComment } from '@/pages/modules/E-Office/inbox/registration-inbox/detail/comment/component/buttonComment.tsx'
import { ButtonShowDisposition } from '@/pages/modules/E-Office/inbox/registration-inbox/detail/disposisi/component/buttonShow.tsx'

export const DetailInboxRegistration = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { detailInbox } = UseGetDetailInbox(id as string)

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
                <p>{detailInbox?.nama_unit}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Sifat Surat: </p>
                <p>{detailInbox?.nama_sifat_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Jenis Surat: </p>
                <p>{detailInbox?.nama_jenis_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Klasifikasi Surat: </p>
                <p>{detailInbox?.nama_klasifikasi_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Asal Surat: </p>
                <p>{detailInbox?.nama_asal_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Kepada: </p>
                <p>{detailInbox?.penerima_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Nomor Surat: </p>
                <p>{detailInbox?.nomor_surat}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Tanggal: </p>
                <p>
                  {detailInbox?.tanggal_surat
                    ? format(detailInbox?.tanggal_surat, 'dd/MM/yyyy')
                    : ''}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Nomor Agenda: </p>
                <p>{detailInbox?.nomor_agenda}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <p className="text-gray-500">Perihal: </p>
                <p>{detailInbox?.perihal}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <p className="text-gray-500">Tebusan: </p>
                <p>{detailInbox?.tembusan}</p>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <p className="text-gray-500">Ringkasan Surat: </p>
                <p>{detailInbox?.ringkasan}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {detailInbox?.is_agenda && (
          <Card className={'rounded'}>
            <CardContent className={'space-y-5'}>
              <TitleLine title={'Data Agenda'} />
              <div className="grid grid-cols-4 w-fit gap-5 gap-y-4">
                <div className="flex flex-col gap-1.5 col-span-4">
                  <p className="text-gray-500">Nama Kegiatan: </p>
                  <p>{detailInbox?.nama_kegiatan}</p>
                </div>
                <div className="flex flex-col gap-1.5 col-span-4">
                  <p className="text-gray-500">Keterangan: </p>
                  <p>{detailInbox?.keterangan_agenda}</p>
                </div>

                <div className="flex flex-col gap-1.5 col-span-1">
                  <p className="text-gray-500">Tanggal Mulai: </p>
                  <p>
                    {detailInbox?.tanggal_mulai
                      ? format(detailInbox?.tanggal_mulai, 'dd/MM/yyyy')
                      : ''}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 col-span-1">
                  <p className="text-gray-500">Jam Mulai: </p>
                  <p>
                    {detailInbox?.tanggal_mulai ? format(detailInbox?.tanggal_mulai, 'HH:mm') : ''}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 col-span-1">
                  <p className="text-gray-500">Tanggal Selesai: </p>
                  <p>
                    {detailInbox?.tanggal_selesai
                      ? format(detailInbox?.tanggal_selesai, 'dd/MM/yyyy')
                      : ''}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 col-span-1">
                  <p className="text-gray-500">Jam Mulai: </p>
                  <p>
                    {detailInbox?.tanggal_selesai
                      ? format(detailInbox?.tanggal_selesai, 'HH:mm')
                      : ''}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 col-span-4">
                  <p className="text-gray-500">Tempat / Lokasi: </p>
                  <p>{detailInbox?.tempat}</p>
                </div>
                <div className="flex flex-col gap-1.5 col-span-4">
                  <p className="text-gray-500">Pengingat: </p>
                  <p>{detailInbox?.nama_waktu_pengingat_agenda}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {detailInbox?.is_lampiran && (
          <Card className={'rounded'}>
            <CardContent className={'space-y-5'}>
              <TitleLine title={'Lampiran'} />
              <div className="grid grid-cols-3 gap-5">
                {detailInbox?.lampiran?.map((item, index) => (
                  <Link
                    to={item?.lampiran_url}
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
        )}

        {detailInbox?.is_disposisi && (
          <Card className={'rounded'}>
            <CardContent className={'space-y-5'}>
              <TitleLine title={'Disposisi'} />
              <div className="flex flex-col gap-1.5">
                <p className="text-gray-500">Jenis Disposisi: </p>
                <p className={'capitalize'}>{detailInbox?.jenis_disposisi}</p>
              </div>

              <div className={'flex flex-col gap-1.5'}>
                {detailInbox?.pejabat?.map((row, index) => (
                  <div key={index} className={'flex items-center gap-5 w-full'}>
                    <div className={`flex flex-col gap-1`}>
                      <p className="text-sm">{row?.status?.split('_').join(' ')}</p>
                      <div className={'bg-blue-50 flex items-center gap-2 p-2 rounded w-[350px]'}>
                        <img
                          src={row?.gambar_sdm ?? '/img/noimg.png'}
                          alt={row?.nama_sdm}
                          className={'w-12 h-12 rounded-full object-cover'}
                        />
                        <div>
                          <p className={'text-primary text-lg font-semibold'}>{row?.nama_sdm}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`flex flex-col gap-1 w-full`}>
                      <div className="flex items-center gap-4">
                        <p className="text-sm">Dibaca:</p>
                        <p className="text-sm">Direspon:</p>
                      </div>
                      <div className={'bg-blue-50 flex items-center gap-2 p-2 rounded w-full'}>
                        <p className={'text-lg text-primary font-semibold h-12'}>
                          {row?.komentar ?? '-'}
                        </p>
                      </div>
                    </div>
                    <ButtonComment id={row?.id_pejabat_surat_masuk} />
                  </div>
                ))}
              </div>

              <ButtonShowDisposition data={detailInbox} />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
