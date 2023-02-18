import React, { useState } from 'react'
import { List } from './List'
import { Task } from './Task'

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

type FilterValues = 'all' | 'active' | 'completed'

type Props = {
	id: number
	title: string
	tasks: TaskType[]
	addTask: (listId: number, title: string) => void
	changeIsDone: (listId: number, id: number) => void
	changeTask: (listId: number, id: number, title: string) => void
	changeList: (listId: number, listTitle: string) => void
	removeTask: (listId: number, id: number) => void
	removeList: (listId: number) => void
}

export function Todolist({ id, title, tasks, addTask, changeIsDone, changeTask, changeList, removeTask, removeList }: Props) {
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
			<div className='list-title'>
				<List id={id} title={title} removeList={removeList} changeList={changeList} />
			</div>
			<div className='add-form'>
				<input placeholder='New task' onChange={e => setNewTask(e.currentTarget.value)} value={newTask} />
				<button
					onClick={() => {
						setNewTask('')
						addTask(id, newTask)
					}}
				>
					Add
				</button>
			</div>
			<ul className='list-tasks'>
				{filteredTasks.map(t => (
					<li key={t.id}>
						<Task id={id} task={t} removeTask={removeTask} changeIsDone={changeIsDone} changeTask={changeTask} />
					</li>
				))}
			</ul>
			<div className='tasks-filter'>
				<button onClick={() => changeFilter('all')}>All</button>
				<button onClick={() => changeFilter('active')}>Active</button>
				<button onClick={() => changeFilter('completed')}>Completed</button>
			</div>
		</div>
	)
}
