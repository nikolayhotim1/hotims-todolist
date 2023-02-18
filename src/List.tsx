import { useState } from 'react'

type Props = {
	id: number
	title: string
	changeList: (listId: number, listTitle: string) => void
	removeList: (listId: number) => void
}

export function List({ id, title, changeList, removeList }: Props) {
	const [isEditing, setIsEditing] = useState(false)
	let listContent

	isEditing
		? (listContent = (
				<>
					<input
						placeholder='List'
						value={title}
						onChange={e => {
							changeList(id, e.target.value)
						}}
					/>
					<button onClick={() => setIsEditing(false)}>Save</button>
				</>
		  ))
		: (listContent = (
				<>
					<h2>{title}</h2>
					<button onClick={() => setIsEditing(true)}>Edit</button>
				</>
		  ))

	return (
		<>
			{listContent}
			<button className='button' onClick={() => removeList(id)}>
				Delete
			</button>
		</>
	)
}
