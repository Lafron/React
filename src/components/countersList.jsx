import React,{useState} from "react";
import Counter from "./counter";

const CountersList = () => {
    const initialState = [
        {id: 0, value: 0, name: "Не нужная вещь"},
        {id: 1, value: 4, name: "Ложка", price: "200"}, 
        {id: 2, value: 2, name: "Вилка"},
        {id: 3, value: 0, name: "Тарелка"},
        {id: 4, value: 0, name: "Набор минималиста"},
    ];

    const [counters, setCounters] = useState(initialState);

    const handleDelete = id => {
        let newCounters = counters.filter(c => c.id !== id);
        setCounters(newCounters);
    };

    const handleReset = () => {
        setCounters(initialState);
    };

    const handleIncrement = id => {
        let newCounterValue = counters.map(count=>{
            if(count.id===id){
                ++count.value;
            }
            return count;
        });

        setCounters(newCounterValue);
    }; 

    const handleDecrement = id => {
        let newCounterValue = counters.map(count=>{
            if(count.id===id && count.value>0){
                --count.value;
            }
            return count;
        });

        setCounters(newCounterValue);

    }; 

    return <div>
        {counters.map(count => 
            (<Counter 
                key={count.id} 
                {...count} 
                onDelete={handleDelete}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
            />))
        }
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <button 
                        className="btn btn-primary mt-4" 
                        onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    </div>
};

export default CountersList;