import React from 'react'
import { Content } from './Content'

type Props = {
	id: string
	title: string
	changeList: (listId: string, listTitle: string) => void
	removeList: (listId: string) => void
}

export function ListHeader({ id, title, changeList, removeList }: Props) {
	function handleRemoveList() {
		removeList(id)
	}

	return (
		<>
			<Content listId={id} listTitle={title} changeList={changeList} />
			<button onClick={handleRemoveList}>Delete</button>
		</>
	)
}
