"use client";

import Link from 'next/link'
import { Button, List, ListItem } from "@mui/material";
import { Clock, clockType } from './clock';
import { useState } from 'react';
// import { useLocalStorage } from '@uidotdev/usehooks';

const Clocks = () => {
    // const [clocks, setClocks] = useLocalStorage<clockType[]>("clockData", [])
    const [clocks, setClocks] = useState<clockType[]>( [])
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
            {clocks.map(
                (clock, index) => <Clock
                    key={clock.title + clock.size + clock.filled}
                    clock={clock}
                    setClock={(newClock) => {
                        clocks[index] = newClock;
                        setClocks([...clocks])
                    }}
                />)}
            <Button onClick={() => setClocks([...clocks, { filled: 0, size: 4, title: "New Clock" }])}>Add Clock</Button>
        </div>
    );
}

export default Clocks;