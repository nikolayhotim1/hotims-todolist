import React, { useState } from 'react'

export type Task = {
	id: number
	title: string
	isDone: boolean
}

type FilterValues = 'all' | 'active' | 'completed'

type Props = {
	id: number
	title: string
	tasks: Task[]
	removeTask: (listId: number, id: number) => void
	removeList: (listId: number) => void
	changeIsDone: (listId: number, id: number) => void
	addTask: (listId: number, title: string) => void
}

export function Todolist({ id, title, tasks, removeTask, removeList, changeIsDone, addTask }: Props) {
	const [newTask, setNewTask] = useState('')
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
		<div className='list'>
			<div className='title'>
				<h2>{title}</h2>
				<button className='button' onClick={() => removeList(id)}>
					Remove
				</button>
			</div>
			<div>
				<input placeholder='New task' onChange={e => setNewTask(e.currentTarget.value)} value={newTask} />{' '}
				<button
					onClick={() => {
						setNewTask('')
						addTask(id, newTask)
					}}
				>
					+
				</button>
			</div>
			<ul className='tasks'>
				{filteredTasks.map(t => (
					<li key={t.id}>
						<input
							placeholder='Is done?'
							type='checkbox'
							checked={t.isDone}
							onChange={() => changeIsDone(id, t.id)}
						/>
						<span>{t.title}</span> <button onClick={() => removeTask(id, t.id)}>x</button>
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
