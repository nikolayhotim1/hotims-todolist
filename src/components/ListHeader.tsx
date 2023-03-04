import React from 'react'
import { ListHeaderProps } from '../types/types'
import { Content } from './Content'

export function ListHeader({ id, title, changeList, removeList }: ListHeaderProps) {
	function handleRemoveListClick() {
		removeList(id)
	}

	return (
		<>
			<Content listId={id} listTitle={title} changeList={changeList} />
			<button onClick={handleRemoveListClick}>Delete</button>
		</>
	)
}
