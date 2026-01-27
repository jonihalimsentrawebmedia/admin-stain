import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import DetailField from '@/components/common/field/DetailField'
import CardInput from '@/components/common/card/CardInput'
import UniversityDetailViewModel from './UniversityDetailViewModel'
import CardPengajuan from '../../components/card/CardPengajuan'
import CardLog from '../../components/card/CardLog'
import ButtonNewEditor from '../../components/buttonSumission/ButtonNewEditor'

const UniversityDetailView = () => {
  const {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,
    goToEdit,
  } = UniversityDetailViewModel()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        // isBack
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <ButtonNewEditor
                goToEdit={goToEdit}
                keyAccept=""
                keyCancel=""
                keySend=""
                keyStatus=""
                linkAccept=""
                linkCancel=""
                linkSend=""
                status=""
              />
            ),
          },
        ]}
        label="Pengajuan Data - Profil Universitas"
      />
      <div className="flex flex-col gap-4">
        <CardPengajuan form={form} />
        <CardInput title="Logo & Favicon" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldImage} form={form} isRowParent isRow={false} />}
            children2={<DetailField data={fieldImage} form={form} isRowParent isRow={false} />}
          />
        </CardInput>
        <CardInput title="Identitas Institusi" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldUniversity} form={form} />}
            children2={<DetailField data={fieldUniversity} form={form} />}
          />
        </CardInput>
        <CardInput title="Alamat Lengkap" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldAddress} form={form} />}
            children2={<DetailField data={fieldAddress} form={form} />}
          />
        </CardInput>
        <CardInput title="Kontak Resmi" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldContact} form={form} />}
            children2={<DetailField data={fieldContact} form={form} />}
          />
        </CardInput>
        <CardInput title="Media Sosial" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldMediaSocial} form={form} />}
            children2={<DetailField data={fieldMediaSocial} form={form} />}
          />
        </CardInput>
      </div>
    </div>
  )
}

export default UniversityDetailView
