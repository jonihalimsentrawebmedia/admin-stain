import { Form } from '@/components/ui/form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import useDraftLembaga from '../controller/useDraftLembaga'
import SatuanOrganisasiForm from '@/pages/modules/settings/components/form/SatuanOrganisasiForm'
import { useState } from 'react'
import ModalAjukanLembaga from '../components/ModalAjukanLembaga'

const LembagaEditView = () => {
  const [open, setOpen] = useState(false)
  const { form, handleSave, loading, goToBack } = useDraftLembaga()
  return (
    <div className="flex flex-col gap-4 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            setOpen(true)
          })}
          className="flex flex-col gap-4"
        >
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
            label="Edit Lembaga"
          />
          <SatuanOrganisasiForm kelompok="LEMBAGA" form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
      <ModalAjukanLembaga handleSave={handleSave} loading={loading} open={open} setOpen={setOpen} />
    </div>
  )
}

export default LembagaEditView
