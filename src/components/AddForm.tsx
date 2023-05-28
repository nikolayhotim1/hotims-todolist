import { ChangeEvent, KeyboardEvent, useState } from 'react'
import inputValidator from '../helpers/inputValidator'
import { AddFormProps, ErrorMessage } from '../types/types'

export function AddForm({ content, onAdd }: AddFormProps) {
	const [title, setTitle] = useState('')
	const [error, setError] = useState<ErrorMessage | null>(null)

	function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
		setTitle(e.currentTarget.value)
		setError(null)
	}

	function handleEnterKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		e.key === 'Enter' && handleAdd()
	}

	function handleAdd() {
		if (inputValidator(title, setError)) {
			onAdd(title)
			setTitle('')
		}
	}

	return (
		<>
			<div className='add-form'>
				<input
					className={error ? 'error' : ''}
					placeholder={content === 'task' ? 'New task' : ' New list'}
					onChange={handleTitleChange}
					value={title}
					onKeyDown={handleEnterKeyDown}
				/>
				<button onClick={handleAdd}>Add</button>
			</div>
			{error && <div className='error-message'>{error}</div>}
		</>
	)
}
