import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { HeaderProps } from '../types/types'
import inputValidator from '../utils/inputValidator'

export function Header({ error, setError, addList }: HeaderProps) {
	const [newList, setNewList] = useState('')

	function handleNewListChange(e: ChangeEvent<HTMLInputElement>) {
		setNewList(e.currentTarget.value)
		setError(null)
	}

	function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && handleAddListClick()
	}

	function handleAddListClick() {
		if (inputValidator(newList, setError)) {
			addList(newList)
			setNewList('')
		}
	}

	return (
		<div className='header'>
			<h1>Todolist</h1>
			<div className='add-form'>
				<input
					className={error ? 'error' : ''}
					placeholder='New list'
					onChange={handleNewListChange}
					value={newList}
					onKeyDown={handleEnterKeyDown}
				/>
				<button onClick={handleAddListClick}>Add</button>
			</div>
		</div>
	)
}
