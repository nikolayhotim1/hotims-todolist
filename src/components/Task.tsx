import React from 'react'
import { TaskProps } from '../types/types'
import { Content } from './Content'

export function Task({ id, task, changeIsDone, changeTask, removeTask }: TaskProps) {
	function handleIsDoneChange() {
		changeIsDone(id, task.id)
	}

	function handleRemoveTaskClick() {
		removeTask(id, task.id)
	}

	return (
		<div className='task'>
			<input placeholder='Is done?' type='checkbox' checked={task.isDone} onChange={handleIsDoneChange} />
			<Content taskContentType taskListId={id} taskId={task.id} taskTitle={task.title} changeTask={changeTask} />
			<button onClick={handleRemoveTaskClick}>Delete</button>
		</div>
	)
}
