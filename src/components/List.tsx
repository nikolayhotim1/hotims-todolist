import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValues, ListProps } from '../types/types'
import { ListHeader } from './ListHeader'
import { Task } from './Task'

export function List({ id, title, tasks, addTask, changeIsDone, changeTask, changeList, removeTask, removeList }: ListProps) {
	const [newTask, setNewTask] = useState('')
	const [filter, setFilter] = useState<FilterValues>('all')
	let filteredTasks = tasks

	function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
		setNewTask(e.currentTarget.value)
	}

	function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && handleAddTaskClick()
	}

	function handleAddTaskClick() {
		setNewTask('')
		addTask(id, newTask)
	}

	function handleAllFilterClick() {
		setFilter('all')
	}

	function handleActiveFilterClick() {
		setFilter('active')
	}

	function handleCompletedFilterClick() {
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
			<div className='list-header'>
				<ListHeader id={id} title={title} removeList={removeList} changeList={changeList} />
			</div>
			<div className='add-form'>
				<input placeholder='New task' onChange={handleNewTaskChange} value={newTask} onKeyDown={handleEnterKeyDown} />
				<button onClick={handleAddTaskClick}>Add</button>
			</div>
			<ul className='list-tasks'>
				{filteredTasks.map(t => (
					<li key={t.id}>
						<Task id={id} task={t} removeTask={removeTask} changeIsDone={changeIsDone} changeTask={changeTask} />
					</li>
				))}
			</ul>
			<div className='tasks-filter'>
				<button onClick={handleAllFilterClick}>All</button>
				<button onClick={handleActiveFilterClick}>Active</button>
				<button onClick={handleCompletedFilterClick}>Completed</button>
			</div>
		</div>
	)
}
