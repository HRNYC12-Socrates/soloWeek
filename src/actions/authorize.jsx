const authUser = (text) => ({
	type: 'AUTH_USER',
	payload : text
});

export default authUser