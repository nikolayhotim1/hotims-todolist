export type ContentType = 'task' | 'list'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type ListType = {
	listId: string
	listTitle: string
}

export type initialTasksType = { [x: string]: TaskType[] }

export type initialListsType = ListType[]

export type FilterValues = 'all' | 'active' | 'completed'

export type ErrorMessage = 'Title is required'

export type AppHeaderProps = {
	addList: (listTitle: string) => void
}

export type ListProps = {
	id: string
	title: string
	tasks: TaskType[]
	addTask: (listId: string, title: string) => void
	changeIsDone: (listId: string, id: string, isDone: boolean) => void
	changeTask: (listId: string, id: string, title: string) => void
	changeList: (listId: string, listTitle: string) => void
	removeTask: (listId: string, id: string) => void
	removeList: (listId: string) => void
}

export type ListHeaderProps = {
	id: string
	title: string
	addTask: (listId: string, title: string) => void
	changeList: (listId: string, listTitle: string) => void
	removeList: (listId: string) => void
}

export type TaskProps = {
	id: string
	task: TaskType
	changeIsDone: (listId: string, id: string, isDone: boolean) => void
	changeTask: (listId: string, id: string, title: string) => void
	removeTask: (listId: string, id: string) => void
}

export type AddFormProps = {
	content: ContentType
	onAdd: (title: string) => void
}

export type ContentProps = {
	content: ContentType
	title: string
	error: string | null
	setError: (value: ErrorMessage | null) => void
	onChange: (title: string) => void
}
