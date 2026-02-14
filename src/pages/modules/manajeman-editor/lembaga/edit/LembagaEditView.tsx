import { Form } from '@/components/ui/form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import useUpdateSatuanOrganisasi from '../../controller/useUpdateSatuanOrganisasi'
import SatuanOrganisasiForm from '@/pages/modules/settings/components/form/SatuanOrganisasiForm'

const LembagaEditView = () => {
  const { form, handleSave, loading, goToBack } = useUpdateSatuanOrganisasi({
    kelompok: 'LEMBAGA',
  })
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
            label="Edit Data Lembaga"
          />
          <SatuanOrganisasiForm kelompok="Lembaga" form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  )
}

export default LembagaEditView
