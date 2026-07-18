import { useNavigate, useParams } from 'react-router-dom'
import { UseGetAgendaUnitDetail } from '../hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { Separator } from '@/components/ui/separator.tsx'
import { format } from 'date-fns'
import { ButtonSubmissionAgendaUnit } from '../components/buttonSubmission'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'

export const AgendaUnitDetailPage = () => {
  const { id } = useParams()
  const { agendaUnitDetail: detail } = UseGetAgendaUnitDetail(id ?? '')
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
                  {detail?.status_publish !== 'PUBLISHED' && (
                    <Button
                      size={'sm'}
                      onClick={() =>
                        navigate(
                          `/modules/website-unit/public-content/agenda/edit/${detail?.id_agenda}?from=detail`
                        )
                      }
                      className={'border-primary text-primary hover:text-primary'}
                      variant={'outline'}
                    >
                      <HiPencil /> Edit Data
                    </Button>
                  )}
                </div>
              ),
            },
            {
              type: 'save',
              label: 'Edit Data',
              onClick: () => {},
              element:
                detail?.status_publish === 'DRAFT' ? (
                  <ButtonSubmissionAgendaUnit {...(detail as IAgendaDetail)} />
                ) : (
                  <></>
                ),
            },
          ]}
          isBack={true}
          link={'/modules/website-unit/public-content/agenda'}
        />
        <Separator className={'my-5'} />

        <div className={'flex flex-col lg:flex-row items-start gap-6 lg:gap-x-8 px-4 sm:px-5'}>
          <div className="w-full lg:w-7/12">
            <p className="text-xl sm:text-2xl font-semibold">{detail?.judul}</p>
            <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <p className="text-gray-500 text-sm">Waktu</p>
                <div className={'flex flex-wrap gap-1.5 items-center text-primary font-semibold text-sm sm:text-base'}>
                  <p>
                    {detail?.waktu_mulai ? format(detail?.waktu_mulai, 'dd-MM-yyyy, HH:mm') : ''}
                  </p>
                  {detail?.waktu_selesai && (
                    <>
                      <p className="whitespace-nowrap">s.d</p>
                      <p>{format(detail?.waktu_selesai, 'dd-MM-yyyy, HH:mm')}</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Lokasi Kegiatan</p>
                <p className={'font-semibold text-primary text-sm sm:text-base'}>{detail?.lokasi_kegiatan}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 text-sm">Deskripsi</p>
                <div
                  className={'flex flex-col gap-4 mt-2 text-sm sm:text-base'}
                  dangerouslySetInnerHTML={{ __html: detail?.isi_agenda ?? '' }}
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-5/12">
            <img
              src={detail?.gambar}
              alt="image"
              className="w-full h-[250px] sm:h-[400px] lg:h-[640px] object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  )
}
