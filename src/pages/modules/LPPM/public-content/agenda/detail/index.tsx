import { useNavigate, useParams } from 'react-router-dom'
import { UseGetAgendaLppmDetail,  } from '../hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { Separator } from '@/components/ui/separator.tsx'
import { format } from 'date-fns'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import { ButtonSubmissionAgendaLppm } from '../components/buttonSubmission'

export const AgendaLppmDetailPage = () => {
  const { id } = useParams()
  const { agendaLppmDetail: detail } = UseGetAgendaLppmDetail(id ?? '')
  const navigate = useNavigate()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Detail Agenda'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <div className={'flex items-center gap-2'}>
                  Status :{' '}
                  <p className="text-blue-600 font-semibold">
                    {detail?.status_publish.split('_').join(' ')}
                  </p>
                  <Button
                    size={'sm'}
                    onClick={() =>
                      navigate(
                        `/modules/lppm/public-content/agenda/edit/${detail?.id_agenda}`
                      )
                    }
                    className={'border-primary text-primary hover:text-primary'}
                    variant={'outline'}
                  >
                    <HiPencil /> Edit Data
                  </Button>
                </div>
              ),
            },
            {
              type: 'save',
              label: 'Edit Data',
              onClick: () => {},
              element:
                detail?.status_publish === 'DRAFT' ? (
                  <ButtonSubmissionAgendaLppm {...(detail as IAgendaDetail)} />
                ) : (
                  <></>
                ),
            },
          ]}
          isBack={true}
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
