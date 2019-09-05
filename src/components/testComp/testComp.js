import React, { useState } from 'react';

const useTestComp = (label, defaultState) => {
    const [data, setData] = useState(defaultState);

    const id = `temp-${label.replace(" ", "").toLowerCase()}`;
    const CompTestEng = () => (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                console.log(data)
            }}>
                <label htmlFor="testSpot">
                    test form:
                    <input
                        id="testSpot"
                        value={data}
                        placeholder="input"
                        onChange={e => setData(e.target.value)}
                        onBlur={e => setData(e.target.value)}
                    >
                    </input>
                </label>
                <button>Sub</button>
            </form>
        </div>
    )
    return [data, CompTestEng, setData]
}

export default useTestComp;