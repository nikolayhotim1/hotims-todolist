import React, { useState } from 'react'
import { useImmer } from 'use-immer'
import './App.css'
import { initialTasks } from './initialTasks'
import { Task, Todolist } from './Todolist'

type List = {
	listId: number
	listTitle: string
	listTasks: Task[]
}

let nextId = 8

export default function App() {
	const [tasks, updateTasks] = useImmer<List[]>(initialTasks)
	const [newList, setNewList] = useState('')

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

	function removeTask(listId: number, id: number) {
		updateTasks(draft => {
			draft.map(l => (l.listId !== listId ? l : (l.listTasks = l.listTasks.filter(lt => lt.id !== id))))
		})
	}

	function removeList(listId: number) {
		updateTasks(draft => draft.filter(l => l.listId !== listId))
	}

	return (
		<div className='App'>
			<h1>Todolist</h1>
			<input placeholder='New list' onChange={e => setNewList(e.currentTarget.value)} value={newList} />{' '}
			<button
				onClick={() => {
					setNewList('')
					addList(newList)
				}}
			>
				Add
			</button>
			<div className='todolist'>
				{tasks.map(l => (
					<Todolist
						key={l.listId}
						id={l.listId}
						title={l.listTitle}
						tasks={l.listTasks}
						removeTask={removeTask}
						removeList={removeList}
						changeIsDone={changeIsDone}
						addTask={addTask}
					/>
				))}
			</div>
		</div>
	)
}
