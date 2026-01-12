import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup"
import { colostStatusPublish } from "../../components/buttonSumission/SubmissionDetailButton"
import ButtonAccept from "../../components/buttonSumission/ButtonAccept"
import ButtonCancelDraft from "../../components/buttonSumission/ButtonCancelDraft"
import DetailField from "@/components/common/field/DetailField"
import CardInput from "@/components/common/card/CardInput"
import InstitutionDetailHistoryViewModel from "./InstitutionDetailHistoryViewModel"

const InstitutionDetailHistoryView = () => {
const {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,
    fieldDetail,
    satuanOrganisasi,
  } = InstitutionDetailHistoryViewModel()

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        isBack
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <div className="flex gap-2 items-center">
                <div className="text-[#444]">
                  Status{' '}
                  <span
                    className={`${colostStatusPublish(satuanOrganisasi?.status_publish ?? '')}`}
                  >
                    {satuanOrganisasi?.status_publish}
                  </span>
                </div>
                <ButtonAccept
                  isIcon={false}
                  queryKey="editor-profile-satuan-organisasi-list"
                  url={`/editor/profil/${satuanOrganisasi?.id_satuan_organisasi}/publish`}
                />
                <ButtonCancelDraft
                  isIcon={false}
                  queryKey="editor-profile-satuan-organisasi-list"
                  url={`/editor/profil/${satuanOrganisasi?.id_satuan_organisasi}/tolak`}
                />
              </div>
            ),
          },
        ]}
        label="Pengajuan Data"
      />
      <div className="flex flex-col gap-4">
        <div className="px-4 py-2 border bg-[#F5F9FF] border-[#70A4F2] rounded-lg">
          <div className="text-[#2769CD] mb-4">Identitas Pengajuan</div>
          <DetailField data={fieldDetail} form={form} />
        </div>
        <div>
          <DetailField data={fieldImage} form={form} isRowParent isRow={false} />
        </div>
        <CardInput title="Identitas Fakultas">
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

export default InstitutionDetailHistoryView