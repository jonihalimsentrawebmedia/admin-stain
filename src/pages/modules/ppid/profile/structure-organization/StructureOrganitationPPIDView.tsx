import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useGetStructureOrganization from './controller/useGetStructureOrganization'
import { Form } from '@/components/ui/form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import StructureOrganizationForm from './components/StructureOrganizationForm'
import { StructureOrganizationResolver, type StructureOrganizationType } from './model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { Skeleton } from '@/components/ui/skeleton'

const StructureOrganitationPPIDView = () => {
  const form = useForm<StructureOrganizationType>({
    resolver: zodResolver(StructureOrganizationResolver),
  })
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  async function handleSave(e: any) {
    setLoading(true)

    await AxiosClient.post(`/unit-ppid/struktur-organisasi`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['ppip-struktur-organisasi'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }
  const { loading: loadingDetail, structureOrganization } = useGetStructureOrganization()

  useEffect(() => {
    if (structureOrganization) {
      form.reset({
        atasan: {
          deskripsi: structureOrganization?.atasan.deskripsi,
          nama: structureOrganization?.atasan.nama,
          url_gambar: structureOrganization?.atasan.url_gambar,
        },
        pejabat: {
          deskripsi: structureOrganization?.pejabat.deskripsi,
          nama: structureOrganization?.pejabat.nama,
          url_gambar: structureOrganization?.pejabat.url_gambar,
        },
        isi_profil: structureOrganization.isi_profil,
        isi_struktur: structureOrganization.isi_struktur,
      })
    }
  }, [structureOrganization])

  if (loadingDetail) {
    return <Skeleton className="h-[300px]" />
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <ButtonTitleGroup
          buttonGroup={
            isEdit
              ? [
                  {
                    type: 'custom',
                    element: (
                      <ButtonForm
                        loading={loading}
                        onCancel={() => {
                          setIsEdit(false)
                        }}
                      />
                    ),
                  },
                ]
              : [
                  {
                    type: 'edit',
                    label: 'Edit Konten',
                    onClick: (e) => {
                      e.preventDefault()
                      setIsEdit(true)
                    },
                  },
                ]
          }
          label={'Struktur Organisasi'}
        />
        {!isEdit ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-primary text-2xl font-medium">Profile</div>
              <div
                className={'tiptap ProseMirror simple-editor html-class'}
                dangerouslySetInnerHTML={{ __html: form.watch('isi_profil') }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-primary text-2xl font-medium">
                Atasan Pejabat Pengelola Informasi & Dokumentasi
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <img
                  src={form.watch('atasan.url_gambar')}
                  className=" object-cover w-[225px] max-w-[225px] max-h-[300px] min-w-[225px] min-h-[300px] h-[300px] "
                  alt={form.watch('atasan.nama')}
                />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-[#999] text-xs">Nama</div>
                    <div className="text-primary text-2xl">{form.watch('atasan.nama')}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#999] text-xs">Deskripsi</div>
                    <div className="">{form.watch('atasan.deskripsi')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-primary text-2xl font-medium">
                Pejabat Pengelola Informasi & Dokumentasi Utama
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <img
                  src={form.watch('pejabat.url_gambar')}
                  className=" object-cover w-[225px] max-w-[225px] max-h-[300px] min-w-[225px] min-h-[300px] h-[300px] "
                  alt={form.watch('pejabat.nama')}
                />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-[#999] text-xs">Nama</div>
                    <div className="text-primary text-2xl">{form.watch('pejabat.nama')}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#999] text-xs">Deskripsi</div>
                    <div className="">{form.watch('pejabat.deskripsi')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-primary text-2xl font-medium">Struktur</div>
              <div
                className={'tiptap ProseMirror simple-editor html-class'}
                dangerouslySetInnerHTML={{ __html: form.watch('isi_struktur') }}
              />
            </div>
          </div>
        ) : (
          <StructureOrganizationForm form={form} />
        )}
        {isEdit && (
          <ButtonForm
            loading={loading}
            onCancel={() => {
              setIsEdit(false)
            }}
          />
        )}
      </form>
    </Form>
  )
}

export default StructureOrganitationPPIDView
