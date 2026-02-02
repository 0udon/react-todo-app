import { useState, useEffect } from "react";

const defaultTodoList = [
    {description: "開発する", completed: false},
    {description: "勉強する", completed: true},
];


interface Todo{
    description: string;
    completed: boolean;
}


export function TodoList(){
    const [description, setDescription] = useState<string>("");
    const [todoList, setTodoList] = useState<Todo[]>([]);

    useEffect(() => {
        setTodoList(defaultTodoList);
    }, []);

    const handleKeyDown = (event) =>{
        if (event.key === "Enter" && event.target.value.length > 0){
            console.log(event.target.value);
            const newTodo = {description: event.target.value, completed: false};
            const newTodoList = [newTodo, ...todoList];
            setTodoList(newTodoList);
            setDescription("");
            console.log(newTodoList.length);
        }
    }


    return(
    <>
        <input 
            name = "todoInput" 
            onKeyDown={handleKeyDown}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
        ></input>

        {todoList.length == 0 ? 
        <h3>お疲れさまでした</h3> : <h3>あと{todoList.length}個です</h3>}
        

        <ul>
            {todoList.map((todo, k) => {
                const handleCheck = (event) => {
                    const newTodoList = [...todoList];
                    newTodoList[k].completed = event.target.checked;
                    setTodoList(newTodoList);
                    console.log(newTodoList);
                }

                const handleRemove = () => {
                    const newTodoList = todoList.filter((_, i) => i !=k)
                    setTodoList(newTodoList);
                };

                return(
                    <li key={k}>
                        <label>
                            <input 
                                name="conpleted"
                                type="checkbox"
                                checked={todo.completed}
                                onChange={handleCheck}
                            />
                            {todo.description}
                            <button onClick={handleRemove}>削除</button>
                        </label>
                    </li>
                );
            })}
        </ul>
    </> 
    );
}

