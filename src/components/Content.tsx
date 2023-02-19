import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type TaskProps = {
	taskContentType: true
	taskListId: string
	taskId: string
	taskTitle: string
	changeTask: (listId: string, id: string, title: string) => void
}

type ListProps = {
	listId: string
	listTitle: string
	changeList: (listId: string, listTitle: string) => void
}

export function Content(props: TaskProps | ListProps) {
	const { taskContentType, taskListId, taskId, taskTitle, changeTask } = props as TaskProps
	const { listId, listTitle, changeList } = props as ListProps
	const [isEditing, setIsEditing] = useState(false)
	let content: JSX.Element

	function handleChangeTask(e: ChangeEvent<HTMLInputElement>) {
		changeTask(taskListId, taskId, e.target.value)
	}

	function handleChangeList(e: ChangeEvent<HTMLInputElement>) {
		changeList(listId, e.target.value)
	}

	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
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
					<input placeholder='Task title' value={taskTitle} onChange={handleChangeTask} onKeyDown={handleKeyDown} />
				) : (
					<input placeholder='List title' value={listTitle} onChange={handleChangeList} onKeyDown={handleKeyDown} />
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
