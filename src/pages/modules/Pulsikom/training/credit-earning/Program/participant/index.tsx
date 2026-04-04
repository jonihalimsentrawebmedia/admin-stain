import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetProgramParticipant } from './hooks/index'
import { useParams } from 'react-router-dom'
import { MdInfo } from 'react-icons/md'
import { UseGetDetailProgram } from '../hooks/index'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsCancel, ColumnsConfirm, ColumnsParticipant, ColumnsReject } from './data/index'

export const ParticipantProgram = () => {
  const { id } = useParams()
  const { detail } = UseGetDetailProgram(id)

  const [status, setStatus] = useState('PENDING')
  const { participant, loading, meta } = UseGetProgramParticipant({
    status: status as 'PENDING' | 'DIKONFIRMASI' | 'DITOLAK' | 'DIBATALKAN',
    id_training: id as string,
  })

  const TabsData = [
    {
      value: 'PENDING',
      label: 'Pending',
      element: (
        <>
          <TableCustom
            loading={loading}
            meta={meta}
            columns={ColumnsParticipant}
            data={participant}
          />
        </>
      ),
    },
    {
      value: 'DIKONFIRMASI',
      label: 'Dikonfirmasi',
      element: (
        <>
          <TableCustom loading={loading} meta={meta} columns={ColumnsConfirm} data={participant} />
        </>
      ),
    },
    {
      value: 'DITOLAK',
      label: 'DITOLAK',
      element: (
        <>
          <TableCustom loading={loading} meta={meta} columns={ColumnsReject} data={participant} />
        </>
      ),
    },
    {
      value: 'DIBATALKAN',
      label: 'Refund / Batal',
      element: (
        <>
          <TableCustom loading={loading} meta={meta} columns={ColumnsCancel} data={participant} />
        </>
      ),
    },
  ]

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup isBack label={'Lihat Pendaftar'} buttonGroup={[]} />

        <div className="flex items-center gap-5">
          <img
            src={detail?.program?.url_gambar}
            alt="gambar"
            className={'object-contain w-[350px]'}
          />

          <div className="grid grid-cols-[12rem_1fr] gap-5">
            <p className="text-2xl font-semibold col-span-2">{detail?.program?.nama_program}</p>
            <p className="text-gray-500">Maks Peserta</p>
            <p>{detail?.program?.maksimal_pendaftar}</p>
            <p className="text-gray-500">Jumlah Peserta Minimum </p>
            <p>{detail?.program?.minimal_pendaftar}</p>
            <p className="text-gray-500">Peserta Terkonfirmasi</p>
            <p>{detail?.program?.terkonfirmasi ?? 0} Orang</p>
          </div>
        </div>

        <div className="border border-blue-500 p-1.5 rounded-full text-blue-500 bg-blue-50 text-sm flex items-center gap-1.5 px-3">
          <MdInfo className={'size-4'} />
          Catatan: Untuk kekurangan nominal, disarankan menghubungi peserta via WA/Email terlebih
          dahulu sebelum menolak pendaftaran.
        </div>

        <Tabs className={'bg-white p-0'} value={status} onValueChange={(e) => setStatus(e)}>
          <TabsList
            className={'bg-white rounded-none w-full h-full border-b-2 border-b-primary p-0'}
          >
            {TabsData?.map((row, k) => (
              <TabsTrigger
                value={row?.value}
                key={k}
                className={clsx(
                  'w-full rounded-none rounded-t-md shadow-none! py-1.5',
                  'data-[state=active]:bg-primary data-[state=active]:text-white'
                )}
              >
                {row?.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TabsData?.map((row, k) => (
            <TabsContent key={k} value={row?.value}>
              {row?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
