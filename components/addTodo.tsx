import { useState } from "react"
import { addTodo } from "../services/todo.service";

export const AddTODO = (props: {addTODO: Function}) => {
    const [todo, setTodo] = useState("");

    const addTodoFunction = async (e: any) => {
        e.preventDefault();
        if(todo.length > 0) {
            try {
                const newToDo = await addTodo(todo, false);
                alert("TODO successfully added");
                props.addTODO({...newToDo, id: newToDo._id});
                setTodo('');
            } catch (error) {
                alert("TODO adding failed");
            }
        }
    }

    return (
        <form onSubmit={(e)=> addTodoFunction(e)} className="mb-8">
            <input id="todo" type="text" autoComplete="todo" value={todo} onChange={(e)=> setTodo(e.target.value)} required className='p-2 border-gray-150 mr-4 border-2 rounded-md'/>
            <button type="submit" className='bg-green-300 rounded-md p-2'>Add</button>
        </form>
    )
}