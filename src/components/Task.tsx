import React from 'react'
import { TaskType } from '../types/types'
import { Content } from './Content'

type Props = {
	id: string
	task: TaskType
	changeIsDone: (listId: string, id: string) => void
	changeTask: (listId: string, id: string, title: string) => void
	removeTask: (listId: string, id: string) => void
}

export function Task({ id, task, changeIsDone, changeTask, removeTask }: Props) {
	function handleChangeIsDone() {
		changeIsDone(id, task.id)
	}

	function handleRemoveTask() {
		removeTask(id, task.id)
	}

	return (
		<div className='task'>
			<input placeholder='Is done?' type='checkbox' checked={task.isDone} onChange={handleChangeIsDone} />
			<Content taskContentType taskListId={id} taskId={task.id} taskTitle={task.title} changeTask={changeTask} />
			<button onClick={handleRemoveTask}>Delete</button>
		</div>
	)
}
