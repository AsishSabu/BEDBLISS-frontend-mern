import React, { useEffect, useState } from "react"
import {
  CardBody,
} from "@material-tailwind/react"
import Chart from "react-apexcharts"
import useSWR from "swr"
import axios from "axios"
import { ADMIN_API } from "../../constants"

// Define the type for the chart data
interface ChartData {
  series: { name: string; data: number[] }[]
  options: {
    chart: {
      toolbar: { show: boolean }
      height: number
    }
    title: { show: boolean }
    dataLabels: { enabled: boolean }
    colors: string[]
    stroke: { lineCap: string; curve: string }
    markers: { size: number }
    xaxis: {
      axisTicks: { show: boolean }
      axisBorder: { show: boolean }
      labels: {
        style: {
          colors: string
          fontSize: string
          fontFamily: string
          fontWeight: number
        }
      }
      categories: string[]
    }
    yaxis: {
      labels: {
        style: {
          colors: string
          fontSize: string
          fontFamily: string
          fontWeight: number
        }
      }
    }
    grid: {
      show: boolean
      borderColor: string
      strokeDashArray: number
      xaxis: { lines: { show: boolean } }
      padding: { top: number; right: number }
    }
    fill: { opacity: number }
    tooltip: { theme: string }
  }
}
const fetcher = (url: string) => axios.get(url).then(res => res.data)
const RevenueChart:React.FC = () => {
  const { data, error } = useSWR(`${ADMIN_API}/bookings`, fetcher)
  console.log(data)

  const [chartData, setChartData] = useState<ChartData>({
    series: [
      {
        name: "Revenue",
        data: [],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        height: 200, // Set height here
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "10px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  })

  useEffect(() => {
    if (data) {
      const now = new Date()
      const currentYear = now.getFullYear()

      // Array to hold total platform fee for each month of the current year
      const monthlyPlatformFee = Array(12).fill(0)

      data.result.forEach((booking:any) => {
        const bookingDate = new Date(booking.createdAt)
        if (bookingDate.getFullYear() === currentYear) {
          const month = bookingDate.getMonth() // getMonth() returns month (0-11)
          monthlyPlatformFee[month] += booking.platformFee
        }
      })

      const categories = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]

      setChartData(prevState => ({
        ...prevState,
        series: [
          {
            name: "Revenue",
            data: monthlyPlatformFee,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories,
          },
        },
      }))
    }
  }, [data])

  if (!data) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <>
    <div className="flex justify-center text-lg pt-2"> Revenue Chart</div>
      <CardBody className="pb-0">
        <Chart {...chartData} />
      </CardBody>
    </>
  )
}

export default RevenueChart
