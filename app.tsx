import React from 'react';
import * as ReactDOM from 'react-dom'

import { query, initThinBackend, createRecord, updateRecord, deleteRecord, Task } from 'thin-backend';
import { useQuery, ThinBackend } from 'thin-backend/react';

function Tasks() {
    // `useQuery` always returns the latest records from the db
    const tasks = useQuery(query('tasks').orderBy('createdAt'));

    return <div className="mb-4">
        <h1>Tasks</h1>
        {tasks?.map(task => <Task task={task} key={task.id} />)}
    </div>
}

interface TaskProps {
    task: Task;
}
function Task({ task }: TaskProps) {
    const editTask = () => {
        const newTitle = window.prompt('Title', task.title) || '';
        updateRecord('tasks', task.id, { title: newTitle });
    };
    const deleteTask = () => {
        deleteRecord('tasks', task.id);
    }

    return <div onDoubleClick={editTask}>
        {task.title}

        <button className="d-inline-block ml-2" onClick={deleteTask}>❌</button>
    </div>
}

function AddTaskButton() {
    const handleClick = () => {
        const task = { title: window.prompt('Title:') || '' };

        createRecord('tasks', task);
    }

    return <button onClick={handleClick}>Add Task</button>
}

function App() {
    // No need for redux or other state management libs
    // `useQuery` automatically triggers a re-render on new data
    return <ThinBackend>
        <Tasks />
        <div>
            <AddTaskButton />
        </div>
        <small className="text-muted">Double click a task to edit</small>
    </ThinBackend>
}

// This needs to be run before any calls to `query`, `createRecord`, etc.
initThinBackend({ host: process.env.BACKEND_URL });

// Start the React app
ReactDOM.render(<App/>, document.getElementById('app'));
