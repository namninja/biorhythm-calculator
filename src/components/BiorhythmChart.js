import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis } from 'recharts'
import { calculateBiorhythmSeries } from '../lib/biorhythms';



function BiorhythmChart({ birthDate, targetDate }) {
  const series = calculateBiorhythmSeries(birthDate, targetDate, 15)
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={series}>
        <CartesianGrid vertical={false} strokeDasharray="2 4" />
        <XAxis dataKey="date" ticks={[series[3].date, series[15].date, series[27].date]} />
        <ReferenceLine x={series[15].date} />
        <Line dataKey="physical" stroke="green" dot={false} type='natural' />
        <Line dataKey="emotional" stroke="red" dot={false} type='natural' />
        <Line dataKey="intellectual" stroke="blue" dot={false} type='natural' />
      </LineChart>
    </ResponsiveContainer> 
  );
}

export default BiorhythmChart;