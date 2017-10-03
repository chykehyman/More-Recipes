/** Users database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Users model
 */
export default (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Users.associate = (models) => {
        Users.hasMany(models.Recipes, {
            foreignKey: 'userId',
            as: 'userId'
        });
        Users.hasMany(models.Reviews, {
            foreignKey: 'userId',
            as: 'userId'
        });
        Users.hasMany(models.Favorites, {
            foreignKey: 'userId',
            as: 'userId'
        });
        Users.hasMany(models.Upvotes, {
            foreignKey: 'userId',
            as: 'userId'
        });
        Users.hasMany(models.Downvotes, {
            foreignKey: 'userId',
            as: 'userId'
        });
    };
    return Users;
};