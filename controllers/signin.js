const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body

	if(!email || !password){
		return res.status(400).json('invalid information, cannot leave blank fields when sigining in!');
	}

	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(loginUser => {
			const isValid =  bcrypt.compareSync(password, loginUser[0].hash);
			if(isValid){
				// return here so the outer db knows about it
				return db.select('*').from('users')
				  .where('email', '=', email)
				  .then(user => {
					res.json(user[0])		
				   })
				  .catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('unable to login')		
			}
		})
		.catch(err => res.status(400).json('unable to login'))
}

module.exports = {
	handleSignin: handleSignin
};