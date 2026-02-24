import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import DetailField from '@/components/common/field/DetailField'
import CardInput from '@/components/common/card/CardInput'
import ButtonCancelDraft from './components/ButtonCancelDraft'
import { IoInformationCircle } from 'react-icons/io5'
import UnitViewModel from './UnitViewModel'

const UnitView = () => {
  const {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,
    goToEdit,
    formCurrent,
    isCurrent,
    setIsCurrent,
  } = UnitViewModel()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
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
        label="Data Unit"
      />
      {form.watch('status_publish') == 'DIAJUKAN_EDITOR' &&
        (isCurrent ? (
          <div className="flex gap-2 items-center w-fit px-2 py-1 text-[#2769CD] border border-[#2769CD] rounded">
            <IoInformationCircle className="size-8" />
            <div className="text-black">
              Data yang tampil adalah data yang asli. Untuk melihat data yang anda ajukan {' '}
              <span
                onClick={() => {
                  setIsCurrent(false)
                }}
                className="text-blue-500 underline cursor-pointer"
              >
                KLIK DISINI
              </span>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center w-fit px-2 py-1 text-[#2769CD] border border-[#2769CD] rounded">
            <IoInformationCircle className="size-8" />
            <div className="text-black">
              Data yang tampil adalah data yang anda ajukan. Untuk melihat data asli {" "}
              <span
                onClick={() => {
                  setIsCurrent(true)
                }}
                className="text-blue-500 underline cursor-pointer"
              >
                KLIK DISINI
              </span>
            </div>
          </div>
        ))}
      <div className="flex flex-col gap-4">
        <div>
          <DetailField
            data={fieldImage}
            form={isCurrent ? formCurrent : form}
            isRowParent
            isRow={false}
          />
        </div>
        <CardInput title="Identitas Lembaga">
          <DetailField data={fieldUniversity} form={isCurrent ? formCurrent : form} />
        </CardInput>
        <CardInput title="Alamat Lengkap">
          <DetailField data={fieldAddress} form={isCurrent ? formCurrent : form} />
        </CardInput>
        <CardInput title="Kontak Resmi">
          <DetailField data={fieldContact} form={isCurrent ? formCurrent : form} />
        </CardInput>
        <CardInput title="Media Sosial">
          <DetailField data={fieldMediaSocial} form={isCurrent ? formCurrent : form} />
        </CardInput>
      </div>
    </div>
  )
}

export default UnitView
