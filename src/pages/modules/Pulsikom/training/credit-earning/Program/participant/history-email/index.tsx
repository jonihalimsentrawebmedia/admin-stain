import { Link, useParams } from 'react-router-dom'

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { format } from 'date-fns'
import { UseGetDetailParticipantProgram, UseGetHistoryEmail } from '../hooks/index'

export const HistoryEmailProgram = () => {
  const { id, participant_id } = useParams()
  const { detail } = UseGetDetailParticipantProgram({
    id_participant: participant_id ?? '',
    id_training: id ?? '',
  })
  const { historyEmail } = UseGetHistoryEmail({
    id_participant: participant_id ?? '',
    id_training: id ?? '',
  })

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup isBack label={'Riwayat Email'} buttonGroup={[]} />

        <div className="p-4 border-primary rounded border">
          <p className="text-xl font-semibold text-primary">Informasi Pembayaran</p>
          <div className={'grid grid-cols-[12rem_1fr] gap-4 text-sm mt-4'}>
            <p className="col-span-2 text-xl text-primary font-semibold">1. Profil Pendaftar</p>
            <p className="text-gray-500">Nama Lengkap</p>
            <p>{detail?.nama_lengkap}</p>
            <p className="text-gray-500">Email</p>
            <p>{detail?.email}</p>
            <p className="text-gray-500">No. Handphone (WhatsApp)</p>
            <p>{detail?.no_handphone}</p>
            <p className="text-gray-500">Paket Biaya</p>
            <p>
              {detail?.nama_biaya_pendaftaran} -{' '}
              {detail?.harga_biaya_pendaftaran
                ? new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0,
                  }).format(detail?.harga_biaya_pendaftaran)
                : ''}
            </p>
            <p className="text-gray-500">Rekening Pembayaran</p>
            <p>
              {detail?.nama_rekening_pembayaran}-{detail?.no_rekening_pembayaran}-
              {detail?.nama_rekening_pembayaran}
            </p>
            <p className="text-gray-500">Bukti Pembayaran</p>
            <img
              src={detail?.file_upload_pembayaran}
              alt="gambar"
              className={'object-contain h-[200px]'}
            />
          </div>
        </div>

        <TitleLine title={'Riwayat Email'} />
        {historyEmail?.map((item, index) => (
          <div className={'grid grid-cols-[12rem_1fr] gap-4 text-sm mt-4 border p-4'} key={index}>
            <p className="text-gray-500">Oleh</p>
            <p>
              {item?.nama_pengirim_user} (
              {item?.dikirim_at ? format(item?.dikirim_at, 'dd-MM-yyyy, HH:mm:ss') : ''})
            </p>
            <p className="text-gray-500">Subjek</p>
            <p>{item?.subjek}</p>
            <p className="text-gray-500">Pesan</p>
            <p>{item?.pesan}</p>
            <p className="text-gray-500">Lampiran</p>
            <ul className={'list-decimal list-inside'}>
              {item?.file_lampiran?.map((file, index) => (
                <li
                  key={index}
                  className={'text-blue-500 underline underline-offset-2 decoration-blue-500'}
                >
                  <Link to={file ?? '#'} target={'_blank'}>
                    Dokumen {index + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
