import { UseGetDetailTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCalendarAlt, FaRegCopy, FaUserFriends } from 'react-icons/fa'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { format } from 'date-fns'
import { FaLocationPin, FaPhone } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { toast } from 'react-toastify'

export const DetailTraining = () => {
  const { id } = useParams()
  const { detail } = UseGetDetailTraining((id as string) ?? '')
  const navigate = useNavigate()
  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          isBack
          label={'Detail Training'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <>
                  <Button
                    variant={'outline'}
                    onClick={() => navigate('participant')}
                    className={'border-primary text-primary hover:text-primary'}
                  >
                    <FaUserFriends />
                    Lihat Pendaftar
                  </Button>
                </>
              ),
            },
            {
              type: 'custom',
              element: (
                <>
                  <Button
                    className={'border-primary text-primary hover:text-primary rounded'}
                    variant={'outline'}
                    onClick={() =>
                      navigate(
                        `/modules/pulsikom/training/list-training/edit/${detail?.training.id_training}?step=is_informasi_pendaftaran&from=detail`
                      )
                    }
                  >
                    <HiPencil />
                    Edit Data
                  </Button>
                </>
              ),
            },
          ]}
        />

        <p className="text-xl font-semibold">{detail?.training.nama_training}</p>
        <p className="flex items-center gap-1.5">
          <FaCalendarAlt className={'size-4'} />
          Dipublish :{' '}
          {detail?.training?.updated_at ? format(detail?.training?.updated_at, 'dd MMMM yyyy') : ''}
        </p>

        <img
          src={detail?.training?.url_gambar}
          alt="gambar"
          className={'w-[500px] h-[360px] object-cover'}
        />

        <div className="grid grid-cols-[12rem_1fr] gap-4">
          <p className="text-gray-500">Peserta Terkonfirmasi</p>
          <p className={'text-xl font-semibold text-primary'}>
            {`${detail?.training?.terkonfirmasi ?? 0}  Peserta` || '0 Peserta'}
          </p>
          <p className="text-gray-500">Maks Peserta</p>
          <p className={'text-xl font-semibold text-primary'}>
            {detail?.training?.is_tidak_ada_batas
              ? 'Tidak Ada Batas'
              : `${detail?.training?.maksimal_pendaftar} Peserta`}
          </p>
          <p className="text-gray-500">Jumlah Peserta Minimum</p>
          <p className={'text-xl font-semibold text-primary'}>
            {detail?.training?.minimal_pendaftar} Peserta
          </p>
        </div>

        <TitleLine title={'Deskripsi'} />
        <RenderHTMLContent content={detail?.informasi.deskripsi ?? ''} />

        <div className="grid grid-cols-[12rem_1fr] gap-2">
          <p className="text-gray-500">Periode Pendaftaran</p>
          <p>
            {detail?.training?.tgl_buka_pendaftaran
              ? format(detail?.training?.tgl_buka_pendaftaran, 'dd MMM')
              : ''}{' '}
            -{' '}
            {detail?.training?.tgl_tutup_pendaftaran
              ? format(detail?.training?.tgl_tutup_pendaftaran, 'dd MMM yyyy')
              : ''}
          </p>
        </div>

        <TitleLine title={'Topik Bahasan & Jadwal'} />
        <ul className={'flex flex-col gap-2'}>
          {detail?.bahasan_dan_topik?.map((row, k) => (
            <li key={k} className={'flex border p-2 border-primary rounded flex-col gap-1.5'}>
              <p className="text-primary font-semibold text-xl">
                <span className={'text-black'}>
                  {k + 1}. {row?.judul_topik_bahasan}
                </span>{' '}
                ({row?.tanggal_mulai_bahasan ? format(row?.tanggal_mulai_bahasan, 'dd MMM') : ''} -{' '}
                {row?.tanggal_selesai_bahasan
                  ? format(row?.tanggal_selesai_bahasan, 'dd MMM-yyyy')
                  : ''}
                )
              </p>
              <p>{row?.deskripsi}</p>
            </li>
          ))}
        </ul>

        <TitleLine title={'Persyaratan'} />
        <RenderHTMLContent content={detail?.persyaratan?.isi ?? ''} />

        <TitleLine title={'Biaya Pendaftaran'} />
        <div className="grid grid-cols-3 gap-4">
          {detail?.biaya_pendaftaran?.map((row, k) => (
            <div key={k} className={'flex flex-col gap-2 border p-4 border-primary rounded'}>
              <p className="text-primary text-sm">urutan {row?.urutan}</p>
              <p>{row?.nama_biaya}</p>
              <p className={'text-xl font-semibold text-primary'}>
                {row?.harga
                  ? new Intl.NumberFormat('id-ID', {
                      currency: 'IDR',
                      style: 'currency',
                      maximumFractionDigits: 0,
                    }).format(row?.harga ?? 0)
                  : ''}
              </p>
              <p className={'line-clamp-3'}>{row?.keuntungan}</p>
            </div>
          ))}
        </div>

        <TitleLine title={'Rekening Penerimaan'} />
        <div className="grid grid-cols-3 gap-4">
          {detail?.rekening?.map((row, k) => (
            <div key={k} className={'flex flex-col gap-2 border p-4 border-primary rounded'}>
              <p className="text-gray-500">{row?.nama_rekening}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-primary">{row?.no_rekening}</p>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(row?.no_rekening ?? '')
                    toast.success('Berhasil menyalin no rekening')
                  }}
                  className="text-primary"
                >
                  <FaRegCopy />
                </button>
              </div>
              <p className="text-gray-500 uppercase">A.N. {row?.atas_nama}</p>
            </div>
          ))}
        </div>

        <TitleLine title={'Kontak'} />
        <p>Silahkan hubungi kontak berikut untuk mendapatkan bantuan atau informasi lebih lanjut</p>
        <p className="flex items-center gap-1.5">
          <FaPhone className={'size-4'} />
          {detail?.kontak_dan_catatan_tambahan?.no_telepon}
        </p>
        <p className="flex items-center gap-1.5">
          <MdEmail className={'size-4'} />
          {detail?.kontak_dan_catatan_tambahan?.email}
        </p>
        <p className="flex items-center gap-1.5">
          <FaLocationPin className={'size-4'} />
          {detail?.kontak_dan_catatan_tambahan?.alamat}
        </p>
      </div>
    </>
  )
}
