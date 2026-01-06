import Cookies from 'js-cookie'
import DashboardViewModel from './DashboardViewModel'
import { Link } from 'react-router-dom'

const DashboardView = () => {
  const { data, form } = DashboardViewModel()
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl">
        Selamat Datang, <span className="text-primary">{Cookies.get('profile')}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <Link
            to={item.link}
            style={{
              color: item.bgLabel,
              borderColor: item.bgLabel,
            }}
            className={`border rounded-lg `}
          >
            <div
              style={{
                backgroundColor: item.bg,
              }}
              className={` p-4 h-[120px] rounded-t-lg flex gap-4 items-center `}
            >
              <div className="absolute">{item.icon}</div>
              <div
                style={{
                  color: item.bgLabel,
                }}
                className="w-full text-center text-2xl font-bold"
              >
                {form.watch(item.name)}
              </div>
            </div>
            <div
              style={{
                backgroundColor: item.bgLabel,
              }}
              className={`py-2 px-4 rounded-b-lg text-center bg-[${item.bgLabel}] text-white`}
            >
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardView
