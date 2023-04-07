import React, { useState } from 'react'
import { ErrorMessage, ListHeaderProps } from '../types/types'
import { Content } from './Content'

export function ListHeader({ id, title, changeList, removeList }: ListHeaderProps) {
	const [error, setError] = useState<ErrorMessage | null>(null)

	function handleRemoveListClick() {
		removeList(id)
	}

	return (
		<>
			<Content listId={id} listTitle={title} listError={error} setListError={setError} changeList={changeList} />
			<button onClick={handleRemoveListClick}>Delete</button>
			{error && <div className='error-message'>{error}</div>}
		</>
	)
}
