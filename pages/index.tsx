import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AddTODO } from "../components/addTodo";
import { OneTODO } from "../components/todo";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { userRecognition } from "../services/user.service";
import { fetchMyTodos } from "../services/todo.service";
import { storeAccessToken } from "../services/axios-client";

export interface todoItem {
  id: string;
  name: string;
  completed: boolean;
}

const Home: NextPage = () => {
  const [todoList, setTodoList] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const data: any = await userRecognition();
      if (!data) {
        router.push("/login");
      } else {
        loadMyTodo();
      }
    } catch (error) {
      router.push("/login");
    }
  };

  const logout = async () => {
    storeAccessToken('');
    router.push("/login");
  }

  const loadMyTodo = async () => {
    try {
      const data = await fetchMyTodos();
      alert("TODO successfully loaded");
      setTodoList(
        data.map((todo: any) => {
          return { ...todo, id: todo._id };
        })
      );
    } catch (error) {
      alert("TODO loading failed");
    }
  };

  const addTodo = (todo: todoItem) => {
    setTodoList([...todoList, todo]);
  };

  const editTodo = (newTODO: string, index: number) => {
    const newTODOList = todoList.map((todo, i) => {
      if (i === index) {
        return { ...todo, name: newTODO };
      } else {
        return todo;
      }
    });
    setTodoList(newTODOList);
  };

  const updateCompleteTodo = (index: number) => {
    const newTODOList = todoList.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodoList(newTODOList);
  };

  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <Head>
        <title>TODO</title>
        <meta name="description" content="Todo Application using Next js with Node js" />
        <link rel="icon" href="/todo-icon.jpeg" />
      </Head>
      <div className="bg-gray-300 py-6 flex flex-row justify-between">
        <h3 className="text font-bold ml-8 mt-2 text-center">TODOs APPLICATION</h3>
        <div className="flex flex-row mr-8">
          <ul
            onClick={() => {
              logout()
            }}
            className="bg-blue-500 rounded-md p-2"
          >
            Logout
          </ul>
        </div>
      </div>

      <main className={styles.main} style={{marginTop: -250}}>
        <AddTODO addTODO={addTodo} />
        {todoList &&
          todoList.length > 0 &&
          todoList.map((todo, index) => {
            return (
              <OneTODO
                key={index}
                todo={todo}
                index={index}
                edit={editTodo}
                delete={deleteTodo}
                updateCompleteTodo={updateCompleteTodo}
              ></OneTODO>
            );
          })}
      </main>
    </div>
  );
};

export default Home;
