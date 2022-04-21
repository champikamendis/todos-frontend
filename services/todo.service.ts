import { axiosClient } from "./axios-client"

export const fetchMyTodos = async () => {
    const res = await axiosClient.get('/todo/fetchMyTodos');

    return res.data;
}

export const addTodo = async (name: string, completed: boolean) => {
    const res = await axiosClient.post('/todo/add', {
        name,
        completed
    });

    return res.data;
}

export const updateTodo = async (id: string, name: string, completed: boolean) => {
    const res = await axiosClient.put('/todo/edit', {
        _id: id,
        name,
        completed
    });

    return res.data;
}

export const deleteTodo = async (id: string) => {
    const res: any = await axiosClient.delete(`/todo/delete/${id}`);


    return res.data;
}