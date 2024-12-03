import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  categoryScores: {
    category: string;
    score: {
      analytical: number;
      creative: number;
      collaborative: number;
      practical: number;
    };
    total: number;
  }[];
}

export default function RadarChart({ categoryScores }: RadarChartProps) {
  const categories = categoryScores.map(({ category }) => category);
  const analyticalScores = categoryScores.map(({ score, total }) => 
    (score.analytical / total) * 100
  );
  const creativeScores = categoryScores.map(({ score, total }) => 
    (score.creative / total) * 100
  );
  const collaborativeScores = categoryScores.map(({ score, total }) => 
    (score.collaborative / total) * 100
  );
  const practicalScores = categoryScores.map(({ score, total }) => 
    (score.practical / total) * 100
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Analytical',
        data: analyticalScores,
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
      },
      {
        label: 'Creative',
        data: creativeScores,
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 2,
      },
      {
        label: 'Collaborative',
        data: collaborativeScores,
        backgroundColor: 'rgba(22, 163, 74, 0.2)',
        borderColor: 'rgba(22, 163, 74, 1)',
        borderWidth: 2,
      },
      {
        label: 'Practical',
        data: practicalScores,
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="w-full aspect-square max-w-2xl mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
}