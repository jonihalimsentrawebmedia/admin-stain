import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ProdiDetailViewModel from './ProdiDetailViewModel'
import DetailField from '@/components/common/field/DetailField'
import CardInput from '@/components/common/card/CardInput'

import CardLog from '../../components/card/CardLog'
import CardPengajuan from '../../components/card/CardPengajuan'
import ButtonNewEditor from '../../components/buttonSumission/ButtonNewEditor'
import CardReject from '../../components/card/CardReject'

const ProdiDetailView = () => {
  const {
    fieldAddress1,
    fieldAddress2,
    fieldContact1,
    fieldContact2,
    fieldImage1,
    fieldImage2,
    fieldMediaSocial1,
    fieldMediaSocial2,
    fieldUniversity1,
    fieldUniversity2,
    id,
    form,
    goToEdit,
  } = ProdiDetailViewModel()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        isBack
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <ButtonNewEditor
                goToEdit={goToEdit}
                keyAccept="editor-change-data-profile"
                keyCancel="editor-change-data-profile"
                keySend={`editor-change-data-profile`}
                keyStatus="list-approved-status"
                linkAccept={`/editor/dashboard/update-status-publish/${id}`}
                linkCancel={`/editor/dashboard/update-status-publish/${id}`}
                linkSend={`/editor/dashboard/update-status-publish/${id}`}
                status={form.watch('status_publish')}
              />
            ),
          },
        ]}
        label="Pengajuan Data - Profil Program Studi"
      />
      <div className="flex flex-col gap-4">
        <CardPengajuan form={form} />
        {form.watch('status_publish') == 'TOLAK_EDITOR' && <CardReject form={form} />}
        <CardInput title="Logo & Favicon" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldImage1} form={form} isRowParent isRow={false} />}
            children2={<DetailField data={fieldImage2} form={form} isRowParent isRow={false} />}
          />
        </CardInput>
        <CardInput title="Identitas Institusi" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldUniversity1} form={form} />}
            children2={<DetailField data={fieldUniversity2} form={form} />}
          />
        </CardInput>
        <CardInput title="Alamat Lengkap" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldAddress1} form={form} />}
            children2={<DetailField data={fieldAddress2} form={form} />}
          />
        </CardInput>
        <CardInput title="Kontak Resmi" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldContact1} form={form} />}
            children2={<DetailField data={fieldContact2} form={form} />}
          />
        </CardInput>
        <CardInput title="Media Sosial" classNameChildren="p-0">
          <CardLog
            children={<DetailField data={fieldMediaSocial1} form={form} />}
            children2={<DetailField data={fieldMediaSocial2} form={form} />}
          />
        </CardInput>
      </div>
    </div>
  )
}

export default ProdiDetailView
