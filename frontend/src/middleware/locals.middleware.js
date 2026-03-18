const setLocals = async (req, res, next) => {
	try {
		const response = await fetch(`http://localhost:8001/auth/check`, {
			headers: { cookie: req.headers.cookie || "" },
		});

		if (response.ok) {
			const data = await response.json();
			res.locals.user = data.user;
		} else {
			res.locals.user = null;
		}
	} catch {
		res.locals.user = null;
	}
	next();
};
