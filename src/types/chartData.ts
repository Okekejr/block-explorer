import { PointOptionsObject } from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface chartData {
  prices?: (number[] | null)[] | null;
  market_caps?: (number[] | null)[] | null;
  total_volumes?: (number[] | null)[] | null;
}

export type SeriesData =
  | (number | [string | number, number | null] | PointOptionsObject | null)[]
  | undefined;

export interface ChartProps extends HighchartsReact.Props {
  _height?: number | null;
  _width?: number | null;
  data?: chartData["prices"] | null;
  chartTitle?: string | null;
  chartName?: string | null;
}
