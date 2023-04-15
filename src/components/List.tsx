import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { ErrorMessage, FilterValues, ListProps } from '../types/types'
import inputValidator from '../helpers/inputValidator'
import { ListHeader } from './ListHeader'
import { Task } from './Task'

export function List({
	id,
	title,
	tasks,
	addTask,
	changeIsDone,
	changeTask,
	changeList,
	removeTask,
	removeList
}: ListProps) {
	const [newTask, setNewTask] = useState('')
	const [filter, setFilter] = useState<FilterValues>('all')
	const [error, setError] = useState<ErrorMessage | null>(null)
	let filteredTasks = tasks

	function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
		setNewTask(e.currentTarget.value)
		setError(null)
	}

	function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && handleAddTask()
	}

	function handleAddTask() {
		if (inputValidator(newTask, setError)) {
			addTask(id, newTask)
			setNewTask('')
		}
	}

	function handleAllFilter() {
		setFilter('all')
	}

	function handleActiveFilter() {
		setFilter('active')
	}

	function handleCompletedFilter() {
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
				<ListHeader id={id} title={title} changeList={changeList} removeList={removeList} />
			</div>
			<div className='add-form'>
				<input
					className={error ? 'error' : ''}
					placeholder='New task'
					onChange={handleNewTaskChange}
					value={newTask}
					onKeyDown={handleEnterKeyDown}
				/>
				<button onClick={handleAddTask}>Add</button>
			</div>
			{error && <div className='error-message'>{error}</div>}
			<ul className='list-tasks'>
				{filteredTasks.map(t => (
					<li key={t.id} className={t.isDone ? 'is-done' : ''}>
						<Task id={id} task={t} changeIsDone={changeIsDone} changeTask={changeTask} removeTask={removeTask} />
					</li>
				))}
			</ul>
			<div className='tasks-filter'>
				<button className={filter === 'all' ? 'active-filter' : ''} onClick={handleAllFilter}>
					All
				</button>
				<button className={filter === 'active' ? 'active-filter' : ''} onClick={handleActiveFilter}>
					Active
				</button>
				<button className={filter === 'completed' ? 'active-filter' : ''} onClick={handleCompletedFilter}>
					Completed
				</button>
			</div>
		</div>
	)
}
