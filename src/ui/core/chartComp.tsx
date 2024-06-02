import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useRef } from "react";
import { ChartProps, SeriesData } from "@/types";

export const PageChart = ({
  chartName,
  chartTitle,
  _height,
  _width,
  subTitle,
  data,
  ...rest
}: ChartProps) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const properties = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", properties);

  const options: Highcharts.Options = {
    chart: {
      zooming: {
        type: "x",
      },
      height: _height,
      width: _width,
      backgroundColor: "transparent",
    },

    plotOptions: {
      series: {
        showInNavigator: true,
      },
    },

    navigator: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },

    title: {
      text: chartTitle || "",
      align: "left",
      style: {
        color: "#fff",
        fontSize: "12.8px",
        fontFamily: "Circular Std Book",
      },
    },

    subtitle: {
      text: subTitle || "",
      align: "left",
      style: {
        color: "#fff",
        fontSize: "12.8px",
        fontFamily: "Circular Std Book",
      },
    },

    legend: {
      enabled: false,
    },

    xAxis: {
      labels: {
        enabled: false,
      },
    },

    yAxis: {
      labels: {
        formatter: function () {
          return numberFormat.format(Number(this.value));
        },
      },
      gridLineWidth: 0,
      title: {
        text: undefined,
      },
      opposite: false,
    },

    tooltip: {
      formatter: function () {
        let timestamp = this.x;
        const newDate = new Date(Number(timestamp));
        const day = newDate.toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          weekday: "long",
          year: "numeric",
        });
        return [day].concat(
          this.points
            ? this.points.map(function (point) {
                return (
                  point.series.name +
                  ": " +
                  numberFormat.format(Number(point.y))
                );
              })
            : []
        );
      },
      split: true,
      valueDecimals: 3,
    },

    rangeSelector: {
      inputEnabled: false,
      buttonTheme: {
        // styles for the buttons
        fill: "none",
        stroke: "none",
        "stroke-width": 0,
        r: 8,
        width: 38,
        style: {
          color: "#039",
          fontWeight: "bold",
        },
      },
      buttons: [
        {
          type: "all",
          text: "Reset",
        },
      ],
      selected: 1,
    },

    series: [
      {
        name: chartName || "",
        type: "spline",
        data: data as SeriesData,
        color: "#c7c7c7",
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        {...rest}
      />
    </>
  );
};
