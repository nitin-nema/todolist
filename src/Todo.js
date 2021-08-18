import React, { useState} from 'react'

function Todo() {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null)
    const addItem = () => {
        if (!inputData) {
            return;
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return {...elem,name: inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        } else {
            const allInputData = {
                id: Math.random()*1000,
                name:inputData
            }
            setItems([...items, allInputData]);
            setInputData('');
        }
    }

    const deleteItem = (id) => {
        const updatedItem = items.filter((elem) => {
            return elem.id !== id;
        });
        setItems(updatedItem);
    }

    const editItem = (id) => {
        let newEditItems = items.find((elem) => {
            return elem.id === id
        });
        setToggleSubmit(false);
        setInputData(newEditItems.name);
        setIsEditItem(id);
    }
    return (
        <>
            <h2 style={{backgroundColor: "green"}}>ToDo List</h2>
            <h4>Add Items</h4>
            <input type="text" placeholder="Add Items..." value={inputData}
                onChange={ (e)=> setInputData(e.target.value)}
            />
            {toggleSubmit ? <button onClick = {addItem}>Add</button> : <button onClick ={addItem}>Edit</button>}
            
            <div>
                <h3>Tasks</h3>
                {items.map((element) =>
                 {
                     
                 return (
                     <div key={element.id}>
                        {element.name}
                         <button style={{ padding: "8px", margin:"8px",color:"green"}} onClick ={()=>editItem(element.id)}>Edit</button>
                         <button style={{padding: "8px", color: "red"}} onClick ={()=>deleteItem(element.id)}>Delete</button>
                     </div>
                 )
                })}
                    
            </div>    
        </>
    )
}

export default Todo;
