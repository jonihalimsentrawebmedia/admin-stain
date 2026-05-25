import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddNotification } from '@/pages/modules/E-Office/settings/accept-notification/component/buttonAdd.tsx'

export const AcceptNotificationPage = () => {
  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Penerima Notifikasi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddNotification />,
            },
          ]}
        />
      </div>
    </>
  )
}
