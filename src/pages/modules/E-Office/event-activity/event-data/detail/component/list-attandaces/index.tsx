import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'

const ListAttendance = () => {
  return (
    <>
      <Card className={'p-2 rounded shadow-none'}>
        <CardContent className="space-y-5 p-2">
          <ButtonTitleGroup label={'Daftar Hadir'} buttonGroup={[]} />
        </CardContent>
      </Card>
    </>
  )
}
export default ListAttendance
