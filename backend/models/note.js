'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Note extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // Una nota appartiene a un utente
            Note.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            });

        }
    }
    Note.init({
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Note',
    });
    return Note;
};