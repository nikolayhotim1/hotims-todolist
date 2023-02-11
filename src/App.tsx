import React, { useState } from 'react'
import './App.css'
import { Task, Todolist } from './Todolist'

export type FilterValues = 'all' | 'active' | 'completed'

export default function App() {
	const [tasks, setTasks] = useState<Task[]>([
		{ id: 1, title: 'HTML & CSS', isDone: true },
		{ id: 2, title: 'JS & TS', isDone: true },
		{ id: 3, title: 'React & Redux', isDone: true },
		{ id: 4, title: 'Next', isDone: true },
		{ id: 5, title: 'Redux Toolkit', isDone: false },
		{ id: 6, title: 'Socket.IO', isDone: false },
		{ id: 7, title: 'Apollo GraphQL', isDone: false },
		{ id: 8, title: 'Ant Design', isDone: true }
	])
	const [filter, setFilter] = useState<FilterValues>('all')
	let tasksForTodolist = tasks

	function changeIsDone(id: number) {
		setTasks(tasks.map(t => (t.id !== id ? t : { ...t, isDone: !t.isDone })))
	}

	function removeTask(id: number) {
		setTasks(tasks.filter(t => t.id !== id))
	}

	function changeFilter(value: FilterValues) {
		setFilter(value)
	}

	switch (filter) {
		case 'active':
			tasksForTodolist = tasks.filter(t => !t.isDone)
			break
		case 'completed':
			tasksForTodolist = tasks.filter(t => t.isDone)
			break
		default:
			break
	}

	return (
		<div className='App'>
			<Todolist
				title='Front-end'
				tasks={tasksForTodolist}
				removeTask={removeTask}
				changeIsDone={changeIsDone}
				changeFilter={changeFilter}
			/>
		</div>
	)
}
