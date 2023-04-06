import React, { ChangeEvent, useState } from 'react'
import { TaskProps } from '../types/types'
import { Content } from './Content'

export function Task({ id, task, changeIsDone, changeTask, removeTask }: TaskProps) {
	const [error, setError] = useState<string | null>(null)

	function handleIsDoneChange(e: ChangeEvent<HTMLInputElement>) {
		changeIsDone(id, task.id, e.currentTarget.checked)
	}

	function handleRemoveTaskClick() {
		removeTask(id, task.id)
	}

	return (
		<>
			<div className='task'>
				<input
					placeholder='Is done?'
					type='checkbox'
					checked={task.isDone}
					onChange={handleIsDoneChange}
				/>
				<Content
					taskContentType
					taskListId={id}
					taskId={task.id}
					taskTitle={task.title}
					taskError={error}
					setTaskError={setError}
					changeTask={changeTask}
				/>
				<button onClick={handleRemoveTaskClick}>Delete</button>
			</div>
			{error && <div className='error-message'>{error}</div>}
		</>
	)
}
