'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users', // Nome della tabella a cui si riferisce
                    key: 'id'       // Colonna della tabella a cui si riferisce
                },
                onUpdate: 'CASCADE', // Se un utente cambia id, aggiorna anche qui
                onDelete: 'CASCADE'  // Se un utente viene cancellato, cancella anche le sue note
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notes');
    }
};