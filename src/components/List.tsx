import { useState } from 'react'
import { FilterValues, ListProps } from '../types/types'
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
	const [filter, setFilter] = useState<FilterValues>('all')
	let filteredTasks = tasks

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
			<div>
				<ListHeader id={id} title={title} addTask={addTask} changeList={changeList} removeList={removeList} />
			</div>
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
