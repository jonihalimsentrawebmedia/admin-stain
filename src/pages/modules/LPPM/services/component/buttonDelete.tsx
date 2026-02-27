import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import AxiosClient from "@/provider/axios.tsx";
import {toast} from "react-toastify";
import {DialogCustom} from "@/components/common/dialog/DialogCustom.tsx";
import type {IServices} from "../data/types.tsx";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FaTrash} from "react-icons/fa";

interface Props {
  data: IServices
}

export const ButtonDeleteService = (props: Props) => {
  const {data} = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleAddService = async () => {
    setLoading(true)
    await AxiosClient.delete(`/lppm/layanan/${data.id_layanan}`).then((res) => {
      if (res.data.status) {
        setOpen(false)
        setLoading(false)
        queryClient.invalidateQueries({
          queryKey: ['services'],
        })
      }
    }).catch((err) => {
      setLoading(false)
      toast.error(err?.response?.data?.message || 'Gagal tambah data')
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'p-1.5 rounded text-white bg-red-500 hover:bg-red-600'}
      >
        <FaTrash/>
      </button>

      <DialogCustom className={'rounded max-w-4xl'} title={'Tambah Layanan'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p>Nama Layanan</p>
          <p>{data?.nama_layanan}</p>
          <p>URL</p>
          <p>{data?.url}</p>
          <p>Posisi Aktif</p>
          <div className={'flex gap-2 items-center'}>
            <input className={'size-4 rounded'} type="checkbox" readOnly checked={data?.posisi_header}/>
            <p>Header</p>
            <input className={'size-4 rounded'} type="checkbox" readOnly checked={data?.posisi_bawah_landing}/>
            <p>Bawah Landing</p>
            <input className={'size-4 rounded'} type="checkbox" readOnly checked={data?.posisi_footer}/>
            <p>Footer</p>
          </div>
          <p>Urutan</p>
          <p>{data?.urutan}</p>
        </div>

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
                <Button
                  variant={"destructive"}
                  onClick={HandleAddService}
                  disabled={loading}
                >
                  <FaTrash/>
                  Hapus
                </Button>
              )
            }
          ]}
        />
      </DialogCustom>
    </>
  )

}
