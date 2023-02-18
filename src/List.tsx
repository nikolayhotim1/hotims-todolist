import React from 'react'
import { Content } from './Content'

type Props = {
	id: number
	title: string
	changeList: (listId: number, listTitle: string) => void
	removeList: (listId: number) => void
}

export function List({ id, title, changeList, removeList }: Props) {
	return (
		<>
			<Content contentType={'List'} id={id} title={title} changeList={changeList} />
			<button onClick={() => removeList(id)}>Delete</button>
		</>
	)
}
