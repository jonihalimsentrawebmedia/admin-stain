import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetChangeDataProfile } from '../../controller/useGetChangeDataProfile'

const UnitDetailViewModel = () => {
  const { id } = useParams()
  const { profileChangeData } = UseGetChangeDataProfile(id ?? '')
  const form = useForm()
  const navigate = useNavigate()

  const fieldImage1 = [
    {
      label: 'Logo',
      name: 'current_profil.logo',
      component: (
        <div className="bg-[#F5FFFA] border border-[#70F2B1] p-4">
          <img
            className="max-w-[200px] max-h-[200px]"
            src={form.watch('current_profil.logo')}
            alt="logo"
          />
        </div>
      ),
    },
    {
      label: 'Favicon',
      name: 'current_profil.favicon',
      component: (
        <div className="bg-[#F5FFFA] w-fit border border-[#70F2B1] p-4">
          <img
            className="max-w-[100px] max-h-[100px]"
            src={form.watch('current_profil.favicon')}
            alt="logo"
          />
        </div>
      ),
    },
  ]
  const fieldImage2 = [
    {
      label: 'Logo',
      name: 'pengajuan_profil.logo',
      component: (
        <div className="bg-[#F5FFFA] border border-[#70F2B1] p-4">
          <img
            className="max-w-[200px] max-h-[200px]"
            src={form.watch('pengajuan_profil.logo')}
            alt="logo"
          />
        </div>
      ),
    },
    {
      label: 'Favicon',
      name: 'pengajuan_profil.favicon',
      component: (
        <div className="bg-[#F5FFFA] w-fit border border-[#70F2B1] p-4">
          <img
            className="max-w-[100px] max-h-[100px]"
            src={form.watch('pengajuan_profil.favicon') ?? ''}
            alt="logo"
          />
        </div>
      ),
    },
  ]
  const fieldUniversity1 = [
    {
      label: 'Universitas/PT Asal',
      name: 'current_profil.nama_parent',
    },
    {
      label: 'Kelompok',
      name: 'current_profil.kelompok',
    },

    {
      label: 'Nama Program Studi',
      name: 'current_profil.nama',
    },
    {
      label: 'Keyword',
      name: 'current_profil.keyword',
    },
  ]
  const fieldUniversity2 = [
    {
      label: 'Universitas/PT Asal',
      name: 'pengajuan_profil.nama_parent',
    },
    {
      label: 'Kelompok',
      name: 'pengajuan_profil.kelompok',
    },

    {
      label: 'Nama Program Studi',
      name: 'pengajuan_profil.nama',
    },
    {
      label: 'Keyword',
      name: 'pengajuan_profil.keyword',
    },
  ]

  const fieldAddress1 = [
    {
      label: 'Alamat',
      name: 'current_profil.alamat',
    },
    {
      label: 'Provinsi',
      name: 'current_profil.provinsi',
    },
    {
      label: 'Kabupaten/Kota',
      name: 'current_profil.kabupaten_kota',
    },
    {
      label: 'Kecamatan',
      name: 'current_profil.kecamatan',
    },
    {
      label: 'Kelurahan / Desa',
      name: 'current_profil.kelurahan',
    },
    {
      label: 'Kode Pos',
      name: 'current_profil.kode_pos',
    },
  ]
  const fieldAddress2 = [
    {
      label: 'Alamat',
      name: 'pengajuan_profil.alamat',
    },
    {
      label: 'Provinsi',
      name: 'pengajuan_profil.provinsi',
    },
    {
      label: 'Kabupaten/Kota',
      name: 'pengajuan_profil.kabupaten_kota',
    },
    {
      label: 'Kecamatan',
      name: 'pengajuan_profil.kecamatan',
    },
    {
      label: 'Kelurahan / Desa',
      name: 'pengajuan_profil.kelurahan',
    },
    {
      label: 'Kode Pos',
      name: 'pengajuan_profil.kode_pos',
    },
  ]

  const fieldContact1 = [
    {
      label: 'Telepon',
      name: 'current_profil.telepon',
    },
    {
      label: 'Fax',
      name: 'current_profil.fax',
    },
    {
      label: 'Email',
      name: 'current_profil.email',
    },
  ]
  const fieldContact2 = [
    {
      label: 'Telepon',
      name: 'pengajuan_profil.telepon',
    },
    {
      label: 'Fax',
      name: 'pengajuan_profil.fax',
    },
    {
      label: 'Email',
      name: 'pengajuan_profil.email',
    },
  ]

  const fieldMediaSocial1 = [
    {
      label: 'Facebook',
      name: 'current_profil.facebook',
    },
    {
      label: 'Twitter',
      name: 'current_profil.twitter',
    },
    {
      label: 'Instagram',
      name: 'current_profil.instagram',
    },
    {
      label: 'Youtube',
      name: 'current_profil.youtube',
    },
  ]
  const fieldMediaSocial2 = [
    {
      label: 'Facebook',
      name: 'pengajuan_profil.facebook',
    },
    {
      label: 'Twitter',
      name: 'pengajuan_profil.twitter',
    },
    {
      label: 'Instagram',
      name: 'pengajuan_profil.instagram',
    },
    {
      label: 'Youtube',
      name: 'pengajuan_profil.youtube',
    },
  ]

  function goToEdit() {
    navigate(`/modules/editor/unit/edit/${id}`)
  }
  useEffect(() => {
    if (profileChangeData) {
      form.reset({
        ...profileChangeData,
      })
    }
  }, [profileChangeData])
  return {
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
    form,
    goToEdit,
    id,
  }
}

export default UnitDetailViewModel
