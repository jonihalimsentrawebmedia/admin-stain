import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import CardInput from '@/components/common/card/CardInput'
import ProfileViewModel from './ProfileViewModel'
import DetailField from '@/components/common/field/DetailField'
import ImageProfile from './components/ImageProfile'

const ProfileView = () => {
  const { form, profile, field, goToEdit } = ProfileViewModel()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: 'Edit Data',
            type: 'edit',
            onClick: () => {
              goToEdit()
            },
          },
        ]}
        label="Profil"
        isBack
      />
      {profile && <ImageProfile img={profile?.gambar ?? ''} />}
      <CardInput title="Informasi User">
        <DetailField data={field} form={form} />
      </CardInput>
    </div>
  )
}

export default ProfileView
