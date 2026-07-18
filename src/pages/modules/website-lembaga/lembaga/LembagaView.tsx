import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import LembagaViewModel from './LembagaViewModel'
import DetailField from '@/components/common/field/DetailField'
import CardInput from '@/components/common/card/CardInput'
import ButtonCancelDraft from './components/ButtonCancelDraft'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'
import { MdInfo } from 'react-icons/md'

const LembagaView = () => {
  const {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,
    goToEdit,
    realData,
    setRealData,
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
                  element: (
                    <ButtonGoToGuide
                      titleGuide="Data Lembaga"
                      valueGuide="P2M_PROFILE_SATUAN_ORGANISASI"
                    />
                  ),
                },
                {
                  type: 'custom',
                  element: <ButtonCancelDraft form={form} />,
                },
              ]
            : [
                {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide="Data Lembaga"
                      valueGuide="P2M_PROFILE_SATUAN_ORGANISASI"
                    />
                  ),
                },
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
        <div className="border border-blue-500 rounded flex flex-wrap p-3 sm:p-2 w-full sm:w-fit items-center gap-2 mt-5 text-xs sm:text-sm">
          <MdInfo className="size-5 text-blue-500 shrink-0" />
          <span className="flex-1 min-w-0">
            {realData
              ? 'Data yang tampil adalah data yang asli. Untuk melihat data yang anda ajukan'
              : 'Data yang tampil adalah data yang anda ajukan. Untuk melihat data asli'}
          </span>
          <button
            className="text-blue-500 font-semibold whitespace-nowrap"
            onClick={() => setRealData(!realData)}
          >
            KLIK DISINI
          </button>
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
