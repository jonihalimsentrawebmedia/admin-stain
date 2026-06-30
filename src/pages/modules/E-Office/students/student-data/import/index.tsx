import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import { FaFileArrowDown } from 'react-icons/fa6'
import { BiLoader } from 'react-icons/bi'
import { Label } from '@radix-ui/react-label'
import AxiosClient from '@/provider/axios'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ButtonDataProdi from '@/pages/modules/E-Office/students/student-data/import/buttonSumberData/buttonProdi.tsx'
import ButtonAdmission from '@/pages/modules/E-Office/students/student-data/import/buttonSumberData/buttonAdmission.tsx'
import ButtonDataReligion from '@/pages/modules/E-Office/students/student-data/import/buttonSumberData/ButtonDataReligion.tsx'
import ButtonDataStatus from '@/pages/modules/E-Office/students/student-data/import/buttonSumberData/ButtonDataStatus.tsx'

const COLUMNS = [
  'ID_PRODI',
  'NIM',
  'NAMA',
  'TEMPAT_LAHIR',
  'TANGGAL_LAHIR',
  'ANGKATAN',
  'ID_JALUR_MASUK',
  'SEMESTER_MASUK',
  'ID_STATUS',
  'NIK',
  'JENIS_KELAMIN',
  'ID_AGAMA',
  'HP',
  'EMAIL',
  'ALAMAT',
  'NAMA_AYAH',
  'NAMA_IBU',
  'NAMA_WALI',
]

const ImportStudentData = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [dataExcel, setDataExcel] = useState<Record<string, any>[]>([])
  const [fileName, setFileName] = useState('')
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const HandleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setOriginalFile(file)
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) as Record<string, any>[]
      setDataExcel(rows)
    }
    reader.readAsArrayBuffer(file)
  }

  // Upload file to API
  const HandleSave = async () => {
    if (!originalFile) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', originalFile)

    await AxiosClient.post('/eoffice/mahasiswa/import-excel', formData)
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message || 'Import berhasil')
          queryClient.invalidateQueries({ queryKey: ['student-data'] })
          navigate('/modules/e-office/student/student-data')
        } else {
          toast.error(res?.data?.message || 'Gagal import data')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal import data')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="space-y-5">
      <ButtonTitleGroup
        isBack
        label="Import Data Mahasiswa"
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <Button onClick={HandleSave} disabled={loading || dataExcel.length === 0}>
                {loading && <BiLoader className="animate-spin mr-1" />}
                Import Data
              </Button>
            ),
          },
        ]}
      />

      {/* Download Template */}
      <div className="border-primary border-2 p-4 rounded-lg bg-gray-200">
        <p>
          Agar proses import data berjalan lancar, harap menggunakan format excel yang telah
          disiapkan.
        </p>
        <a href="/example-students.xlsx" download className="text-primary">
          <Button className="text-white">
            <FaFileArrowDown className="text-yellow-500" />
            Download Template
          </Button>
        </a>
      </div>

      <div className={'border-primary border-2 p-4 rounded-lg bg-gray-200"'}>
        <p className="text-2xl font-semibold">Sumber Data</p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <ButtonDataProdi />
          <ButtonAdmission />
          <ButtonDataReligion />
          <ButtonDataStatus />
        </div>
      </div>

      <div>
        <Label htmlFor="file" className="text-primary">
          Upload File Excel
        </Label>
        <input
          className="border-primary border-2 p-2 rounded mt-2 bg-gray-200 w-full"
          type="file"
          id="file"
          ref={fileRef}
          accept=".xlsx, .xls"
          onChange={HandleImport}
        />
        {fileName && (
          <p className="text-sm text-muted-foreground mt-1">
            File terpilih: <span className="font-semibold">{fileName}</span>
          </p>
        )}
      </div>

      {dataExcel.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Preview: <span className="font-semibold">{dataExcel.length}</span> data ditemukan
            {fileName && (
              <span className="ml-1">
                dari <span className="font-semibold">{fileName}</span>
              </span>
            )}
          </p>
          <div className="max-h-96 overflow-auto border rounded">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  {COLUMNS.map((col) => (
                    <TableHead key={col} className="text-white whitespace-nowrap">
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataExcel.map((row, i) => (
                  <TableRow key={i}>
                    {COLUMNS.map((col) => (
                      <TableCell key={col} className="text-xs">
                        {row[col] ?? '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => navigate('/modules/e-office/student/student-data')}
        >
          Batal
        </Button>
        <Button onClick={HandleSave} disabled={loading || dataExcel.length === 0}>
          {loading && <BiLoader className="animate-spin mr-1" />}
          Import Data
        </Button>
      </div>
    </div>
  )
}

export default ImportStudentData
