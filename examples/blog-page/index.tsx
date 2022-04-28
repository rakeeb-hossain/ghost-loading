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
                <div key={count+x}>
                    <Ghost id={(count+x).toString()} style={{width: 650, height: 30, marginBottom: 15, borderRadius: '5px'}}/>
                    <span>{count+x}</span>
                </div>
            )
        }
        <div>
            <Ghost style={{width: 300, height: 300, borderRadius: '300px', display: "inline-block"}}/>
            <Ghost style={{marginLeft: 50, width: 300, height: 300, borderRadius: '100px', display: "inline-block"}}/>
        </div>
    </div>)
}

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);