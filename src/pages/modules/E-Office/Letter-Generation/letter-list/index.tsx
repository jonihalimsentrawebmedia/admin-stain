import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetListLetterGenerate } from '@/pages/modules/E-Office/Letter-Generation/letter-list/hooks'
import { ColumnsLetterGenerate } from '@/pages/modules/E-Office/Letter-Generation/letter-list/data/columns.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { cn } from '@/lib/utils.ts'
import { TabsContent } from '@radix-ui/react-tabs'
import { TableBasicState } from '@/components/common/table/tableUsestate.tsx'
import Search from '@/components/common/table/Search.tsx'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import TablePaginate from '@/components/common/table/TablePagination.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { UseGetCodeAvailableLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/hooks'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'

const TABS_STATUS = [
  { value: 'MENUNGGU', label: 'Menunggu' },
  { value: 'DIPROSES', label: 'Diproses' },
  { value: 'SELESAI', label: 'Selesai' },
  { value: 'DIBATALKAN', label: 'Dibatalkan' },
  { value: 'DIHAPUS', label: 'Dihapus' },
] as const

const ListLetterGeneratePage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const status = searchParams.get('status') ?? 'MENUNGGU'
  const id_template = searchParams.get('id_template') ?? ''

  const [selected, setSelected] = useState<string[]>([])
  const { codeAvailable } = UseGetCodeAvailableLetter({
    is_existing: true,
  })

  const name = codeAvailable?.find((row) => row.id_mail_jenis_template_surat === id_template)?.nama

  const { letterTypeGenerate, meta, loading } = UseGetListLetterGenerate({
    page,
    limit,
    search,
    status: status as any,
    id_template: id_template,
  })

  const columns = ColumnsLetterGenerate(name)
  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    if (!('page' in updates)) {
      params.set('page', '1')
    }
    setSearchParams(params.toString())
  }

  const queryClient = useQueryClient()
  const HandleStatusBulks = async (value: string) => {
    await AxiosClient.patch('/eoffice/mail-surat/status', {
      ids: [...selected],
      status: value,
    })
      .then((res) => {
        if (res?.data?.status) {
          setSelected([])
          updateParams({ page: '1' })
          toast.success(res?.data?.message || 'Berhasil mengubah status surat')
          queryClient.invalidateQueries({
            queryKey: ['letter-generate'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal mengubah status surat')
      })
  }

  return (
    <div className="space-y-4">
      <ButtonTitleGroup
        label="Data Surat"
        buttonGroup={[
          {
            type: 'add',
            label: 'Buat Surat',
            onClick: () => navigate('/modules/e-office/letter-generation/create-letter'),
          },
        ]}
      />

      <Tabs
        value={status}
        onValueChange={(e) => {
          updateParams({ status: e, page: '1' })
          setSelected([])
        }}
      >
        <TabsList className="w-full h-full bg-white rounded-none">
          {TABS_STATUS.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                'rounded-t-lg data-[state=active]:bg-primary data-[state=active]:text-white',
                'rounded-b-none'
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS_STATUS.map((item) => (
          <TabsContent key={item.value} value={item.value} className="mt-4">
            <div className="flex items-center justify-between bg-white p-3 rounded-md border mb-3">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Show</p>
                <SelectBasic
                  value={limit}
                  onChange={(e) => updateParams({ limit: e, page: '1' })}
                  placeholder="Limit"
                  data={[
                    { label: '10', value: '10' },
                    { label: '25', value: '25' },
                    { label: '50', value: '50' },
                    { label: '100', value: '100' },
                  ]}
                />
                <span className="text-sm text-gray-600">Data</span>
              </div>
              <div className="flex items-center gap-4">
                <FilterSelect
                  placeholder={'Pilih Jenis Surat'}
                  className={'w-[300px]'}
                  selectClassName={'w-[300px]'}
                  data={
                    codeAvailable?.map((row) => ({
                      label: row.nama,
                      value: row.id_mail_jenis_template_surat,
                    })) ?? []
                  }
                  name={'id_template'}
                />
                <Search
                  className="w-72"
                  innerClassName="p-1.5 text-sm w-full bg-white focus:outline-none"
                  position="end"
                  onSearch={(e) => updateParams({ search: e })}
                />
              </div>
            </div>

            <div className="flex items-center justify-end mb-4 gap-2">
              {status === 'DIPROSES' && selected.length > 0 && (
                <Button
                  className={'rounded-full text-white'}
                  onClick={async () => {
                    await HandleStatusBulks('SELESAI')
                  }}
                >
                  Selesaikan ({selected.length})
                </Button>
              )}
              {status === 'MENUNGGU' && selected.length > 0 && (
                <Button
                  className={'rounded-full text-white'}
                  onClick={async () => {
                    await HandleStatusBulks('DIPROSES')
                  }}
                >
                  Proses ({selected.length})
                </Button>
              )}
              {status !== 'DIBATALKAN' && status !== 'DIHAPUS' && selected.length > 0 && (
                <Button
                  variant={'destructive'}
                  className={'rounded-full text-white'}
                  onClick={async () => {
                    await HandleStatusBulks('DIBATALKAN')
                  }}
                >
                  Dibatalkan ({selected.length})
                </Button>
              )}
            </div>

            {/* Table */}
            {id_template ? (
              <>
                <div className="bg-white rounded-md border overflow-hidden">
                  <TableBasicState
                    rowIdKey={'id'}
                    selected={selected}
                    onSelectedRowsChange={(e) => {
                      setSelected(e)
                    }}
                    columns={columns}
                    data={letterTypeGenerate}
                    loading={loading}
                    thClassName="bg-primary text-white font-semibold text-sm"
                    tdClassName="py-3"
                  />
                </div>

                {meta && (
                  <div className="mt-3">
                    <TablePaginate
                      length={meta?.total}
                      meta={meta}
                      setPage={(e) => updateParams({ page: e })}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-blue-500 text-lg font-semibold">
                  Pilih Jenis Surat untuk melihat data
                </p>
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default ListLetterGeneratePage
