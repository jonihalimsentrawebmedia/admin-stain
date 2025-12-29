import usePostCalloboration from '../controller/usePostCalloboration'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import CalloborationForm from '../components/CalloborationForm'
import ButtonForm from '@/components/common/button/ButtonForm'
import { Form } from '@/components/ui/form'

const CalloborationCreateView = () => {
  const { form, handleSave, loading, goToBack } = usePostCalloboration()

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
            label="Tambah Data Fakultas"
          />
          <CalloborationForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  )
}

export default CalloborationCreateView
