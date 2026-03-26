import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailStudentOrganization } from '@/pages/modules/website-fakultas/community/student-life/student-organization/list-Organization/hooks'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailStudentOrganization = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detail } = UseGetDetailStudentOrganization((id as string) ?? '')

  return (
    <>
      <div className={'space-y-4 py-5'}>
        <ButtonTitleGroup
          label={'Detail Organisasi Mahasiswa'}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () =>
                navigate(
                  `/modules/website-fakultas/community/student-life/student-organization/list-organization/edit/${detail?.id_daftar_organisasi_mahasiswa}`
                ),
            },
          ]}
        />

        <img src={detail?.url_gambar} alt="gambar" className={'object-contain h-[200px]'} />

        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Nama Organiasi Mahasiswa</p>
          <p className={'text-primary font-semibold text-2xl'}>{detail?.nama}</p>
        </div>

        <TitleLine title={'Tentang'} />
        <RenderHTMLContent content={detail?.tentang ?? ''} />
        <TitleLine title={'Sekretariat'} />
        <RenderHTMLContent content={detail?.seketariat ?? ''} />
        <TitleLine title={'Kegiatan'} />
        <RenderHTMLContent content={detail?.kegiatan ?? ''} />
      </div>
    </>
  )
}
