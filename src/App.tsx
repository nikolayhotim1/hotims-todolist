import { useImmer } from 'use-immer'
import './styles/App.css'
import { Header } from './components/Header'
import { List } from './components/List'
import { initialTasks } from './data/initialTasks'
import { v1 } from 'uuid'
import { ListType } from './types/types'

export default function App() {
	const [tasks, updateTasks] = useImmer<ListType[]>(initialTasks)

	function addTask(listId: string, title: string) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : l.listTasks.push({ id: v1(), title: title, isDone: false })))
		})
	}

	function addList(listTitle: string) {
		updateTasks(draft => {
			draft.push({ listId: v1(), listTitle: listTitle, listTasks: [] })
		})
	}

	function changeIsDone(listId: string, id: string) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : l.listTasks.map(lt => (lt.id !== id ? lt : (lt.isDone = !lt.isDone)))))
		})
	}

	function changeTask(listId: string, id: string, title: string) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : l.listTasks.map(lt => (lt.id !== id ? lt : (lt.title = title)))))
		})
	}

	function changeList(listId: string, listTitle: string) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : (l.listTitle = listTitle)))
		})
	}

	function removeTask(listId: string, id: string) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : (l.listTasks = l.listTasks.filter(lt => lt.id !== id))))
		})
	}

	function removeList(listId: string) {
		updateTasks(tasks.filter(l => l.listId !== listId))
	}

	return (
		<div className='app'>
			<Header addList={addList} />
			<div className='lists'>
				{tasks.map(l => (
					<List
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
		</div>
	)
}
