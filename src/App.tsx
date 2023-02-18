import { useImmer } from 'use-immer'
import './App.css'
import { Header } from './Header'
import { initialTasks } from './initialTasks'
import { TaskType, Todolist } from './Todolist'

type ListType = {
	listId: number
	listTitle: string
	listTasks: TaskType[]
}

let nextId = 8

export default function App() {
	const [tasks, updateTasks] = useImmer<ListType[]>(initialTasks)

	function addTask(listId: number, title: string) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : l.listTasks.push({ id: nextId++, title: title, isDone: false })))
		})
	}

	function addList(listTitle: string) {
		updateTasks(draft => {
			draft.push({ listId: nextId++, listTitle: listTitle, listTasks: [] })
		})
	}

	function changeIsDone(listId: number, id: number) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : l.listTasks.map(lt => (lt.id !== id ? lt : (lt.isDone = !lt.isDone)))))
		})
	}

	function changeTask(listId: number, id: number, title: string) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : l.listTasks.map(lt => (lt.id !== id ? lt : (lt.title = title)))))
		})
	}

	function changeList(listId: number, listTitle: string) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : (l.listTitle = listTitle)))
		})
	}

	function removeTask(listId: number, id: number) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : (l.listTasks = l.listTasks.filter(lt => lt.id !== id))))
		})
	}

	function removeList(listId: number) {
		updateTasks(tasks.filter(l => l.listId !== listId))
	}

	return (
		<>
			<Header addList={addList} />
			<div className='todolist'>
				{tasks.map(l => (
					<Todolist
						key={l.listId}
						id={l.listId}
						title={l.listTitle}
						tasks={l.listTasks}
						addTask={addTask}
						changeIsDone={changeIsDone}
						changeTask={changeTask}
						changeList={changeList}
						removeTask={removeTask}
						removeList={removeList}
					/>
				))}
			</div>
		</>
	)
}
