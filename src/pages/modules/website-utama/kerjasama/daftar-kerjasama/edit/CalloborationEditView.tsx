import { Form } from '@/components/ui/form'
import usePutCalloboration from '../controller/usePutCalloboration'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import CalloborationForm from '../components/CalloborationForm'
import ButtonForm from '@/components/common/button/ButtonForm'
import useGetCalloborationDetail from '../controller/useGetCalloborationDetail'
import { useEffect } from 'react'
import { formatDateTime } from '@/utils/date'

const CalloborationEditView = () => {
  const { form, handleSave, loading, goToBack } = usePutCalloboration()
  const { calloborationDetail } = useGetCalloborationDetail()

  useEffect(() => {
    if (calloborationDetail) {
      form.reset({
        ...calloborationDetail,
        tanggal_mulai: formatDateTime(calloborationDetail.tanggal_mulai)
          .date.split('-')
          .reverse()
          .join('-'),
        tanggal_selesai: formatDateTime(calloborationDetail.tanggal_selesai)
          .date.split('-')
          .reverse()
          .join('-'),
      })
    }
  }, [calloborationDetail])

  return (
    <div className="flex flex-col gap-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
          <ButtonTitleGroup
            buttonGroup={[
              {
                label: 'Batal',
                onClick: () => {
                  goToBack()
                },
                type: 'cancel',
              },
              {
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
            label="Edit Daftar Kerjasama"
          />
          <CalloborationForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  )
}

export default CalloborationEditView
