import { useState } from "react";

function App() {
    const [details, setDetails] = useState("");
    const [Task, setTask] = useState([]);

    function onsubmit(e) {
        e.preventDefault();
        // console.log(details);

        const copy = [...Task];
        copy.push({
            id: Date.now(),
            text: details,
            status: "todo",
        });

        setTask(copy);
        setDetails("");

        setDetails("");
    }

    function markdone(id) {
        const copy = Task.map((task) =>
            task.id === id ? { ...task, status: "ongoing" } : task
        );
        setTask(copy);
    }

    function markongoing(id) {
        const copy = Task.map((task) =>
            task.id === id ? { ...task, status: "completed" } : task
        );
        setTask(copy);
    }

    return (
        <>
            <h1>Todo App</h1>

            <div className='container'>
                <div className='row'>
                    <div className='col-1'>
                        <input
                            type='text'
                            placeholder='Enter task..'
                            value={details}
                            onChange={(e) => {
                                setDetails(e.target.value);
                            }}
                        />
                    </div>
                    <div className='col-2'>
                        <button
                            type='button'
                            onClick={(e) => {
                                onsubmit(e);
                            }}
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            </div>

            <div className='container-1'>
                <div className='row-1'>
                    <div className='col-1'>
                        <h1>To-Do Tasks</h1>

                        <ul>
                            {Task.filter((task) => task.status === "todo").map(
                                (task) => (
                                    <li key={task.id}>
                                        {task.text}

                                        <button
                                            className='ongoing'
                                            onClick={() => markongoing(task.id)}
                                        >
                                            Done
                                        </button>

                                        <button
                                            className='movetask'
                                            onClick={() => markdone(task.id)}
                                        >
                                            Move to task
                                        </button>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>

                <div className='row-1'>
                    <div className='col-1'>
                        <h1>Ongoing Tasks</h1>
                        <ul>
                            {Task.filter(
                                (task) => task.status === "ongoing"
                            ).map((task) => (
                                <li key={task.id}>
                                    {task.text}

                                    <button
                                        className='ongoing'
                                        onClick={() => markongoing(task.id)}
                                    >
                                        Done
                                    </button>

                                    <button
                                        className='movetask'
                                        onClick={() => markdone(task.id)}
                                    >
                                        Move to task
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='row-1'>
                    <div className='col-1'>
                        <h1>Completed Tasks</h1>
                        <ul>
                            {Task.filter(
                                (task) => task.status === "completed"
                            ).map((task) => (
                                <li key={task.id}>
                                    {task.text}

                                    <button
                                        className='ongoing'
                                        onClick={() => markongoing(task.id)}
                                    >
                                        Done
                                    </button>

                                    <button
                                        className='movetask'
                                        onClick={() => markdone(task.id)}
                                    >
                                        Move to task
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
