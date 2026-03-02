import { Form } from '@/components/ui/form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import SatuanOrganisasiForm from '@/pages/modules/settings/components/form/SatuanOrganisasiForm'
import { useState } from 'react'
import ModalAjukanUnit from '../components/ModalAjukanUnit'
import useDraftUnit from '../controller/useDraftUnit'

const UnitEditPPIDView = () => {
  const [open, setOpen] = useState(false)
  const { form, handleSave, loading, goToBack } = useDraftUnit()
  const onError = (errors: any) => {
    console.log('VALIDATION ERROR', errors)
  }

  return (
    <div className="flex flex-col gap-4 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            setOpen(true)
          }, onError)}
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
            label="Edit Unit"
          />
          <SatuanOrganisasiForm kelompok="UNIT" form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
      <ModalAjukanUnit handleSave={handleSave} loading={loading} open={open} setOpen={setOpen} />
    </div>
  )
}

export default UnitEditPPIDView
