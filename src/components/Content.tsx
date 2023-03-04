import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { ListContentProps, TaskContentProps } from '../types/types'

export function Content(props: TaskContentProps | ListContentProps) {
	const { taskContentType, taskListId, taskId, taskTitle, changeTask } = props as TaskContentProps
	const { listId, listTitle, changeList } = props as ListContentProps
	const [isEditing, setIsEditing] = useState(false)
	let content: JSX.Element

	function handleTaskChange(e: ChangeEvent<HTMLInputElement>) {
		changeTask(taskListId, taskId, e.target.value)
	}

	function handleListChange(e: ChangeEvent<HTMLInputElement>) {
		changeList(listId, e.target.value)
	}

	function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && setIsEditing(false)
	}

	function handleSaveClick() {
		setIsEditing(false)
	}

	function handleEditClick() {
		setIsEditing(true)
	}

	if (isEditing) {
		content = (
			<>
				{taskContentType ? (
					<input
						placeholder='Task title'
						value={taskTitle}
						onChange={handleTaskChange}
						onKeyDown={handleEnterKeyDown}
					/>
				) : (
					<h2>
						<input
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
