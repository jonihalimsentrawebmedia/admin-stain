'use client'

import { PieChart, Pie, Tooltip,  ResponsiveContainer, Cell } from 'recharts'

type DataItem = {
  name: string
  value: number
}

// const data: DataItem[] = [
//   { name: "DITOLAK", value: 2 },
//   { name: "SEBAGIAN", value: 0 },
//   { name: "KESELURUHAN", value: 0 },
// ];
interface Props {
  data: DataItem[]
  colors: string[]
}
export default function BasicPieChart({ data, colors }: Props) {
  const total = data.reduce((acc, item) => acc + item.value, 0)
  return (
    <div style={{ width: '100%', height:400  }} className="relative">
      <ResponsiveContainer>
        <PieChart height={200}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index] || '#fdfdfd'} />
            ))}
          </Pie>

          <Tooltip />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute bottom-0 w-full">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(0)

          return (
            <div
              key={item.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
                fontSize: 14,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: colors[index],
                    display: 'inline-block',
                  }}
                />
                <span>{item.name}</span>
              </div>

              <span className='text-primary' style={{ fontWeight: 600 }}>
                {item.value} ({percentage}%)
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
