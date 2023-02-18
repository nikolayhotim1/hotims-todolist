import React, { useState } from 'react'

type TaskProps = {
	contentType: 'Task'
	id: number
	taskId: number
	title: string
	changeTask: (listId: number, id: number, title: string) => void
}

type ListProps = {
	contentType: 'List'
	id: number
	title: string
	changeList: (listId: number, listTitle: string) => void
}

export function Content(props: TaskProps | ListProps) {
	const [isEditing, setIsEditing] = useState(false)
	let content: JSX.Element

	if (isEditing) {
		content = (
			<>
				{props.contentType === 'Task' ? (
					<input
						placeholder={`${props.contentType} title`}
						value={props.title}
						onChange={e => {
							props.changeTask(props.id, props.taskId, e.target.value)
						}}
					/>
				) : (
					<input
						placeholder={`${props.contentType} title`}
						value={props.title}
						onChange={e => {
							props.changeList(props.id, e.target.value)
						}}
					/>
				)}
				<button onClick={() => setIsEditing(false)}>Save</button>
			</>
		)
	} else {
		content = (
			<>
				{props.contentType === 'Task' ? <>{props.title}</> : <h2>{props.title}</h2>}
				<button onClick={() => setIsEditing(true)}>Edit</button>
			</>
		)
	}
	return <>{content}</>
}
