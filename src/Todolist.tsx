import React, { ChangeEvent, useState } from 'react'
import { FilterValues } from './App'

export type Task = {
	id: number
	title: string
	isDone: boolean
}

type Props = {
	title: string
	tasks: Task[]
	removeTask: (id: number) => void
	changeIsDone: (id: number) => void
	changeFilter: (value: FilterValues) => void
	addTask: (title: string) => void
}

export function Todolist({ title, tasks, removeTask, changeIsDone, changeFilter, addTask }: Props) {
	const [newTaskTitle, setNewTaskTitle] = useState('')

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setNewTaskTitle(e.currentTarget.value)
	}

	return (
		<div>
			<h1>Todolist</h1>
			<h2>{title}</h2>
			<div>
				<input placeholder='New task' onChange={handleInputChange} value={newTaskTitle} />{' '}
				<button
					onClick={() => {
						addTask(newTaskTitle)
						setNewTaskTitle('')
					}}
				>
					+
				</button>
			</div>
			<ul>
				{tasks.map(t => (
					<li key={t.id}>
						<input type='checkbox' checked={t.isDone} onChange={() => changeIsDone(t.id)} />
						<span>{t.title}</span> <button onClick={() => removeTask(t.id)}>x</button>
					</li>
				))}
			</ul>
			<div>
				<button onClick={() => changeFilter('all')}>All</button>{' '}
				<button onClick={() => changeFilter('active')}>Active</button>{' '}
				<button onClick={() => changeFilter('completed')}>Completed</button>
			</div>
		</div>
	)
}
