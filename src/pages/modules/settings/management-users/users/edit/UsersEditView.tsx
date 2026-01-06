import { Form } from '@/components/ui/form'
import UsersEditViewModel from './UsersEditViewModel'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import UsersForm from '../components/UsersForm'
import ButtonForm from '@/components/common/button/ButtonForm'

const UsersEditView = () => {
  const { form, handleSave, loading, goToBack } = UsersEditViewModel()
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
            label="Edit Data User"
          />
          <UsersForm form={form} isEdit />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  )
}

export default UsersEditView
