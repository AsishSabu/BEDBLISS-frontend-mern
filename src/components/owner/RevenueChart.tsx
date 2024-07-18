import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useFetchData } from "../../utils/fetcher";
import { USER_API } from "../../constants";

// Define the type for the chart data
interface ChartData {
  series: { name: string; data: number[] }[];
  options: {
    chart: {
      toolbar: { show: boolean };
      height: number;
    };
    title: { show: boolean };
    dataLabels: { enabled: boolean };
    colors: string[];
    stroke: { lineCap: string; curve: string };
    markers: { size: number };
    xaxis: {
      axisTicks: { show: boolean };
      axisBorder: { show: boolean };
      labels: {
        style: {
          colors: string;
          fontSize: string;
          fontFamily: string;
          fontWeight: number;
        };
      };
      categories: string[];
    };
    yaxis: {
      labels: {
        style: {
          colors: string;
          fontSize: string;
          fontFamily: string;
          fontWeight: number;
        };
      };
    };
    grid: {
      show: boolean;
      borderColor: string;
      strokeDashArray: number;
      xaxis: { lines: { show: boolean } };
      padding: { top: number; right: number };
    };
    fill: { opacity: number };
    tooltip: { theme: string };
  };
}

const RevenueChart = () => {
  const { data, isError: error } = useFetchData<any>(USER_API + "/wallet");
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
        height: 240,  // Set height here
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
  });

  useEffect(() => {
    if (data) {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const currentDate = now.getDate();

      // Array to hold daily revenue for the current month
      const dailyRevenue = Array(currentDate).fill(0);

      data.transaction.forEach((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        if (
          transactionDate.getFullYear() === currentYear &&
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getDate() <= currentDate
        ) {
          const day = transactionDate.getDate() - 1; // getDate() returns day of the month (1-31)
          const amount = transaction.amount;
          if (transaction.type === "Credit") {
            dailyRevenue[day] += amount;
          } else if (transaction.type === "Debit") {
            dailyRevenue[day] -= amount;
          }
        }
      });

      const categories = Array.from({ length: currentDate }, (_, i) => `${i + 1}`);

      setChartData((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Revenue",
            data: dailyRevenue.slice(0, currentDate),
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories,
          },
        },
      }));
    }
  }, [data]);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        variant="filled"
        color="transparent"
        className="flex flex-col gap-4 h-8 rounded-lg md:flex-row md:items-center"
      >

        <div>
          <Typography variant="h3" color="blue-gray">
            Revenue Chart
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="pb-0">
        <Chart {...chartData} />
      </CardBody>
    </Card>
  );
};

export default RevenueChart;