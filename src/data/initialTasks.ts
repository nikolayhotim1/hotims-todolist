import { initialTasksType } from './../types/types'
import { v1 } from 'uuid'

export const initialTasks: initialTasksType = [
	{
		listId: v1(),
		listTitle: 'Family',
		listTasks: []
	},
	{
		listId: v1(),
		listTitle: 'English',
		listTasks: []
	},
	{
		listId: v1(),
		listTitle: 'Front-end',
		listTasks: []
	},
	{
		listId: v1(),
		listTitle: 'Sport',
		listTasks: []
	},
	{
		listId: v1(),
		listTitle: 'Books',
		listTasks: []
	},
	{
		listId: v1(),
		listTitle: 'Trips',
		listTasks: []
	},
	{
		listId: v1(),
		listTitle: 'Movies',
		listTasks: []
	}
]
