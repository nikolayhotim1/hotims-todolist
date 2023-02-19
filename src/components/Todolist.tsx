import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValues, TaskType } from '../types/types'
import { List } from './List'
import { Task } from './Task'

type Props = {
	id: string
	title: string
	tasks: TaskType[]
	addTask: (listId: string, title: string) => void
	changeIsDone: (listId: string, id: string) => void
	changeTask: (listId: string, id: string, title: string) => void
	changeList: (listId: string, listTitle: string) => void
	removeTask: (listId: string, id: string) => void
	removeList: (listId: string) => void
}

export function Todolist({ id, title, tasks, addTask, changeIsDone, changeTask, changeList, removeTask, removeList }: Props) {
	const [newTask, setNewTask] = useState('')
	const [filter, setFilter] = useState<FilterValues>('all')
	let filteredTasks = tasks

	function handleSetNewTask(e: ChangeEvent<HTMLInputElement>) {
		setNewTask(e.currentTarget.value)
	}

	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && handleAddTask()
	}

	function handleAddTask() {
		setNewTask('')
		addTask(id, newTask)
	}

	function setAllFilter() {
		setFilter('all')
	}

	function setActiveFilter() {
		setFilter('active')
	}

	function setCompletedFilter() {
		setFilter('completed')
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
				<input placeholder='New task' onChange={handleSetNewTask} value={newTask} onKeyDown={handleKeyDown} />
				<button onClick={handleAddTask}>Add</button>
			</div>
			<ul className='list-tasks'>
				{filteredTasks.map(t => (
					<li key={t.id}>
						<Task id={id} task={t} removeTask={removeTask} changeIsDone={changeIsDone} changeTask={changeTask} />
					</li>
				))}
			</ul>
			<div className='tasks-filter'>
				<button onClick={setAllFilter}>All</button>
				<button onClick={setActiveFilter}>Active</button>
				<button onClick={setCompletedFilter}>Completed</button>
			</div>
		</div>
	)
}
