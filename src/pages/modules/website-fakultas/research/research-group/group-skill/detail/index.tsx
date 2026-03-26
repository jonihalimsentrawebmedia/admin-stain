import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailGroupSkills } from '@/pages/modules/website-fakultas/research/research-group/group-skill/hooks'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

const DetailGroupSkillPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { groupSKill } = UseGetDetailGroupSkills(id as string)

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          label={'Detail Kelompok Keahlian'}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () =>
                navigate(
                  `/modules/website-fakultas/research/research-group/group-skill/edit/${groupSKill?.id_kelompok_keahlian}`
                ),
            },
          ]}
        />

        <img src={groupSKill?.url_gambar} alt="gambar" className={'object-contain w-[250px]'} />

        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Nama Kelompok Keahlian</p>
          <p className={'text-xl font-semibold text-primary'}>{groupSKill?.nama_kelompok}</p>
        </div>
        <TitleLine title={'Deskripsi'} />
        <RenderHTMLContent content={groupSKill?.deskripsi ?? ''} />
      </div>
    </>
  )
}

export default DetailGroupSkillPage
