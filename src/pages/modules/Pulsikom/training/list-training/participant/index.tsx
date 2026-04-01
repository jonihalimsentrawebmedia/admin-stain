import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetTrainingParticipant } from '@/pages/modules/Pulsikom/training/list-training/participant/hooks'
import { useParams } from 'react-router-dom'
import { ColumnsParticipant } from '@/pages/modules/Pulsikom/training/list-training/participant/data'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { MdInfo } from 'react-icons/md'
import { UseGetDetailTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'

export const Participant = () => {
  const { id } = useParams()
  const { detail } = UseGetDetailTraining(id)
  const { participant, loading, meta } = UseGetTrainingParticipant({
    status: 'PENDING',
    id_training: id as string,
  })

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup isBack label={'Lihat Pendaftar'} buttonGroup={[]} />

        <div className="flex items-center gap-5">
          <img
            src={detail?.training?.url_gambar}
            alt="gambar"
            className={'object-contain w-[350px]'}
          />

          <div className="grid grid-cols-[12rem_1fr] gap-5">
            <p className="text-2xl font-semibold col-span-2">{detail?.training?.nama_training}</p>
            <p className="text-gray-500">Maks Peserta</p>
            <p>{detail?.training?.maksimal_pendaftar}</p>
            <p className="text-gray-500">Jumlah Peserta Minimum </p>
            <p>{detail?.training?.minimal_pendaftar}</p>
            <p className="text-gray-500">Peserta Terkonfirmasi</p>
            <p>{detail?.training?.terkonfirmasi ?? 0} Orang</p>
          </div>
        </div>

        <div className="border border-blue-500 p-1.5 rounded-full text-blue-500 bg-blue-50 text-sm flex items-center gap-1.5 px-3">
          <MdInfo className={'size-4'} />
          Catatan: Untuk kekurangan nominal, disarankan menghubungi peserta via WA/Email terlebih
          dahulu sebelum menolak pendaftaran.
        </div>

        <TableCustom
          loading={loading}
          meta={meta}
          columns={ColumnsParticipant}
          data={participant}
        />
      </div>
    </>
  )
}
