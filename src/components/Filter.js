import React from 'react';

const Filter = (props)=>{
    return(
        <div className="filter">
            <select onChange={props.filter}>
                <option value="most">Order by</option>
                <option value="most">Most Voted</option>
                <option value="less">Less Voted</option>
            </select>
        </div>
    )
}

export default Filter;