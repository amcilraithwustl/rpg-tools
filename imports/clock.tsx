import { Divider, Grid, Menu, MenuItem, TextField, useTheme } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// eslint-disable-next-line @next/next/no-img-element
const img = <img src="https://raw.githubusercontent.com/amcilraithwustl/rpg-tools/main/public/clock_outline.png" alt="clock" style={
    {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        pointerEvents: 'none',
    }
} />

export type clockType = { size: number, filled: number, title: string, uuid: string, color: string }
export const Clock = ({ clock: { size, filled, title, ...clock }, setClock, deleteClock }: { clock: clockType, setClock: (arg: clockType) => void, deleteClock: () => void }) => {
    const on = { value: 1, on: true };
    const off = { value: 1, on: false }
    const data01 = [...[...new Array(size - filled)].map(() => off), ...[...new Array(filled)].map(() => on)];
    const radius = 80;
    const radRatio = .86
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);
    const theme = useTheme();
    return <Grid item style={{ width: radius * 2 }} sx={{ margin: 1 }}>
        <div style={{ height: radius * 2, width: radius * 2, position: "relative" }}
            onContextMenu={event => {
                event.preventDefault();
                setContextMenu(
                    contextMenu === null
                        ? {
                            mouseX: event.clientX + 2,
                            mouseY: event.clientY - 6,
                        }
                        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                        // Other native context menus might behave different.
                        // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                        null,
                );
            }}>
            <ResponsiveContainer width="100%" height="100%" style={{ transform: "rotate(-90deg)" }}  >
                <PieChart width={100} height={100}

                >
                    <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={radRatio * radius} isAnimationActive={false}  >
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.on ? clock.color : "#0000"} stroke={grey[700]} strokeWidth={2} style={{ outline: 'none' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.bubbles = false;
                                    setClock({
                                        filled: size - index === filled ? size - index - 1 : size - index,
                                        title,
                                        size,
                                        ...clock
                                    });
                                }}
                                onDrag={e => console.log(e.movementX)}

                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            {img}
            <Menu
                open={contextMenu !== null}
                onClose={() => setContextMenu(null)}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                {[3, 4, 6, 8, 12].map(n => <MenuItem key={n}
                    onClick={() => {
                        setClock({ size: n, filled, title, ...clock });
                        setContextMenu(null);
                    }}
                >{n}</MenuItem>)}
                <Divider />
                {([
                    ["gray", grey[600]],
                    ["red", red[600]],
                    ["green", green[600]],
                ] as const).map(([name, color]) =>
                    <MenuItem key={color} onClick={() => { setContextMenu(null); setClock({ title, size, filled, ...clock, color }) }} >{name}</MenuItem>)}
                <Divider />
                <MenuItem onClick={() => {
                    const yes = confirm("Are you sure you want to delete this clock?");
                    if (!yes) return;
                    deleteClock();
                    setContextMenu(null);
                }}>Delete</MenuItem>
            </Menu>
        </div>
        <TextField value={title} onChange={(v) => {
            v.preventDefault();
            setClock({ size, filled, title: v.target.value, ...clock })
        }} />
    </Grid>
}
