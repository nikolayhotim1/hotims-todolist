import React, { useState } from 'react'
import './App.css'
import { Task, Todolist } from './Todolist'

type List = {
	listId: number
	listTitle: string
	listTasks: Task[]
}

const tasksForTodolist = [
	{
		listId: 1,
		listTitle: 'Front-end',
		listTasks: [
			{ id: 1, title: 'HTML & CSS', isDone: true },
			{ id: 2, title: 'JS & TS', isDone: true },
			{ id: 3, title: 'React & Redux', isDone: true },
			{ id: 4, title: 'Next', isDone: true },
			{ id: 5, title: 'Redux Toolkit', isDone: false },
			{ id: 6, title: 'Socket.IO', isDone: false },
			{ id: 7, title: 'Apollo GraphQL', isDone: false },
			{ id: 8, title: 'Ant Design', isDone: true },
			{ id: 9, isDone: true, title: 'Jest & Unit tests' },
			{ id: 10, isDone: false, title: 'Zustand' }
		]
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
let nextTaskId = 11

export default function App() {
	const [tasks, setTasks] = useState<List[]>(tasksForTodolist)

	function addTask(listId: number, title: string) {
		setTasks(
			tasks.map(l =>
				l.listId !== listId ? l : { ...l, listTasks: [...l.listTasks, { id: nextTaskId++, title: title, isDone: false }] }
			)
		)
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

	return (
		<div className='App'>
			{tasks.map(l => (
				<Todolist
					key={l.listId}
					listId={l.listId}
					title={l.listTitle}
					tasks={l.listTasks}
					removeTask={removeTask}
					changeIsDone={changeIsDone}
					addTask={addTask}
				/>
			))}
		</div>
	)
}
