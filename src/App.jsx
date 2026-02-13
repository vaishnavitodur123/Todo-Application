import { useState } from "react";

function App() {
    const [details, setDetails] = useState("");
    const [Task, setTask] = useState([]);
    const [draggedTask, setDraggedTask] = useState(null);

    function onsubmit(e) {
        e.preventDefault();
        if (!details.trim()) return;

        setTask([
            ...Task,
            {
                id: Date.now(),
                text: details,
                status: "todo",
            },
        ]);
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

    // ================= DRAG & DROP =================
    function handleDragStart(task) {
        setDraggedTask(task);
    }

    function allowDrop(e) {
        e.preventDefault();
    }

    function handleDrop(status) {
        if (!draggedTask) return;

        setTask(
            Task.map((task) =>
                task.id === draggedTask.id ? { ...task, status } : task
            )
        );

        alert(`Task "${draggedTask.text}" moved to ${status.toUpperCase()}`);

        setDraggedTask(null);
    }
    // ===============================================

    const renderTasks = (status) =>
        Task.filter((task) => task.status === status).map((task) => (
            <li
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task)}
            >
                {task.text}

                <button
                    className='ongoing'
                    onClick={() => markongoing(task.id)}
                >
                    Done
                </button>

                <button className='movetask' onClick={() => markdone(task.id)}>
                    Move to task
                </button>
            </li>
        ));

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
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
                    <div className='col-2'>
                        <button type='button' onClick={onsubmit}>
                            Add Task
                        </button>
                    </div>
                </div>
            </div>

            <div className='container-1'>
                <div
                    className='row-1'
                    onDragOver={allowDrop}
                    onDrop={() => handleDrop("todo")}
                >
                    <div className='col-1'>
                        <h1>To-Do Tasks</h1>
                        <ul>{renderTasks("todo")}</ul>
                    </div>
                </div>

                <div
                    className='row-1'
                    onDragOver={allowDrop}
                    onDrop={() => handleDrop("ongoing")}
                >
                    <div className='col-1'>
                        <h1>Ongoing Tasks</h1>
                        <ul>{renderTasks("ongoing")}</ul>
                    </div>
                </div>

                <div
                    className='row-1'
                    onDragOver={allowDrop}
                    onDrop={() => handleDrop("completed")}
                >
                    <div className='col-1'>
                        <h1>Completed Tasks</h1>
                        <ul>{renderTasks("completed")}</ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
