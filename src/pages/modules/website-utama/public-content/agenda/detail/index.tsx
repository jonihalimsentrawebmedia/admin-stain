import { useNavigate, useParams } from 'react-router-dom'
import { UseGetAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdSend } from 'react-icons/md'
import { Separator } from '@/components/ui/separator.tsx'
import { format } from 'date-fns'

export const DetailAgendaPage = () => {
  const { id } = useParams()
  const { detailAgenda: detail } = UseGetAgendaDetail(id ?? '')
  const navigate = useNavigate()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Detail Agenda'}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => {},
              element: (
                <div className={'flex items-center gap-2'}>
                  Status :{' '}
                  <p className="text-blue-600 font-semibold">
                    {detail?.status_publish.split('_').join(' ')}
                  </p>
                  <Button
                    onClick={() =>
                      navigate(
                        `/modules/website-utama/public-content/agenda/edit/${detail?.id_agenda}`
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
                detail?.status_publish !== 'DIAJUKAN_EDITOR' ? (
                  <div className={'flex items-center gap-1.5 border-l border-gray-500 pl-2'}>
                    <Button>
                      <MdSend /> Ajukan Ke Editor
                    </Button>
                  </div>
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
