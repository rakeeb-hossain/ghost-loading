import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {Ghost} from "ghost-loading";

const App = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => setCount(count+1), 1000);
    }, [count])

    return (<div>
        {
            [...Array(5).keys()].map(x =>
                <Ghost key={x}
                       style={{width: 500, height: 30, marginBottom: 15, borderRadius: '5px'}}/>
            )
        }
        <Ghost style={{width: 300, height: 300, borderRadius: '300px'}}/>
    </div>)
}

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);