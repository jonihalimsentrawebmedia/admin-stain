import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { NonUktProdi } from '../../data/types.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdArchive, MdUpload } from 'react-icons/md'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

interface props {
  data?: NonUktProdi
}

export const ButtonPublish = (props: props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { id } = useParams()

  const queryClient = useQueryClient()
  const handlePublish = async () => {
    setLoading(true)
    await AxiosClient.patch(`/website-utama/biaya-pendidikan-non-ukt/jalur-masuk/${id}/publish`)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['cost_education_non_ukt'],
          })
          queryClient.invalidateQueries({
            queryKey: ['detail_cost_non_ukt'],
          })
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Publish Data')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      {data?.publish ? (
        <Button variant={'destructive'} disabled={loading} onClick={() => setOpen(!open)}>
          <MdArchive />
          Unpublish
        </Button>
      ) : (
        <Button
          variant={'outline'}
          className={'border-primary text-primary hover:text-primary'}
          disabled={loading}
          onClick={() => setOpen(!open)}
        >
          <MdUpload />
          Publish
        </Button>
      )}

      <DialogBasic
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
        title={'Publish Non UKT'}
      >
        <div>
          {data?.publish ? (
            <p>
              Apakah Anda yakin ingin membatalkan publikasi informasi Non UKT Program Studi{' '}
              {data?.kode_jenjang} {data?.nama_prodi}, Fakultas {data?.nama_fakultas}?
            </p>
          ) : (
            <p>
              Publikasikan Non UKT Program Studi {data?.kode_jenjang} {data?.nama_prodi}, Fakultas{' '}
              {data?.nama_fakultas}?
            </p>
          )}
          {data?.publish ? (
            <p>Data Non UKT akan disembunyikan dari website.</p>
          ) : (
            <p>Pastikan nominal Non UKT yang ditampilkan sudah sesuai sebelum dipublikasikan.</p>
          )}
        </div>
        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(false) },
            {
              type: 'custom',
              element: (
                <>
                  {data?.publish ? (
                    <Button onClick={handlePublish} variant={'destructive'} disabled={loading}>
                      <MdArchive />
                      Unpublish
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePublish}
                      variant={'outline'}
                      className={'border-primary text-primary hover:text-primary'}
                      disabled={loading}
                    >
                      <MdUpload />
                      Publish
                    </Button>
                  )}
                </>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
