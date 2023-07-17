const HttpError = (status, message) => {
	// create error
	const error = new Error(message);
	error.status = status;
	return error

	// throw error // 
}

module.exports = HttpError;