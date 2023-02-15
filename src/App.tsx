import React, { useState } from 'react'
import './App.css'
import { Task, Todolist } from './Todolist'

type List = {
	listId: number
	listTitle: string
	listTasks: Task[]
}

const initialTasks = [
	{
		listId: 1,
		listTitle: 'Front-end',
		listTasks: []
	},
	{
		listId: 2,
		listTitle: 'Sport',
		listTasks: []
	},
	{
		listId: 3,
		listTitle: 'Books',
		listTasks: []
	}
]
let nextId = 4

export default function App() {
	const [tasks, setTasks] = useState<List[]>(initialTasks)
	const [newList, setNewList] = useState('')

	function addTask(listId: number, title: string) {
		setTasks(
			tasks.map(l =>
				l.listId !== listId ? l : { ...l, listTasks: [...l.listTasks, { id: nextId++, title: title, isDone: false }] }
			)
		)
	}

	function addList(listTitle: string) {
		setTasks([...tasks, { listId: nextId++, listTitle: listTitle, listTasks: [] }])
	}

	function changeIsDone(listId: number, id: number) {
		setTasks(
			tasks.map(l =>
				l.listId !== listId
					? l
					: { ...l, listTasks: l.listTasks.map(lt => (lt.id !== id ? lt : { ...lt, isDone: !lt.isDone })) }
			)
		)
	}

	function removeTask(listId: number, id: number) {
		setTasks(tasks.map(l => (l.listId !== listId ? l : { ...l, listTasks: l.listTasks.filter(lt => lt.id !== id) })))
	}

	function removeList(listId: number) {
		setTasks(tasks.filter(l => l.listId !== listId))
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
