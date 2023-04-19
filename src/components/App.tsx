import React, { useState } from 'react'
import { useImmer } from 'use-immer'
import '../styles/App.css'
import { Header } from './Header'
import { List } from './List'
import { initialTasks, initialLists } from '../data/data'
import { v1 } from 'uuid'
import { ListType, initialTasksType, ErrorMessage } from '../types/types'

export default function App() {
	const [tasks, setTasks] = useImmer<initialTasksType>(initialTasks)
	const [lists, setLists] = useImmer<ListType[]>(initialLists)
	const [error, setError] = useState<ErrorMessage | null>(null)

	function addTask(listId: string, title: string) {
		setTasks(draft => {
			draft[listId].push({ id: v1(), title: title.trim(), isDone: false })
		})
	}

	function addList(listTitle: string) {
		const listId = v1()
		setLists(draft => {
			draft.push({ listId: listId, listTitle: listTitle })
		})
		setTasks(draft => {
			draft[listId] = []
		})
	}

	function changeIsDone(listId: string, id: string, isDone: boolean) {
		setTasks(draft => {
			const task = draft[listId].find(t => t.id === id)
			if (task) {
				task.isDone = isDone
			}
		})
	}

	function changeTask(listId: string, id: string, title: string) {
		setTasks(draft => {
			const task = draft[listId].find(t => t.id === id)
			if (task) {
				task.title = title
			}
		})
	}

	function changeList(listId: string, listTitle: string) {
		setLists(draft => {
			const list = draft.find(l => l.listId === listId)
			if (list) {
				list.listTitle = listTitle
			}
		})
	}

	function removeTask(listId: string, id: string) {
		setTasks(draft => {
			draft[listId] = draft[listId].filter(t => t.id !== id)
		})
	}

	function removeList(listId: string) {
		setLists(lists.filter(l => l.listId !== listId))
		setTasks(draft => {
			delete draft[listId]
		})
	}

	return (
		<div className='app'>
			<Header error={error} setError={setError} addList={addList} />
			{error && <div className='error-message'>{error}</div>}
			<div className='lists'>
				{lists.map(l => (
					<List
						key={l.listId}
						id={l.listId}
						title={l.listTitle}
						tasks={tasks[l.listId]}
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
