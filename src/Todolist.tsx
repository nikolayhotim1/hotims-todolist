import React from 'react'
import { FilterValues } from './App'

export type Task = {
	id: number
	title: string
	isDone: boolean
}

type Props = {
	title: string
	tasks: Task[]
	removeTask: (id: number) => void
	changeIsDone: (id: number) => void
	changeFilter: (value: FilterValues) => void
}

export function Todolist({ title, tasks, removeTask, changeIsDone, changeFilter }: Props) {
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input />
				<button>+</button>
			</div>
			<ul>
				{tasks.map(t => (
					<li key={t.id}>
						<input type='checkbox' checked={t.isDone} onChange={() => changeIsDone(t.id)} />
						<span>{t.title}</span>
						<button onClick={() => removeTask(t.id)}>X</button>
					</li>
				))}
			</ul>
			<div>
				<button onClick={() => changeFilter('all')}>All</button>
				<button onClick={() => changeFilter('active')}>Active</button>
				<button onClick={() => changeFilter('completed')}>Completed</button>
			</div>
		</div>
	)
}
