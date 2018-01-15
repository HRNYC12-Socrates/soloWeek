const Sequelize = require('sequelize')
const sequelize = new Sequelize('daa5f39q159b0d','fageyjgnpeswxg', 'a152825a4f7dcb7f48bf1d60f117fb7dc1608c8424ac6036622c34610df966fc', {
  host: 'ec2-23-21-201-255.compute-1.amazonaws.com',
  dialect: 'postgres' || 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const User = sequelize.define('User', {
  username: {
  	type: Sequelize.STRING
  },
  password: {
  	type: Sequelize.STRING
  },
  goals: {
  	type: Sequelize.TEXT
  }
})

User.sync({force: false})

const Photos = sequelize.define('Photos', {
	user: {
		type: Sequelize.INTEGER
	},
	pic: {
		type: Sequelize.BLOB('long')
	}
})

Photos.sync({force: false})

const Week = sequelize.define('Week', {
	user: {
		type: Sequelize.INTEGER
	},
	    monday: {
		type: Sequelize.INTEGER
	},
		tuesday: {
		type: Sequelize.INTEGER
	},
		wednesday: {
		type: Sequelize.INTEGER
	},
		thursday: {
		type: Sequelize.INTEGER
	},
		friday: {
		type: Sequelize.INTEGER
	},
		saturday: {
		type: Sequelize.INTEGER
	},
		sunday: {
		type: Sequelize.INTEGER
	},
})

Week.sync({force: false})

const Workout = sequelize.define('Workout', {
	name: {
		type: Sequelize.STRING
	},
	payload: {
		type: Sequelize.TEXT
	}
})

Workout.sync({force: false})

const Measurements = sequelize.define('Measurement', {
	userId: {
		type: Sequelize.INTEGER
	},
	daySince: {
		type: Sequelize.FLOAT
	},
	payload: {
		type: Sequelize.TEXT
	}
})

Measurements.sync({force: false})


const DailyLog = sequelize.define('DailyLog', {
	date: {
		type: Sequelize.DATE
	},
	user: {
		type: Sequelize.INTEGER,
		default: 1
	},
	workout: {
		type: Sequelize.TEXT
	}
})

DailyLog.sync({force: false})



module.exports = {
  sequelize: sequelize,
  User: User,
  DailyLog: DailyLog,
  Week: Week,
  Workout: Workout,
  Measurements: Measurements,
  Photos: Photos
}