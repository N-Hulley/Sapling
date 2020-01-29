"use strict";

module.exports = {
	name: "userValidation",

	/**
	 * Service settings
	 */
	settings: {
		validUsers:{"admin":"admin","Testuser":"testPassword"}
	},

	/**
	 * Service dependencies
	 */
	dependencies: [],	

	/**
	 * Actions
	 */
	actions: {

		
		/**
		 * Welcome a username
		 *
		 * @param {Object} valid
		 */
		validate: {
			params: {
				username: "string",
				password: "string"
			},
			handler(ctx) {
				return this.validateUser(ctx);
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
		validateUser(ctx) {
			console.log(ctx.params);
			let THIS = this;
			return new Promise(function (resolve) {
				if (THIS.settings.validUsers.hasOwnProperty(ctx.params.username)) {
					let pass = THIS.settings.validUsers[ctx.params.username];
					pass == ctx.params.password ? resolve({valid: true}) : resolve({valid: false});
					
				} else {
					resolve({valid:false});
				}
			});
		}
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