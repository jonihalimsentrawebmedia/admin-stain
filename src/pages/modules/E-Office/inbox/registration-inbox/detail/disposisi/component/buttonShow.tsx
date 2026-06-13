import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/data/types.ts'
import { format } from 'date-fns'
import { RiOrganizationChart } from 'react-icons/ri'

interface props {
  data?: IInbox
}

export const ButtonShowDisposition = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'rounded border-primary text-primary hover:text-primary'}
      >
        <RiOrganizationChart />
        Alur Disposisi
      </Button>

      <DialogBasic title={'Alur Disposisi'} open={open} setOpen={setOpen} className={'min-w-3xl'}>
        <div className={'flex items-center gap-4 p-4 bg-blue-100 rounded rounded'}>
          <img
            src={data?.gambar_user_created}
            alt="gambar_user_created"
            className="w-14 h-14 object-cover rounded-full"
          />
          <p className={'font-semibold'}>{data?.nama_user_created}</p>
        </div>
        <div className={'flex flex-col gap-4'}>
          <p className="text-gray-500">Diketahui</p>
          {data?.pejabat?.map((row, index) => (
            <div
              key={index}
              className={'flex items-center gap-2 bg-blue-50 p-4 rounded-lg shadow flex-col'}
            >
              <div className="flex items-center gap-4 justify-start w-full">
                <img
                  src={row?.gambar_sdm ?? '/img/noimg.png'}
                  alt="gambar sdm"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p>{row?.nama_sdm}</p>
                  <p>{row?.list_disposisi?.[0] ?? '-'}</p>
                </div>
              </div>
              <div className={'bg-gray-300 h-[1px] w-full'} />
              <div className={'w-full flex flex-col items-start'}>
                <p>Dikirim: {row?.dikirim_at ? format(row?.dikirim_at, 'dd/MM/yyyy') : ''}</p>
                <div className="flex items-center justify-between w-full">
                  <p>Dibaca: {row?.dibaca_at ? format(row?.dibaca_at, 'dd/MM/yyyy') : ''}</p>
                  <p>
                    Diresponse: {row?.direspon_at ? format(row?.direspon_at, 'dd/MM/yyyy') : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogBasic>
    </>
  )
}
