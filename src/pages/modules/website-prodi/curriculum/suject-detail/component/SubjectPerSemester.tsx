import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddSubject } from '@/pages/modules/website-prodi/curriculum/suject-detail/component/buttonAdd.tsx'
import { UseGetSubjectDetail } from '@/pages/modules/website-prodi/curriculum/suject-detail/hooks'
import { ColumnsSubject } from '@/pages/modules/website-prodi/curriculum/suject-detail/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const SubjectPerSemester = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tahun = searchParams.get('tahun') ?? ''
  const semesterParam = searchParams.get('semester') ?? ''

  const { id } = useParams()

  const { subjectList, loading } = UseGetSubjectDetail({
    id: id ?? '',
    tahun: tahun !== 'other' ? tahun : '',
    semester:
      tahun !== 'other'
        ? Number(semesterParam) % 2 === 0
          ? 'GENAP'
          : 'GANJIL'
        : (semesterParam.toUpperCase() as any),
    type: tahun !== 'other' ? 'WAJIB' : 'PILIHAN',
  })
  const columns = ColumnsSubject()

  const semesterData = useMemo(() => {
    const year = parseInt(tahun)
    const start = (year - 1) * 2 + 1

    if (isNaN(year)) {
      return Array.from({ length: 2 }).map((_, i) => {
        const val = i % 2 === 0 ? 'Ganjil' : 'Genap'
        return {
          value: val,
          name: `Semester ${val}`,
        }
      })
    } else {
      return Array.from({ length: 2 }).map((_, i) => {
        const semester = start + i
        return {
          value: `${semester}`,
          name: `Semester ${semester} / ${semester % 2 !== 0 ? 'Ganjil' : 'Genap'}`,
        }
      })
    }
  }, [tahun])

  useEffect(() => {
    if (semesterData.length > 0 && !semesterParam) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        params.set('semester', semesterData[0].value)
        return params
      })
    }
  }, [semesterData, semesterParam, setSearchParams])

  return (
    <div>
      <Tabs
        value={semesterParam}
        onValueChange={(value) => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            params.set('semester', value)
            return params
          })
        }}
        className="w-full"
      >
        <TabsList className="w-full rounded bg-white border-b-black border border-t-0 border-l-0">
          {semesterData.map((item) => (
            <TabsTrigger
              className={`
                  data-[state=active]:bg-black data-[state=active]:text-white
                  rounded-t-lg rounded-b-none p-4
              `}
              key={item.value}
              value={item.value}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {semesterData.map((item) => (
          <TabsContent key={item.value} value={item.value} className={'flex flex-col gap-5 mt-5'}>
            <ButtonTitleGroup
              label={item?.name}
              buttonGroup={[{ type: 'custom', element: <ButtonAddSubject /> }]}
            />

            <TableCustom data={subjectList} columns={columns} loading={loading} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
