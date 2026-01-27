import { Link, useParams } from 'react-router-dom'
import { UseGetAgendaManagementEditorDetail } from '../hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { Separator } from '@/components/ui/separator.tsx'
import { format } from 'date-fns'
import { MdOutlineHistory } from 'react-icons/md'
import ButtonProcessManagementEditor from '../component/buttonProcess.tsx'
import ButtonAgreeManagementEditor from '../component/buttonAggree.tsx'
import { ButtonRejectAgendaManagementEditor } from '../component/buttonReject.tsx'

export const AgendaManagementEditorDetailPage = () => {
  const { id } = useParams()
  const { agendaManagementEditorDetail: detail } = UseGetAgendaManagementEditorDetail(id ?? '')

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Detail Agenda'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <>
                  <div className={'flex items-center gap-2'}>
                    Status :{' '}
                    <p className="text-blue-600 font-semibold">
                      {detail?.status_publish?.split('_').join(' ')}
                    </p>
                    <Link to={`/modules/editor/public-content/agenda/edit/${detail?.id_agenda}`}>
                      <Button
                        size={'sm'}
                        variant={'outline'}
                        className={'rounded border-green-600 text-green-600 hover:text-green-600'}
                      >
                        <HiPencil />
                        Edit Data
                      </Button>
                    </Link>
                    <Link to={`/modules/editor/public-content/agenda/log/${detail?.id_agenda}`}>
                      <Button
                        size={'sm'}
                        variant={'outline'}
                        className={'rounded border-blue-500 text-blue-500 hover:text-blue-500'}
                      >
                        <MdOutlineHistory />
                        Log Data
                      </Button>
                    </Link>
                    {detail?.status_publish === 'DIAJUKAN_EDITOR' && (
                      <ButtonProcessManagementEditor {...(detail as any)} />
                    )}
                    {detail?.status_publish === 'PROSES_EDITOR' && (
                      <>
                        <ButtonAgreeManagementEditor {...(detail as any)} />
                        <ButtonRejectAgendaManagementEditor {...(detail as any)} />
                      </>
                    )}
                  </div>
                </>
              ),
            },
          ]}
          isBack
        />
        <Separator className={'my-5'} />

        <div className={'flex items-start gap-x-8 px-5'}>
          <div className="w-7/12">
            <p className="text-2xl font-semibold">{detail?.judul}</p>
            <div className="my-5 grid grid-cols-2 gap-5">
              <div>
                <p className="text-gray-500">Waktu</p>
                <div className={'flex gap-1.5 items-center text-primary font-semibold'}>
                  <p>
                    {detail?.waktu_mulai ? format(detail?.waktu_mulai, 'dd-MM-yyyy, HH:mm') : ''}
                  </p>
                  {detail?.waktu_selesai && (
                    <>
                      <p>s.d</p>
                      <p>{format(detail?.waktu_selesai, 'dd-MM-yyyy, HH:mm')}</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-gray-500">Lokasi Kegiatan</p>
                <p className={'font-semibold text-primary'}>{detail?.lokasi_kegiatan}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Deskripsi</p>
                <div
                  className={'flex flex-col gap-4 mt-2'}
                  dangerouslySetInnerHTML={{ __html: detail?.isi_agenda ?? '' }}
                />
              </div>
            </div>
          </div>

          <div className="w-5/12">
            <img src={detail?.gambar} alt="image" className="w-full h-[640px] object-contain" />
          </div>
        </div>
      </div>
    </>
  )
}
