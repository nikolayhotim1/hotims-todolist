import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { HeaderProps } from '../types/types'

export function Header({ addList }: HeaderProps) {
	const [newList, setNewList] = useState('')

	function handleNewListChange(e: ChangeEvent<HTMLInputElement>) {
		setNewList(e.currentTarget.value)
	}

	function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && handleAddListClick()
	}

	function handleAddListClick() {
		setNewList('')
		addList(newList)
	}

	return (
		<div className='header'>
			<h1>Todolist</h1>
			<div className='add-form'>
				<input placeholder='New list' onChange={handleNewListChange} value={newList} onKeyDown={handleEnterKeyDown} />
				<button onClick={handleAddListClick}>Add</button>
			</div>
		</div>
	)
}
