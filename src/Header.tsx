import React, { useState } from 'react'

type Props = {
	addList: (listTitle: string) => void
}

export function Header({ addList }: Props) {
	const [newList, setNewList] = useState('')

	return (
		<div className='header'>
			<h1>Todolist</h1>
			<div className='add-form'>
				<input placeholder='New list' onChange={e => setNewList(e.currentTarget.value)} value={newList} />
				<button
					onClick={() => {
						setNewList('')
						addList(newList)
					}}
				>
					Add
				</button>
			</div>
		</div>
	)
}
