import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import DetailField from '@/components/common/field/DetailField'
import CardInput from '@/components/common/card/CardInput'
import ButtonCancelDraft from './components/ButtonCancelDraft'
import UnitViewModel from './UnitViewModel'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'
import { ProfilePageSkeleton } from '../../website-utama/profile/components/skeleton'
import { MdInfo } from 'react-icons/md'

const UnitView = () => {
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
    loading,
  } = UnitViewModel()
  if (loading) {
    return <ProfilePageSkeleton />
  }
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={
          form.watch('status_publish') == 'DIAJUKAN_EDITOR'
            ? [
                {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={'Data Unit'}
                      valueGuide="PPID_PROFIL_SATUAN_ORGANISASI"
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
                      titleGuide={'Data Unit'}
                      valueGuide="PPID_PROFIL_SATUAN_ORGANISASI"
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
        label="Data Unit"
      />
      {form.watch('status_publish') == 'DIAJUKAN_EDITOR' && (
        <div className={'border border-blue-500 rounded flex p-2 w-fit items-center gap-1.5 mt-5'}>
          <MdInfo className={'size-5 text-blue-500'} />
          {realData
            ? 'Data yang tampil adalah data yang asli. Untuk melihat data yang anda ajukan'
            : 'Data yang tampil adalah data yang anda ajukan. Untuk melihat data asli'}
          <button className={'text-blue-500'} onClick={() => setRealData(!realData)}>
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

export default UnitView
