import { ChangeEvent, useState } from 'react'
import { ErrorMessage, TaskProps } from '../types/types'
import { Content } from './Content'

export function Task({ id, task, changeIsDone, changeTask, removeTask }: TaskProps) {
	const [error, setError] = useState<ErrorMessage | null>(null)

	function handleIsDoneChange(e: ChangeEvent<HTMLInputElement>) {
		changeIsDone(id, task.id, e.currentTarget.checked)
	}

	function handleRemoveTask() {
		removeTask(id, task.id)
	}

	function handleChangeTask(title: string) {
		changeTask(id, task.id, title)
	}

	return (
		<>
			<div className='task'>
				<input placeholder='Is done?' type='checkbox' checked={task.isDone} onChange={handleIsDoneChange} />
				<Content content='task' title={task.title} error={error} setError={setError} onChange={handleChangeTask} />
				<button onClick={handleRemoveTask}>Delete</button>
			</div>
			{error && <div className='error-message'>{error}</div>}
		</>
	)
}
