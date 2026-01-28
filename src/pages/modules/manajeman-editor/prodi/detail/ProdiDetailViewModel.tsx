import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetChangeDataProfile } from '../../controller/useGetChangeDataProfile'

const ProdiDetailViewModel = () => {
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
        <div
          className={`border ${form.watch('current_profil.logo') !== form.watch('pengajuan_profil.logo') ? 'border border-red-500 p-1.5 bg-red-100' : 'bg-[#F5FFFA] border-[#70F2B1]'} p-4`}
        >
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
        <div
          className={`border w-fit ${form.watch('current_profil.favicon') !== form.watch('pengajuan_profil.favicon') ? 'border border-red-500 p-1.5 bg-red-100' : 'bg-[#F5FFFA] border-[#70F2B1]'} p-4`}
        >
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
      label: 'Kelompok',
      name: 'current_profil.kelompok',
    },
    {
      label: 'Universitas Asal',
      name: 'current_profil.nama_parent',
    },
    {
      label: 'Fakultas Asal',
      name: 'current_profil.nama_fakultas',
    },
    {
      label: 'Nama Program Studi',
      name: 'current_profil.nama',
    },
    {
      label: 'Jenjang Pendidikan',
      name: 'current_profil.jenjang_pendidikan',
    },
    {
      label: 'Keyword',
      name: 'current_profil.keyword',
    },
  ]
  const fieldUniversity2 = [
    {
      label: 'Kelompok',
      name: 'pengajuan_profil.kelompok',
      component: (
        <div
          className={`${form.watch('current_profil.kelompok') !== form.watch('pengajuan_profil.kelompok') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.kelompok')}
        </div>
      ),
    },
    {
      label: 'Universitas Asal',
      name: 'pengajuan_profil.nama_parent',
      component: (
        <div
          className={`${form.watch('current_profil.nama_parent') !== form.watch('pengajuan_profil.nama_parent') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.nama_parent')}
        </div>
      ),
    },
    {
      label: 'Fakultas Asal',
      name: 'pengajuan_profil.nama_fakultas',
      component: (
        <div
          className={`${form.watch('current_profil.nama_fakultas') !== form.watch('pengajuan_profil.nama_fakultas') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.nama_fakultas')}
        </div>
      ),
    },
    {
      label: 'Nama Program Studi',
      name: 'pengajuan_profil.nama',
      component: (
        <div
          className={`${form.watch('current_profil.nama') !== form.watch('pengajuan_profil.nama') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.nama')}
        </div>
      ),
    },
    {
      label: 'Jenjang Pendidikan',
      name: 'pengajuan_profil.jenjang_pendidikan',
      component: (
        <div
          className={`${form.watch('current_profil.jenjang_pendidikan') !== form.watch('pengajuan_profil.jenjang_pendidikan') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.jenjang_pendidikan')}
        </div>
      ),
    },
    {
      label: 'Keyword',
      name: 'pengajuan_profil.keyword',
      component: (
        <div
          className={`${form.watch('current_profil.keyword') !== form.watch('pengajuan_profil.keyword') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.keyword')}
        </div>
      ),
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
      component: (
        <div
          className={`${form.watch('current_profil.alamat') !== form.watch('pengajuan_profil.alamat') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.alamat')}
        </div>
      ),
    },
    {
      label: 'Provinsi',
      name: 'pengajuan_profil.provinsi',
      component: (
        <div
          className={`${form.watch('current_profil.provinsi') !== form.watch('pengajuan_profil.provinsi') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.provinsi')}
        </div>
      ),
    },
    {
      label: 'Kabupaten/Kota',
      name: 'pengajuan_profil.kabupaten_kota',
      component: (
        <div
          className={`${form.watch('current_profil.kabupaten_kota') !== form.watch('pengajuan_profil.kabupaten_kota') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.kabupaten_kota')}
        </div>
      ),
    },
    {
      label: 'Kecamatan',
      name: 'pengajuan_profil.kecamatan',
      component: (
        <div
          className={`${form.watch('current_profil.kecamatan') !== form.watch('pengajuan_profil.kecamatan') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.kecamatan')}
        </div>
      ),
    },
    {
      label: 'Kelurahan / Desa',
      name: 'pengajuan_profil.kelurahan_desa',
      component: (
        <div
          className={`${form.watch('current_profil.kelurahan_desa') !== form.watch('pengajuan_profil.kelurahan_desa') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.kelurahan_desa')}
        </div>
      ),
    },
    {
      label: 'Kode Pos',
      name: 'pengajuan_profil.kode_pos',
      component: (
        <div
          className={`${form.watch('current_profil.kode_pos') !== form.watch('pengajuan_profil.kode_pos') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.kode_pos')}
        </div>
      ),
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
      component: (
        <div
          className={`${form.watch('current_profil.telepon') !== form.watch('pengajuan_profil.telepon') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.telepon')}
        </div>
      ),
    },
    {
      label: 'Fax',
      name: 'pengajuan_profil.fax',
      component: (
        <div
          className={`${form.watch('current_profil.fax') !== form.watch('pengajuan_profil.fax') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.fax')}
        </div>
      ),
    },
    {
      label: 'Email',
      name: 'pengajuan_profil.email',
      component: (
        <div
          className={`${form.watch('current_profil.email') !== form.watch('pengajuan_profil.email') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.email')}
        </div>
      ),
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
      component: (
        <div
          className={`${form.watch('current_profil.facebook') !== form.watch('pengajuan_profil.facebook') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.facebook')}
        </div>
      ),
    },
    {
      label: 'Twitter',
      name: 'pengajuan_profil.twitter',
      component: (
        <div
          className={`${form.watch('current_profil.twitter') !== form.watch('pengajuan_profil.twitter') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.twitter')}
        </div>
      ),
    },
    {
      label: 'Instagram',
      name: 'pengajuan_profil.instagram',
      component: (
        <div
          className={`${form.watch('current_profil.instagram') !== form.watch('pengajuan_profil.instagram') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.instagram')}
        </div>
      ),
    },
    {
      label: 'Youtube',
      name: 'pengajuan_profil.youtube',
      component: (
        <div
          className={`${form.watch('current_profil.youtube') !== form.watch('pengajuan_profil.youtube') ? 'border border-primary p-1.5' : ''}`}
        >
          {form.watch('pengajuan_profil.youtube')}
        </div>
      ),
    },
  ]

  function goToEdit() {
    navigate(`/modules/editor/prodi/edit/${id}`)
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

export default ProdiDetailViewModel
