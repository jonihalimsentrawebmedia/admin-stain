import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import { UseGetDetailParticipantProgram } from '../hooks/index'
import type { IParticipant } from '../data/index.tsx'
import { ButtonCancel } from '../component/buttonCancel.tsx'
import { ButtonReject } from '../component/buttonReject.tsx'
import { ButtonConfirm } from '../component/buttonConfirm.tsx'
import { format } from 'date-fns'

export const DetailParticipantProgram = () => {
  const { id, participant_id } = useParams()
  const { detail } = UseGetDetailParticipantProgram({
    id_participant: participant_id ?? '',
    id_training: id ?? '',
  })
  return (
    <>
      <ButtonTitleGroup
        isBack
        label={'Detail Pendaftar'}
        buttonGroup={[
          {
            type: 'custom',
            element: (detail?.status_peserta === 'PENDING' ||
              detail?.status_peserta == 'DIKONFIRMASI') && (
              <ButtonCancel data={detail as IParticipant} is_icon={false} />
            ),
          },
          {
            type: 'custom',
            element: (detail?.status_peserta === 'PENDING' ||
              detail?.status_peserta == 'DIKONFIRMASI') && (
              <ButtonReject data={detail as IParticipant} is_icon={false} />
            ),
          },
          {
            type: 'custom',
            element: detail?.status_peserta === 'PENDING' && (
              <ButtonConfirm data={detail as IParticipant} is_icon={false} />
            ),
          },
        ]}
      />

      <div className={'grid grid-cols-[12rem_1fr] gap-4 text-sm mt-4'}>
        <p className="col-span-2 text-xl text-primary font-semibold">1. Profil Pendaftar</p>
        <p className="text-gray-500">Nama Lengkap</p>
        <p>{detail?.nama_lengkap}</p>
        <p className="text-gray-500">Email</p>
        <p>{detail?.email}</p>
        <p className="text-gray-500">No. Handphone (WhatsApp)</p>
        <p>{detail?.no_handphone}</p>
        <p className="text-gray-500">Institusi atau Perusahaan</p>
        <p>{detail?.institusi}</p>
        <p className="text-gray-500">Asal Kampus</p>
        <p>{detail?.asal_kampus}</p>
        <p className="text-gray-500">Jenjang Pendidikan</p>
        <p>{detail?.jenjang_pendidikan}</p>
        <p className="col-span-2 text-xl text-primary font-semibold">2. Pendaftaran</p>
        <p className="text-gray-500">Status Pendaftar</p>
        <p>{detail?.status_peserta}</p>
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
        <p className="text-gray-500">Waktu Pembayaran</p>
        <p>{detail?.tanggal_bayar ? format(detail?.tanggal_bayar, 'dd-MM-yyyy, HH:mm:ss') : ''}</p>
        <p className="text-gray-500">Bukti Pembayaran</p>
        <img
          src={detail?.file_upload_pembayaran}
          alt="gambar"
          className={'object-contain h-[200px]'}
        />
      </div>
    </>
  )
}
