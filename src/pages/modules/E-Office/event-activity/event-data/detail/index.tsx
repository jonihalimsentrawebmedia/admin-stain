import { UseGetDetailEventActivity } from '@/pages/modules/E-Office/event-activity/event-data/hooks'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import MenuEvent from '@/pages/modules/E-Office/event-activity/event-data/detail/component/menu-event'

const DetailEventActivity = () => {
  const { id: slug } = useParams()
  const { event } = UseGetDetailEventActivity(slug as string)

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Detail Acara'} isBack buttonGroup={[]} />
        <Card>
          <CardContent className={'space-y-2.5'}>
            <p className="text-gray-500">Nama Kegiatan</p>
            <p className="text-xl">{event?.nama_kegiatan}</p>
            <div className="grid grid-cols-2 gap-5 max-w-[800px]">
              <div>
                <p className="text-gray-500">Hari Tanggal</p>
                <p>
                  {event?.tanggal_mulai
                    ? format(event?.tanggal_mulai, 'EEEE, dd-MM-yyyy', { locale: id })
                    : ''}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Waktu</p>
                <p>{event?.waktu}</p>
              </div>
              <div>
                <p className="text-gray-500">Tempat</p>
                <p>{event?.tempat}</p>
              </div>
              <div>
                <p className="text-gray-500">Penyelenggara</p>
                <p>{event?.penyelenggara}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <MenuEvent detail={event} />
        </div>
      </div>
    </>
  )
}

export default DetailEventActivity
