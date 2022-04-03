import React from "react";

const Counter = props => {
    const{value} = props;
    
    const formatValue = () => {
        return value === 0 ? <h3>empty</h3> : value; 
    };

    const getBageClasses = () => {
        let classes = "badge m-2 ";
        classes += value === 0 ? "bg-warning" : "bg-primary";

        return classes;
    };

    return <div className="container">
        <div className="row">
            <div className="col-sm">
                <span className="h3">{props.name}</span>
            </div>
            <div className="col-sm">
                <span className={getBageClasses()}>{formatValue()}</span>
            </div>
            <div className="col-sm">
                <button 
                    className="btn btn-primary m-2 p-2 px-3" 
                    onClick={()=>props.onIncrement(props.id)}>
                    +
                </button>
            </div>
            <div className="col-sm">
                <button 
                    className="btn btn-primary m-2 p-2 px-3" 
                    onClick={()=>props.onDecrement(props.id)}>
                    - 
                </button>
            </div>
            <div className="col-sm">
                <button 
                    className="btn btn-danger m-2" 
                    onClick={() => props.onDelete(props.id)}>
                    Delete
                </button>
            </div>
        </div>
    </div>;
};

export default Counter;