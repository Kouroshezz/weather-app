import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

const TemperatureChart = () => {
  // Access the MUI theme object
  const theme = useTheme();
  const { t } = useTranslation()

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dataValues = [16, 27, 22, 13, 27, 22, 36, 32, 39, 25, 25, 32];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Temperature',
        data: dataValues,
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
          gradient.addColorStop(0, '#4CDFE8');
          gradient.addColorStop(1, '#7947F7');
          return gradient;
        },
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
          gradient.addColorStop(0, '#4CDFE80D');
          gradient.addColorStop(1, '#7947F70D');
          return gradient;
        },
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: ``,
        align: 'start',
        font: {
          size: 20,
          weight: 'bold',
        },
        // Use theme color for the title
        color: theme.palette.text.primary,
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        // Use theme color for x-axis labels
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
      y: {
        min: 10,
        max: 40,
        ticks: {
          stepSize: 10,
          callback: (value) => value + '°C',
          // Use theme color for y-axis labels
          color: theme.palette.text.secondary,
        },
        grid: {
          // Use theme color for the grid lines
          color: theme.palette.divider,
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <>
      <Typography component={'h5'} variant={'h5'}
        sx={(theme) => ({
          color: theme.palette.app.text,
        })}>
        {t('average')}
      </Typography>
      <div style={{
        width: '100%',
        height: '150px',
        // padding: '0 20px 20px 20px',
        backgroundColor: 'transparent',
        borderRadius: '15px'
      }}>
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default TemperatureChart;