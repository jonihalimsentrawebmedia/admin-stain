import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { FormUserProfileSIMRS } from '@/pages/modules/SIM-RS/component/updated-detail/components/form.tsx'
import { UseGetUserSIMRSProfile } from '@/pages/modules/SIM-RS/component/user-profile'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IoInformationCircle } from 'react-icons/io5'

export const UserSimRSProfilePage = () => {
  const { profile } = UseGetUserSIMRSProfile()
  const [edit, setEdit] = useState(false)

  return (
    <>
      {edit ? (
        <FormUserProfileSIMRS edit={edit} setEdit={setEdit} data={profile} />
      ) : (
        <div>
          <ButtonTitleGroup
            isBack
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <Button variant={'outline'} className="text-primary border-primary">
                    <IoInformationCircle />
                    Panduan
                  </Button>
                ),
              },
              { type: 'edit', label: 'Edit Data', onClick: () => setEdit(!edit) },
            ]}
            label="User Profile"
          />

          <div className="flex flex-col gap-5 mt-5">
            <p>Photo</p>
            <img alt={'iimage'} src={profile?.gambar} className="size-32 object-contain" />

            <Accordion type={'single'} defaultValue={'user'}>
              <AccordionCustom name={'user'} title={'Informasi User'}>
                <div className="grid grid-cols-[12rem_1fr] gap-5">
                  <p className="text-gray-500">Nama</p>
                  <p>{profile?.nama_lengkap}</p>
                  <p className="text-gray-500">Email</p>
                  <p>{profile?.email}</p>
                  <p className="text-gray-500">Nomor Telepon</p>
                  <p>{profile?.telepon}</p>
                  <p className="text-gray-500">Role</p>
                  <p>{profile?.nama_role}</p>
                  <p className="text-gray-500">Satuan Organisasi</p>
                  <p>{profile?.nama_satuan_organisasi}</p>
                  <p className="text-gray-500">Status</p>
                  <p>{profile?.is_status ? 'Aktif' : 'Tidak Aktif'}</p>
                </div>
              </AccordionCustom>
            </Accordion>
          </div>
        </div>
      )}
    </>
  )
}
