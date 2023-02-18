import { useState } from 'react'
import { TaskType } from './Todolist'

type Props = {
	id: number
	task: TaskType
	changeIsDone: (listId: number, id: number) => void
	changeTask: (listId: number, id: number, title: string) => void
	removeTask: (listId: number, id: number) => void
}

export function Task({ id, task, changeIsDone, changeTask, removeTask }: Props) {
	const [isEditing, setIsEditing] = useState(false)
	let taskContent

	isEditing
		? (taskContent = (
				<div className='edit'>
					<input
						placeholder='Task'
						value={task.title}
						onChange={e => {
							changeTask(id, task.id, e.target.value)
						}}
					/>
					<button onClick={() => setIsEditing(false)}>Save</button>
				</div>
		  ))
		: (taskContent = (
				<div className='edit'>
					{task.title}
					<button onClick={() => setIsEditing(true)}>Edit</button>
				</div>
		  ))

	return (
		<div className='edit'>
			<input placeholder='Is done?' type='checkbox' checked={task.isDone} onChange={() => changeIsDone(id, task.id)} />
			{taskContent} <button onClick={() => removeTask(id, task.id)}>Delete</button>
		</div>
	)
}
