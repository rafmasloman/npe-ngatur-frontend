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
        root: {
          fontFamily: 'poppins',
        },
      }}
      classNames={{ root: `h-[300px]`, bar: `w-10` }}
      {...props}
    />
  );
};

export default BaseBarChart;
