import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { ContentProps } from '../types/types'
import inputValidator from '../helpers/inputValidator'

export function Content({ content, title, error, setError, onChange }: ContentProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [newTitle, setNewTitle] = useState('')

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setNewTitle(e.currentTarget.value)
		setError(null)
	}

	function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && handleSaveClick()
	}

	function handleSaveClick() {
		if (inputValidator(newTitle, setError)) {
			onChange(newTitle)
			setIsEditing(false)
		}
	}

	function handleEditClick() {
		setNewTitle(title)
		setIsEditing(true)
	}

	return isEditing ? (
		<>
			<input
				className={error ? 'error' : ''}
				placeholder={content === 'task' ? 'Task title' : 'List title'}
				value={newTitle}
				onChange={handleChange}
				onKeyDown={handleEnterKeyDown}
			/>
			<button onClick={handleSaveClick}>Save</button>
		</>
	) : (
		<>
			{title}
			<button onClick={handleEditClick}>Edit</button>
		</>
	)
}
