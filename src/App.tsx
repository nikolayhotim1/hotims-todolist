import React from 'react'
import './App.css'
import { Task, Todolist } from './Todolist'

export default function App() {
	const tasks1: Task[] = [
		{ id: 1, title: 'HTML & CSS', isDone: true },
		{ id: 1, title: 'JS & TS', isDone: true },
		{ id: 1, title: 'React & Redux', isDone: false }
	]
	const tasks2: Task[] = [
		{ id: 1, title: 'Terminator', isDone: true },
		{ id: 1, title: 'Avatar', isDone: true },
		{ id: 1, title: 'Rocky', isDone: false }
	]
	return (
		<div className='App'>
			<Todolist title='IT' tasks={tasks1} />
			<Todolist title='Movies' tasks={tasks2} />
		</div>
	)
}
