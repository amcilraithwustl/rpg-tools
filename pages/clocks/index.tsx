import Link from 'next/link'
import { List, ListItem } from "@mui/material";
import Image from 'next/image';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data01 = [
    { name: 'Group C', value: 100, on: false },
    { name: 'Group D', value: 100, on: true },
    { name: 'Group A', value: 100, on: true },
    { name: 'Group B', value: 100, on: true },
];

const Clock = () => {
    const radius = 100;
    const radRatio = .86
    return <div style={{ height: radius * 2, width: radius * 2, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%" style={{ transform: "rotate(-90deg)" }}>
            <PieChart width={100} height={100} >
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={radRatio * radius} fill="#000" >
                    {data01.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.on ? "red" : "white"} stroke={"#000"} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        <img src="/clock_outline.png" alt="clock" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }} />
    </div>
}

export default function Clocks() {
    return (
        <div>
            CLOCKS!
            <List>
                <ListItem>
                    <Link href="/">Home</Link>
                </ListItem>
                <ListItem>
                    <Link href="/clocks">Clocks</Link>
                </ListItem>
            </List>
            <Clock />
        </div>
    );
}
