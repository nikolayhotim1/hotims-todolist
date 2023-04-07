import { ErrorMessage } from './../types/types'

export default function inputValidator(input: string, setError: (value: ErrorMessage | null) => void) {
	if (input.trim() !== '') {
		return true
	} else {
		setError('Title is required')
	}
}
