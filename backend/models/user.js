'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // Un utente ha molte note
            User.hasMany(models.Note, {
                foreignKey: 'user_id', // La chiave esterna nella tabella Note
                as: 'notes' // Un alias opzionale per la relazione
            });

        }
    }
    User.init({
        username: DataTypes.STRING,
        password_hash: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};