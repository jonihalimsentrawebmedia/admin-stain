import { UseGetBankAccountProgram } from '../../hooks/index'
import { ColumnsBankAccount } from '@/pages/modules/Pulsikom/training/list-training/component/bankAccount/columns.tsx'
import { UseGetBankAccount as LinkBank } from '@/pages/modules/Pulsikom/reference/bank-account/hooks'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TableBasicBank } from '@/components/common/table/tableRekening.tsx'
import { useQueryClient } from '@tanstack/react-query'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

interface Props {
  prev_value: string
  next_value: string
  title?: string
}

const ListBankAccount = (props: Props) => {
  const { title, prev_value, next_value } = props

  const id = window.localStorage.getItem('id_program')
  const { bankAccount } = UseGetBankAccountProgram(id as string)
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const navigate = useNavigate()

  useEffect(() => {
    if (bankAccount.length > 0) {
      const result: Record<string, boolean> = Object.fromEntries(
        bankAccount?.map((item) => [item.id_rekening, true])
      )
      setRowSelection(result)
    }
  }, [bankAccount])

  const { bankAccount: list, loading } = LinkBank({
    page: '0',
    limit: '0',
  })
  const columns = ColumnsBankAccount()

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    const selectedIds: string[] = Object.keys(rowSelection)

    await AxiosClient.post(`/pusilkom/program/${id}/rekening`, {
      id_rekening_list: selectedIds,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['status-program'],
          })
          HandleNext()
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || 'Error')
      })
  }

  const [_, setSearchParams] = useSearchParams()

  const HandlePrev = () => {
    const Params = new URLSearchParams()
    Params.append('step', prev_value)
    setSearchParams(Params)
  }

  const HandleNext = () => {
    if (prev_value) {
      const Params = new URLSearchParams()
      Params.append('step', next_value)
      setSearchParams(Params)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-5 mt-[55px]">
        <div className="absolute w-full top-0 left-0 py-2 z-20">
          <ButtonTitleGroup
            label={title ?? ''}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <ButtonGoToGuide
                    titleGuide={`5. Rekening Penerimaan`}
                    valueGuide="PUSILKOM_TRAINING_DAFTAR_TRAINING_FORM_REKENING_PENDAFTARAN"
                  />
                ),
              },
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => navigate('/modules/pulsikom/training/credit-earning/program'),
              },
              {
                type: 'custom',
                element: (
                  <Button disabled={loading} onClick={HandleSave} className={'text-white'}>
                    Lanjutkan <ChevronRight className={'size-4'} />
                  </Button>
                ),
              },
            ]}
          />
        </div>
        <p className="text-xl font-semibold text-primary">5. Rekening Penerimaan</p>
        <TableBasicBank
          className={'pb-2.5'}
          columns={columns as any}
          data={list as any}
          loading={loading}
          rowIdKey="id_rekening"
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />

        <div className="flex items-center justify-between mt-4">
          <Button
            variant={'outline'}
            className={'border-primary text-primary hover:text-primary'}
            onClick={HandlePrev}
          >
            <ArrowLeft className={'size-4'} />
            Persyaratan
          </Button>
          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => navigate('/modules/pulsikom/training/credit-earning/program'),
              },
              {
                type: 'custom',
                element: (
                  <Button disabled={loading} onClick={HandleSave} className={'text-white'}>
                    Lanjutkan <ChevronRight className={'size-4'} />
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default ListBankAccount
