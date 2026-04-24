import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/component/buttonAdd.tsx'
import { ColumnsBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ReferenceBankAccount = () => {
  const { bankAccount, loading, meta } = UseGetBankAccount()
  const columns = ColumnsBankAccount()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label="Daftar Rekening"
          buttonGroup={[
             {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide={'Daftar Rekening'} valueGuide="PUSILKOM_DAFTAR_REKENING" />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddBankAccount />,
            },
          ]}
        />

        <TableCustom data={bankAccount} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
