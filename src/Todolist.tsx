import React, { useState } from 'react'

export type Task = {
	id: number
	title: string
	isDone: boolean
}

type FilterValues = 'all' | 'active' | 'completed'

type Props = {
	listId: number
	title: string
	tasks: Task[]
	removeTask: (listId: number, id: number) => void
	changeIsDone: (listId: number, id: number) => void
	addTask: (listId: number, title: string) => void
}

export function Todolist({ listId, title, tasks, removeTask, changeIsDone, addTask }: Props) {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [filter, setFilter] = useState<FilterValues>('all')
	let filteredTasks = tasks

	function changeFilter(value: FilterValues) {
		setFilter(value)
	}

	switch (filter) {
		case 'active':
			filteredTasks = tasks.filter(t => !t.isDone)
			break
		case 'completed':
			filteredTasks = tasks.filter(t => t.isDone)
			break
		default:
			break
	}

	return (
		<div>
			<h2>{title}</h2>
			<div>
				<input placeholder='New task' onChange={e => setNewTaskTitle(e.currentTarget.value)} value={newTaskTitle} />{' '}
				<button
					onClick={() => {
						setNewTaskTitle('')
						addTask(listId, newTaskTitle)
					}}
				>
					+
				</button>
			</div>
			<ul>
				{filteredTasks.map(t => (
					<li key={t.id}>
						<input type='checkbox' checked={t.isDone} onChange={() => changeIsDone(listId, t.id)} />
						<span>{t.title}</span> <button onClick={() => removeTask(listId, t.id)}>x</button>
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
