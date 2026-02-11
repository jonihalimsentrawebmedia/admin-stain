import {Form} from '@/components/ui/form'
import IdentityViewModel from './IdentityViewModel'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import DetailField from '@/components/common/field/DetailField'
import TextInput from '@/components/common/form/TextInput'
import InputImage from '@/components/common/form/InputImage'
import ButtonForm from '@/components/common/button/ButtonForm'
import {Skeleton} from '@/components/ui/skeleton'

const IdentityView = () => {
  const {field, form, formDetail, handleSave, isEdit, loading, loadingDetail, setIsEdit} =
    IdentityViewModel()
  if (loadingDetail) {
    return <Skeleton className="w-full h-[100px]"/>
  }
  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className='flex flex-col gap-4'>
          <ButtonTitleGroup
            label="Menu Identitas"
            buttonGroup={
              isEdit
                ? [
                  {
                    label: 'cancel',
                    onClick: () => {
                      setIsEdit(false)
                    },
                    type: 'cancel',
                  },
                  {
                    label: 'Simpan',
                    onClick: () => {
                    },
                    type: 'save',
                    isDisabled: loading,
                  },
                ]
                : [
                  {
                    label: 'Edit Data',
                    onClick: (e) => {
                      e.preventDefault()
                      setIsEdit(true)
                    },
                    type: 'edit',
                  },
                ]
            }
          />
          {isEdit ? (
            <div className="flex flex-col gap-4">
              <TextInput form={form} name="nama" className={'text-black'} label="Nama"/>
              <InputImage form={form} name="logo" label="Logo"/>
              <InputImage form={form} name="background" label="Background"/>
            </div>
          ) : (
            <DetailField isRow={false} data={field} form={formDetail}/>
          )}
          {isEdit && (
            <ButtonForm
              loading={loading}
              onCancel={() => {
                setIsEdit(false)
              }}
            />
          )}
        </form>
      </Form>
    </div>
  )
}

export default IdentityView
