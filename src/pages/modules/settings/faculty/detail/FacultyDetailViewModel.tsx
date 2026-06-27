import { useForm } from 'react-hook-form'

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetSatuanOrganisasiDetail from '../../controller/useGetSatuanOrganisasiDetail'

const FacultyDetailViewModel = () => {
  const { satuanOrganisasi } = useGetSatuanOrganisasiDetail({
    kelompok: 'FAKULTAS',
  })
  const form = useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const fieldImage = [
    {
      label: 'Logo',
      name: 'logo',
      component: (
        <div className="bg-[#F5FFFA] border border-[#70F2B1] p-4">
          <img className="max-w-[200px] max-h-[200px]" src={form.watch('logo')} alt="logo" />
        </div>
      ),
    },
    {
      label: 'Favicon',
      name: 'favicon',
      component: (
        <div className="bg-[#F5FFFA] w-fit border border-[#70F2B1] p-4">
          <img className="max-w-[100px] max-h-[100px]" src={form.watch('favicon')} alt="logo" />
        </div>
      ),
    },
  ]
  const fieldUniversity = [
    {
      label: 'Kelompok',
      name: 'kelompok',
    },
    {
      label: `${satuanOrganisasi?.kelompok === 'UNIVERSITAS' ? 'Nama Universitas' : 'Satuan Organisasi'}`,
      name: 'nama',
    },
    {
      label: 'Singkatan',
      name: 'singkatan',
    },
    {
      label: 'Keyword',
      name: 'keyword',
    },
  ]
  const fieldAddress = [
    {
      label: 'Alamat',
      name: 'alamat',
    },
    {
      label: 'Provinsi',
      name: 'provinsi',
    },
    {
      label: 'Kabupaten/Kota',
      name: 'kabupaten_kota',
    },
    {
      label: 'Kecamatan',
      name: 'kecamatan',
    },
    {
      label: 'Kelurahan / Desa',
      name: 'kelurahan',
    },
    {
      label: 'Kode Pos',
      name: 'kode_pos',
    },
    {
      label: 'Link Google Map',
      name: 'link_google_map',
    },
  ]
  const fieldContact = [
    {
      label: 'Telepon',
      name: 'telepon',
    },
    {
      label: 'Fax',
      name: 'fax',
    },
    {
      label: 'Email',
      name: 'email',
    },
  ]
  const fieldMediaSocial = [
    {
      label: 'Facebook',
      name: 'facebook',
    },
    {
      label: 'Twitter',
      name: 'twitter',
    },
    {
      label: 'Instagram',
      name: 'instagram',
    },
    {
      label: 'Youtube',
      name: 'youtube',
    },
  ]

  function goToEdit() {
    navigate(`/modules/settings/faculty/edit/${id}`)
  }
  useEffect(() => {
    form.reset({
      ...satuanOrganisasi,
      kelompok: 'Fakultas',
    })
  }, [satuanOrganisasi])

  const temp =
    satuanOrganisasi?.kelompok === 'UNIVERSITAS'
      ? [...fieldUniversity]
      : [
          ...fieldUniversity.slice(0, 1),
          {
            label: 'Nama Universitas',
            name: 'nama_parent_satuan_organisasi',
          },
          ...fieldUniversity.slice(1),
        ]

  return {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity: temp,
    form,
    goToEdit,
  }
}

export default FacultyDetailViewModel
