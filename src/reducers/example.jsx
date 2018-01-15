export default function exampleReducer (state={
	auth: null,
	user: 'Bob',
	password: 'NotPassword',
	fetching: false,
	fetched: false,
	error: null
}, action){
	console.log('action.type', action.type)

	switch (action.type) {
		case 'CHANGE_EXAMPLE' : {
			return {
				user: action.payload.username,
				password: action.payload.password,
				foo: state.foo,
				fetching: true,
				fetched: state.fetched,
				error: state.error
			}
		}
		case 'FETCH_EXAMPLE_REJECTED' : {
			return {
				foo: state.foo,
				fetching: false,
				fethced: state.fethced,
				error: action.payload
			}
		}
		case 'FETCH_EXAMPLE_FULFILLED' : {
			return {
				error: state.error,
				fetching: false,
				fetched: true,
				foo: action.payload
			}
		}
		default : {
			return state
		}

	}
}