import { UseGetBankAccountProgram } from '../../hooks/index'
import { ColumnsBankAccount } from '@/pages/modules/Pulsikom/training/list-training/component/bankAccount/columns.tsx'
import { UseGetBankAccount as LinkBank } from '@/pages/modules/Pulsikom/reference/bank-account/hooks'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
import { TableBasicBank } from '@/components/common/table/tableRekening.tsx'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  prev_value: string
  next_value: string
}

const ListBankAccount = (props: Props) => {
  const { prev_value, next_value } = props

  const id = window.localStorage.getItem('id_program')
  const { bankAccount } = UseGetBankAccountProgram(id as string)

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const result: Record<string, boolean> = Object.fromEntries(
      bankAccount.map((item) => [item.id_rekening, true])
    )
    setRowSelection(result)
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
      <p className="text-xl font-semibold text-primary pb-2.5">5. Rekening Penerimaan</p>
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
            },
            {
              type: 'custom',
              element: (
                <Button disabled={loading} onClick={HandleSave}>
                  Lanjutkan <ChevronRight className={'size-4'} />
                </Button>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}

export default ListBankAccount
