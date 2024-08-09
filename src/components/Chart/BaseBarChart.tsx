import { BarChart, BarChartProps } from '@mantine/charts';

const BaseBarChart = ({ ...props }: BarChartProps) => {
  return (
    <BarChart
      ff={'poppins'}
      withLegend
      legendProps={{ verticalAlign: 'bottom', height: 50 }}
      styles={{
        axisLabel: {
          fontFamily: 'poppins',
        },
        legendItem: {
          fontFamily: 'poppins',
        },
      }}
      {...props}
    />
  );
};

export default BaseBarChart;
