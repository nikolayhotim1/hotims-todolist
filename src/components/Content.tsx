import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { ListContentProps, TaskContentProps } from '../types/types'
import inputValidator from '../helpers/inputValidator'

export function Content(props: TaskContentProps | ListContentProps) {
	const { taskContentType, taskListId, taskId, taskTitle, taskError, setTaskError, changeTask } = props as TaskContentProps
	const { listId, listTitle, listError, setListError, changeList } = props as ListContentProps
	const [isEditing, setIsEditing] = useState(false)
	const [changedTask, setChangedTask] = useState(taskTitle)
	const [changedList, setChangedList] = useState(listTitle)
	let content: JSX.Element

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		if (taskContentType) {
			setChangedTask(e.currentTarget.value)
			setTaskError(null)
		} else {
			setChangedList(e.currentTarget.value)
			setListError(null)
		}
	}

	function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && handleSaveClick()
	}

	function handleSaveClick() {
		if (taskContentType) {
			if (inputValidator(changedTask, setTaskError)) {
				changeTask(taskListId, taskId, changedTask)
				setIsEditing(false)
			}
		} else {
			if (inputValidator(changedList, setListError)) {
				changeList(listId, changedList)
				setIsEditing(false)
			}
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
						value={changedTask}
						onChange={handleChange}
						onKeyDown={handleEnterKeyDown}
					/>
				) : (
					<h2>
						<input
							className={listError ? 'error' : ''}
							placeholder='List title'
							value={changedList}
							onChange={handleChange}
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
