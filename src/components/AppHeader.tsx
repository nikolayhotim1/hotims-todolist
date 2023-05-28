import { AppHeaderProps } from '../types/types'
import { AddForm } from './AddForm'

export function AppHeader({ addList }: AppHeaderProps) {
	function handleAddList(title: string) {
		addList(title)
	}

	return (
		<div className='app-header'>
			<h1>Todolist</h1>
			<AddForm content='list' onAdd={handleAddList} />
		</div>
	)
}
