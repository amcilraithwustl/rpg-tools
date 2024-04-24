import { Typography } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


export type clockType = { size: number, filled: number, title: string }
export const Clock = ({ clock: { size, filled, title }, setClock }: { clock: clockType, setClock: (arg: clockType) => void }) => {
    const on = { value: 1, on: true };
    const off = { value: 1, on: false }
    const data01 = [...[...new Array(size - filled)].map(() => off), ...[...new Array(filled)].map(() => on)];
    const radius = 80;
    const radRatio = .86
    return <div style={{ width: radius * 2 }}>
        <div style={{ height: radius * 2, width: radius * 2, position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%" style={{ transform: "rotate(-90deg)" }}>
                <PieChart width={100} height={100} >
                    <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={radRatio * radius}  >
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.on ? "#d12317" : "#0000"} stroke={"#888"} onClick={() => setClock({ filled: entry.on ? size-index-1 : size-index, title, size })} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <img src="/clock_outline.png" alt="clock" style={
                {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                }
            } />
        </div>
        <Typography width="100%" textAlign="center">{title}</Typography>
    </div>
}

