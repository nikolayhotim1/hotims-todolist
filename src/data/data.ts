import { initialTasksType, initialListsType } from '../types/types'
import { v1 } from 'uuid'

export const initialLists: initialListsType = [
	{
		listId: v1(),
		listTitle: 'Family'
	},
	{
		listId: v1(),
		listTitle: 'English'
	},
	{
		listId: v1(),
		listTitle: 'Front-end'
	},
	{
		listId: v1(),
		listTitle: 'Sport'
	},
	{
		listId: v1(),
		listTitle: 'Books'
	},
	{
		listId: v1(),
		listTitle: 'Trips'
	},
	{
		listId: v1(),
		listTitle: 'Movies'
	}
]

export const initialTasks: initialTasksType = {}

for (const id of initialLists.map(l => l.listId)) {
	initialTasks[id] = [
		{ id: v1(), isDone: true, title: 'Smth special' },
		{ id: v1(), isDone: true, title: 'Smth amazing' },
		{ id: v1(), isDone: false, title: 'Smth great' },
		{ id: v1(), isDone: false, title: 'Smth important' }
	]
}
