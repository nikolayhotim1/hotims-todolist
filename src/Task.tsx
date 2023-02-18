import React from 'react'
import { Content } from './Content'
import { TaskType } from './Todolist'

type Props = {
	id: number
	task: TaskType
	changeIsDone: (listId: number, id: number) => void
	changeTask: (listId: number, id: number, title: string) => void
	removeTask: (listId: number, id: number) => void
}

export function Task({ id, task, changeIsDone, changeTask, removeTask }: Props) {
	return (
		<div className='task'>
			<input placeholder='Is done?' type='checkbox' checked={task.isDone} onChange={() => changeIsDone(id, task.id)} />
			<Content contentType={'Task'} id={id} taskId={task.id} title={task.title} changeTask={changeTask} />
			<button onClick={() => removeTask(id, task.id)}>Delete</button>
		</div>
	)
}
