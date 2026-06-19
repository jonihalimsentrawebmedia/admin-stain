import { Button } from '@/components/ui/button.tsx'
import { BiPlus, BiLoader } from 'react-icons/bi'
import { useState, useRef } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FaFileArrowDown } from 'react-icons/fa6'
import { Label } from '@radix-ui/react-label'
import * as XLSX from 'xlsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import AxiosClient from '@/provider/axios'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

const COLUMNS = [
  'ID_PRODI', 'NIM', 'NAMA', 'TEMPAT_LAHIR', 'TANGGAL_LAHIR',
  'ANGKATAN', 'ID_JALUR_MASUK', 'SEMESTER_MASUK', 'ID_STATUS',
  'NIK', 'JENIS_KELAMIN', 'ID_AGAMA', 'HP', 'EMAIL', 'ALAMAT',
  'NAMA_AYAH', 'NAMA_IBU', 'NAMA_WALI',
]

const ButtonImport = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataExcel, setDataExcel] = useState<Record<string, any>[]>([])
  const [fileName, setFileName] = useState('')
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  // Parse Excel file to JSON
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
          HandleReset()
          setOpen(false)
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

  // Reset all state
  const HandleReset = () => {
    setDataExcel([])
    setFileName('')
    setOriginalFile(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        className="rounded-full text-primary border-primary"
        variant="outline"
      >
        <BiPlus />
        Import Data Mahasiswa
      </Button>

      <DialogBasic
        title="Import Data Mahasiswa"
        className="min-w-5xl"
        open={open}
        setOpen={setOpen}
      >
        {/* Download Template */}
        <div className="border-primary border-2 p-4 rounded-lg bg-gray-200">
          <p>
            Agar proses import data berjalan lancar, harap menggunakan format
            excel yang telah disiapkan.
          </p>
          <a href="/example-students.xlsx" download className="text-primary">
            <Button className="text-white">
              <FaFileArrowDown className="text-yellow-500" />
              Download Template
            </Button>
          </a>
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
        </div>

        {dataExcel.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Preview:{' '}
              <span className="font-semibold">{dataExcel.length}</span> data
              ditemukan
              {fileName && (
                <span className="ml-1">
                  dari <span className="font-semibold">{fileName}</span>
                </span>
              )}
            </p>
            <div className="max-h-64 overflow-auto border rounded">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    {COLUMNS.map((col) => (
                      <TableHead
                        key={col}
                        className="text-white whitespace-nowrap"
                      >
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

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              HandleReset()
              setOpen(false)
            }}
          >
            Batal
          </Button>
          <Button
            onClick={HandleSave}
            disabled={loading || dataExcel.length === 0}
          >
            {loading && <BiLoader className="animate-spin mr-1" />}
            Import Data
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonImport
