import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import LembagaViewModel from './LembagaViewModel'
import DetailField from '@/components/common/field/DetailField'
import CardInput from '@/components/common/card/CardInput'
import ButtonCancelDraft from './components/ButtonCancelDraft'
import { IoInformationCircle } from 'react-icons/io5'

const LembagaView = () => {
  const {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,
    goToEdit,
  } = LembagaViewModel()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        isBack
        buttonGroup={
          form.watch('status_publish') == 'DIAJUKAN_EDITOR'
            ? [
                {
                  type: 'custom',
                  element: <ButtonCancelDraft form={form} />,
                },
              ]
            : [
                {
                  label: 'Edit Data',
                  onClick: () => {
                    goToEdit()
                  },
                  type: 'edit',
                },
              ]
        }
        label="Data Lembaga"
      />
      {form.watch('status_publish') == 'DIAJUKAN_EDITOR' && (
        <div className="flex gap-2 items-center w-fit px-2 py-1 text-[#2769CD] border border-[#2769CD] rounded">
          <IoInformationCircle className="size-8" />
          <div className='text-black'>
            Data yang tampil adalah data yang asli. Untuk melihat data yang anda ajukan <span className='text-blue-500 underline'>KLIK DISINI</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div>
          <DetailField data={fieldImage} form={form} isRowParent isRow={false} />
        </div>
        <CardInput title="Identitas Lembaga">
          <DetailField data={fieldUniversity} form={form} />
        </CardInput>
        <CardInput title="Alamat Lengkap">
          <DetailField data={fieldAddress} form={form} />
        </CardInput>
        <CardInput title="Kontak Resmi">
          <DetailField data={fieldContact} form={form} />
        </CardInput>
        <CardInput title="Media Sosial">
          <DetailField data={fieldMediaSocial} form={form} />
        </CardInput>
      </div>
    </div>
  )
}

export default LembagaView
