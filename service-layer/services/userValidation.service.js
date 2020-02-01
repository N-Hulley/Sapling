"use strict";

module.exports = {
	name: "userValidation",

	/**
	 * Service settings
	 */
	settings: {
		validTokens: {
			// These are for testing
			"0c814ba9-6642-4695-8439-4b27a02bf0cf": "ae89f698-d5d0-4302-aeb8-69a71077e0eb",
			"91ec4e53-f3d9-4746-a92d-df744ba76654": "99e901ed-8f9a-4a5f-b9dc-9f268b6db7c1",
			"c368487e-a21a-4b30-bcca-a4164b3f1047": "09f4ef78-efbd-4f5e-b7c1-02bf7e2111da",
			"8cd8e466-de0e-48ab-92f6-253682f7268e": "494e41a6-1ab0-4679-a926-199d3c92fdcc"
		},
		mongoConfig: {
			uri: `mongodb+srv://nickhulley:6E-bnP7csrk9uvQ@cluster0-4ujmf.mongodb.net/test?retryWrites=true&w=majority`
		}
	},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		firstInsert: {
			params: {
				userID: "string",
				loginToken: "string",
				fname: "string",
				lname: "string",
				goal: "string",
			},
			handler(ctx) {
				return this.firstInsert(ctx);
			}

		},
		goalCompleted: {
			params: {
				userID: "string",
				loginToken: "string",
			},
			handler(ctx) {
				return this.goalCompleted(ctx);
			}

		},
		validate: {
			params: {
				userID: "string",
				loginToken: "string"
			},
			handler(ctx) {
				return this.validateUser(ctx);
			}
		},
		getGoal: {
			params: {
				userID: "string"
			},
			handler(ctx) {
				return this.getGoal(ctx);
			}
		},
		ping() {
			return "pong";
		},

	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
		firstInsert(ctx) {

			let response = {
				code: 200
			}
			return new Promise(function (resolve) {
				const MongoClient = require('mongodb').MongoClient;
				const uri = mongoConfig.uri;
				const client = new MongoClient(uri, { useNewUrlParser: true });
				client.connect(err => {
					const collection = client.db("Sapling").collection("Users");
					// perform actions on the collection object
					let newData = {
						userID: ctx.params.userID,
						loginToken: ctx.params.loginToken,
						fname: ctx.params.fname,
						lname: ctx.params.lname,
						goal: ctx.params.goal,
						email: ctx.params.email,
						goalCompleted: false,
						goalCompletedTime: new Date(),
						streak: 0,
						following: [],
						followers: [],
						loving: [],
						lovers: [],
						sharedby: [],
					}
					if (!newData.userID === "sampleNew")
						collection.insertOne(newData);
					response.user = newData;
					client.close();
					resolve(response);

				});
			})

		},
		setGoal(ctx) {
			resolve("aaa");

		},
		getGoal(ctx) {
			const MongoClient = require('mongodb').MongoClient;
			const uri = this.settings.mongoConfig.uri;
			const client = new MongoClient(uri, { useNewUrlParser: true });
			client.connect(err => {
				const collection = client.db("Sapling").collection("Users");
				// perform actions on the collection object

				client.close();
				resolve("aaa");

			});

		},
		validateUser(ctx) {
			let response = {
				code: 200,
				valid: false,
				newUser: false
			}
			let THIS = this;
			return new Promise(function (resolve) {
				if (THIS.settings.validTokens.hasOwnProperty(ctx.params.userID)) {
					let token = THIS.settings.validTokens[ctx.params.loginToken];
					token == ctx.params.loginToken ? response.valid = true : response.valid = false;
					if (response.valid) {
						const MongoClient = require('mongodb').MongoClient;
						const uri = THIS.settings.mongoConfig.uri;
						const client = new MongoClient(uri, { useNewUrlParser: true });

						client.connect(err => {
							const collection = client.db("Sapling").collection("Users");
							// perform actions on the collection object
							let query = {
								userID: ctx.params.userID
							}
							collection.find(query).toArray(function (err, result) {
								if (err) throw err;
								console.log(result);
								client.close();
								response.user = result[0];
								resolve(response);

							});
							resolve(response);

						});
					} else {

					}
				} else {
					response.newUser = true;
					resolve(response);
				}
			});
		},

		goalCompleted(ctx) {
			let THIS = this;
			return new Promise(async function (resolve) {

				let response = await THIS.validateUser(ctx);
				console.log("RESPONSE", response.user);

				response.user.streak++;
				let lastDate = new Date(response.user.goalCompletedTime);
				let currentDate = new Date();
				response.user.goalCompleted = true;
				// if (lastDate > currentDate - 1) {
				// 	response.user.streak++;
				// }
				let query = { userID: response.user.userID }
				response.user.goalCompletedTime = currentDate;

				const MongoClient = require('mongodb').MongoClient;
				const uri = THIS.settings.mongoConfig.uri;
				const client = new MongoClient(uri, { useNewUrlParser: true });
				var newvalues = { $set: { streak: response.user.streak, goalCompleted: response.user.goalCompleted, goalCompletedTime: response.user.goalCompletedTime } }
				client.connect(err => {
					const collection = client.db("Sapling").collection("Users");
					collection.findOneAndUpdate(query, newvalues, { returnOriginal: false }, function (err, result) {
						if (err) throw err;
						console.log(result);
						client.close();
						resolve(response);

					});
				});


			});

		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};