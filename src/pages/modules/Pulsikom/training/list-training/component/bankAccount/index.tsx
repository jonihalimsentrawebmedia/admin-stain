import { UseGetBankAccount } from '../../hooks/index'
import { ColumnsBankAccount } from '@/pages/modules/Pulsikom/training/list-training/component/bankAccount/columns.tsx'
import { UseGetBankAccount as LinkBank } from '@/pages/modules/Pulsikom/reference/bank-account/hooks'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'
import { useEffect, useState } from 'react'

const ListBankAccount = () => {
  const id = window.localStorage.getItem('id_training')
  const { bankAccount } = UseGetBankAccount(id as string)

  const [idSelected, setIdSelected] = useState<string[]>([])

  useEffect(() => {
    setIdSelected(['758b339f-3563-4c33-8319-06fc2cb71f4c'])
  }, [])

  console.log(idSelected)
  console.log(bankAccount)

  const { bankAccount: list, loading } = LinkBank()
  const columns = ColumnsBankAccount()

  return (
    <>
      <TableBasic
        columns={columns as any}
        data={list as any}
        loading={loading}
        rowIdKey={'id_rekening'}
        onSelectedRowsChange={setIdSelected}
      />
    </>
  )
}

export default ListBankAccount
