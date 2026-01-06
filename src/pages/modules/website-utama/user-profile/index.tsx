import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { FormUserProfile } from '@/pages/modules/website-utama/user-profile/components/form.tsx'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import { useState } from 'react'

export const UserProfilePage = () => {
  const { profileUser } = UseGetUserProfile()
  const [edit, setEdit] = useState(false)

  return (
    <>
      {edit ? (
        <FormUserProfile edit={edit} setEdit={setEdit} data={profileUser} />
      ) : (
        <div>
          <ButtonTitleGroup
            isBack
            buttonGroup={[{ type: 'edit', label: 'Edit Data', onClick: () => setEdit(!edit) }]}
            label="User Profile"
          />

          <div className="flex flex-col gap-5 mt-5">
            <p>Photo</p>
            <img src={profileUser?.gambar} className="size-32 object-contain" />

            <Accordion type={'single'} defaultValue={'user'}>
              <AccordionCustom name={'user'} title={'Informasi User'}>
                <div className="grid grid-cols-[12rem_1fr] gap-5">
                  <p className="text-gray-500">Nama Lengkap</p>
                  <p>{profileUser?.nama_lengkap}</p>
                  <p className="text-gray-500">Jabatan</p>
                  <p>{profileUser?.jabatan}</p>
                  <p className="text-gray-500">Jenis Kelamin</p>
                  <p>{profileUser?.jenis_kelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}</p>
                  <p className="text-gray-500">Telepon</p>
                  <p>{profileUser?.telepon}</p>
                  <p className="text-gray-500">Email</p>
                  <p>{profileUser?.email}</p>
                  <p className="text-gray-500">Level User</p>
                  <p>{profileUser?.level_user}</p>
                  <p className="text-gray-500">Satuan Kerja</p>
                  <ul className={'list-decimal flex flex-col gap-1.5 pl-4'}>
                    {profileUser?.satuan_kerja.map((item, k) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ul>
                </div>
              </AccordionCustom>
            </Accordion>
          </div>
        </div>
      )}
    </>
  )
}
