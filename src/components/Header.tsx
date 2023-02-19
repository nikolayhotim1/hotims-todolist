import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type Props = {
	addList: (listTitle: string) => void
}

export function Header({ addList }: Props) {
	const [newList, setNewList] = useState('')

	function handleSetNewList(e: ChangeEvent<HTMLInputElement>) {
		setNewList(e.currentTarget.value)
	}

	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && handleAddList()
	}

	function handleAddList() {
		setNewList('')
		addList(newList)
	}

	return (
		<div className='header'>
			<h1>Todolist</h1>
			<div className='add-form'>
				<input placeholder='New list' onChange={handleSetNewList} value={newList} onKeyDown={handleKeyDown} />
				<button onClick={handleAddList}>Add</button>
			</div>
		</div>
	)
}
