import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import createSingletonState from "ghost-loading";

const [useLeader,getLeader,setLeader] = createSingletonState<number | undefined>(undefined);

const Test = (props: {id: number, key: number}) => {
    const leader = useLeader();

    // Leader election test
    useEffect(() => {
        console.log(props.id)
        const curr = getLeader();
        if (curr !== undefined) return;
        console.log(`set leader to ${props.id}`)
        setLeader(props.id);
        setTimeout(() => setLeader(undefined), 5000);
    }, [leader])

    return (null)
}

const App = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => setCount(count+1), 5000);
    }, [count])

    return (<div>
        {
            [...Array(5).keys()].map(x => <Test id={x+count} key={x+count}/>)
        }
    </div>)
}

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);