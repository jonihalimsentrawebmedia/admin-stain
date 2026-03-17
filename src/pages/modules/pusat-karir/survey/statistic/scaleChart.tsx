import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type DataItem = {
  id_item_jawaban: string
  judul_item_jawaban: string
  jumlah_jawaban: number
  persentase: number
}

interface Props {
  data: DataItem[]
}

export default function ScaleChart({ data }: Props) {
  return (
    <div className="w-full h-[250px] bg-gray-100 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="judul_item_jawaban" />
          <YAxis allowDecimals={false} />
          <Tooltip />

          <Bar dataKey="jumlah_jawaban" radius={[4, 4, 0, 0]} className={'fill-primary'}>
            <LabelList dataKey="jumlah_jawaban" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Label bawah */}
      <div className="flex justify-between text-sm mt-2 px-2">
        <span>Sangat Buruk</span>
        <span>Sangat Baik</span>
      </div>
    </div>
  )
}
