import { useState } from 'react'
import { ErrorMessage, ListHeaderProps } from '../types/types'
import { AddForm } from './AddForm'
import { Content } from './Content'

export function ListHeader({ id, title, addTask, changeList, removeList }: ListHeaderProps) {
	const [error, setError] = useState<ErrorMessage | null>(null)

	function handleRemoveList() {
		removeList(id)
	}

	function handleAddTask(title: string) {
		addTask(id, title)
	}

	function handleChangeList(title: string) {
		changeList(id, title)
	}

	return (
		<>
			<div className='list-title'>
				<h2 className='list-title'>
					<Content content='list' title={title} error={error} setError={setError} onChange={handleChangeList} />
				</h2>
				<button onClick={handleRemoveList}>Delete</button>
				{error && <div className='error-message'>{error}</div>}
			</div>
			<AddForm content='task' onAdd={handleAddTask} />
		</>
	)
}
