import React, { useState } from 'react'

type TaskProps = {
	taskContentType: true
	taskListId: number
	taskId: number
	taskTitle: string
	changeTask: (listId: number, id: number, title: string) => void
}

type ListProps = {
	listId: number
	listTitle: string
	changeList: (listId: number, listTitle: string) => void
}

export function Content(props: TaskProps | ListProps) {
	const { taskContentType, taskListId, taskId, taskTitle, changeTask } = props as TaskProps
	const { listId, listTitle, changeList } = props as ListProps
	const [isEditing, setIsEditing] = useState(false)
	let content: JSX.Element

	if (isEditing) {
		content = (
			<>
				{taskContentType ? (
					<input
						placeholder={`Task title`}
						value={taskTitle}
						onChange={e => {
							changeTask(taskListId, taskId, e.target.value)
						}}
					/>
				) : (
					<input
						placeholder={`List title`}
						value={listTitle}
						onChange={e => {
							changeList(listId, e.target.value)
						}}
					/>
				)}
				<button onClick={() => setIsEditing(false)}>Save</button>
			</>
		)
	} else {
		content = (
			<>
				{taskContentType ? <>{taskTitle}</> : <h2>{listTitle}</h2>}
				<button onClick={() => setIsEditing(true)}>Edit</button>
			</>
		)
	}
	return <>{content}</>
}
