import React, { useEffect, useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react"
import Chart from "react-apexcharts"
import { useFetchData } from "../../utils/fetcher"
import { OWNER_API } from "../../constants"

const BookingChart: React.FC = () => {
  const [bookingData, setBookingData] = useState([])
  const { data } = useFetchData<any>(OWNER_API + "/bookings")

  useEffect(() => {
    if (data && data.success) {
      setBookingData(data.bookings)
    }
  }, [data])

  // Function to count bookings per day for the current month
  const countBookingsPerDay = () => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1 // January is 0, so add 1
    const bookingsPerDay = new Array(31).fill(0) // Initialize array for 31 days (could be less for some months)

    bookingData.forEach((booking: any) => {
      const updatedAt = new Date(booking.updatedAt)
      if (updatedAt.getMonth() + 1 === currentMonth) {
        const day = updatedAt.getDate() - 1 // Get day index (0-indexed)
        bookingsPerDay[day] += 1 // Increment count for that day
      }
    })

    return bookingsPerDay
  }

  const chartConfig = {
    type: "bar",
    height: 348,
    series: [
      {
        name: "Bookings",
        data: countBookingsPerDay(),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "50%",
          endingShape: "rounded",
        },
      },
      xaxis: {
        categories: Array.from({ length: 31 }, (_, i) => i + 1), // Days of the current month
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Number of Bookings",
          style: {
            fontSize: "14px",
          },
        },
        labels: {
          style: {
            fontSize: "10px",
          },
        },
      },
      grid: {
        borderColor: "#e0e0e0",
        strokeDashArray: 3,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        theme: "dark",
        x: { show: false },
      },
    },
  }

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col h-8 rounded-lg gap-4 md:flex-row md:items-center"
      >
        <div>
          <Typography variant="h3" color="blue-gray">
            Booking Chart
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart
          options={chartConfig.options}
          series={chartConfig.series}
          type={"bar"}
          height={chartConfig.height}
        />
      </CardBody>
    </Card>
  )
}

export default BookingChart
