import { useState } from "react"
import { todoItem } from "../pages";
import { deleteTodo, updateTodo } from "../services/todo.service";

export const OneTODO = ( props : {index: number, todo: todoItem, edit: Function, delete: Function, updateCompleteTodo: Function}) => {
    const [isEditable, setisEditable] = useState(false);
    const [todo, settodo] = useState(props.todo.name);

    const editTodo = async (e: any) => {
        e.preventDefault();
        if(todo !== props.todo.name){
            try {
                const res = await updateTodo(props.todo.id, todo, props.todo.completed);
                if(res.modifiedCount > 0){
                    alert("TODO updated successfully");
                    props.edit(todo, props.index);
                    settodo('');
                }else{
                    alert("TODO updating failed");
                }
                setisEditable(false);
            } catch (error) {
                alert("Something went wrong. Please try again");
            }
        }else{
            setisEditable(false);
        }  
    }

    const deleteFunction = async () => {
        try {
            const data: any = await deleteTodo(props.todo.id);
            if(data.deletedCount === 1){
                alert("TODO deleted successfully");
                props.delete(props.todo.id)
            }else {
                alert("TODO delete failed");
            }
        } catch (error) {
            alert("Something went wrong. Please try again");
        }
    }

    return (
        <div>
        {
            isEditable? 
            (
            <form onSubmit={(e) => {editTodo(e)}}>
                <input id="todo" type="text" autoComplete="todo" value={todo} onChange={(e) => {settodo(e.target.value)}} required className='p-2 border-gray-50 border-2 rounded-md'/>
                <button type="submit" className='bg-blue-400 rounded-md p-2'>Edit</button>
            </form>
            ) : 
            (
            <div className='flex  flex-row my-2'>
                <h2 className="text font-bold mx-2 mt-2">
                  {props.todo.name}
                </h2>
                <button className='bg-blue-400 rounded-md p-2 mx-2' onClick={()=> setisEditable(true)}>Edit</button>
                <button className='bg-red-400 rounded-md p-2 mx-2' onClick={()=> deleteFunction()}>Delete</button>
            </div>
            )
        }
        
        </div>
    )
}