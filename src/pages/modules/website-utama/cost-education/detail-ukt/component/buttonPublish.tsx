import { MdArchive, MdUpload } from 'react-icons/md'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import type { EntranceUkt } from '@/pages/modules/website-utama/cost-education/detail-ukt/data/types.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  data: EntranceUkt
  nama_prodi: string
  nama_fakultas: string
}

export const ButtonPublish = (props: Props) => {
  const { data, nama_prodi, nama_fakultas } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.patch(
      `/website-utama/biaya-pendidikan-ukt/jalur-masuk/${data?.id_ukt_jalur_masuk}/publish`
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['list_price_ukt'],
          })
          toast.success(res.data.message || 'Success Publish UKT')
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
        <Button
          variant={'outline'}
          className={'border-yellow-500 text-yellow-500 hover:text-yellow-500'}
          onClick={() => setOpen(!open)}
        >
          <MdArchive />
          UnPublish
        </Button>
      ) : (
        <Button
          variant={'outline'}
          className={'border-primary text-primary hover:text-primary'}
          onClick={() => setOpen(!open)}
        >
          <MdUpload />
          Publish
        </Button>
      )}

      <DialogBasic
        title={data?.publish ? 'Unpublish UTK' : 'Publish UKT'}
        open={open}
        setOpen={setOpen}
        className={'lg:max-w-2xl'}
      >
        {data?.publish ? (
          <p>
            Apakah Anda yakin ingin membatalkan publikasi informasi UKT Program Studi S1{' '}
            {nama_prodi}, ${nama_fakultas}, Jalur Masuk {data?.nama_jalur_masuk} ?
          </p>
        ) : (
          <p>
            Publikasikan UKT Program Studi {nama_prodi}, {nama_fakultas}, Jalur Masuk{' '}
            {data?.nama_jalur_masuk}?
          </p>
        )}
        {data?.publish ? (
          <p>Data UKT akan disembunyikan dari website.</p>
        ) : (
          <p>Pastikan nominal UKT yang ditampilkan sudah sesuai sebelum dipublikasikan.</p>
        )}

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => setOpen(false),
            },
            {
              type: 'custom',
              element: (
                <>
                  {data?.publish ? (
                    <Button disabled={loading} onClick={HandleSave} variant={'destructive'}>
                      <MdArchive /> Ya, Unpublishkan
                    </Button>
                  ) : (
                    <Button disabled={loading} onClick={HandleSave}>
                      <MdUpload /> Ya, Publish
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
