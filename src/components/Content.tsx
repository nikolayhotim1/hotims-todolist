import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { ListContentProps, TaskContentProps } from '../types/types'
import inputValidator from '../utils/inputValidator'

export function Content(props: TaskContentProps | ListContentProps) {
	const { taskContentType, taskListId, taskId, taskTitle, taskError, setTaskError, changeTask } = props as TaskContentProps
	const { listId, listTitle, listError, setListError, changeList } = props as ListContentProps
	const [isEditing, setIsEditing] = useState(false)

	let content: JSX.Element

	function handleTaskChange(e: ChangeEvent<HTMLInputElement>) {
		changeTask(taskListId, taskId, e.target.value)
		setTaskError(null)
	}

	function handleListChange(e: ChangeEvent<HTMLInputElement>) {
		changeList(listId, e.target.value)
		setListError(null)
	}

	function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && setIsEditing(false)
	}

	function handleSaveClick() {
		if (taskContentType) {
			inputValidator(taskTitle, setTaskError) && setIsEditing(false)
		} else {
			inputValidator(listTitle, setListError) && setIsEditing(false)
		}
	}

	function handleEditClick() {
		setIsEditing(true)
	}

	if (isEditing) {
		content = (
			<>
				{taskContentType ? (
					<input
						className={taskError ? 'error' : ''}
						placeholder='Task title'
						value={taskTitle}
						onChange={handleTaskChange}
						onKeyDown={handleEnterKeyDown}
					/>
				) : (
					<h2>
						<input
							className={listError ? 'error' : ''}
							placeholder='List title'
							value={listTitle}
							onChange={handleListChange}
							onKeyDown={handleEnterKeyDown}
						/>
					</h2>
				)}
				<button onClick={handleSaveClick}>Save</button>
			</>
		)
	} else {
		content = (
			<>
				{taskContentType ? <>{taskTitle}</> : <h2>{listTitle}</h2>}
				<button onClick={handleEditClick}>Edit</button>
			</>
		)
	}

	return <>{content}</>
}
