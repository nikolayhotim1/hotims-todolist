export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type ListType = {
	listId: string
	listTitle: string
	listTasks: TaskType[]
}

export type FilterValues = 'all' | 'active' | 'completed'
