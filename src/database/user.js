// @flow

export default (sequelize: Object, DataTypes: Object): Object => {
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        user.belongsTo(models.user, {
          foreignKey: {
            name: "best_friend_id",
            allowNull: true,
            targetKey: "id"
          }
        });
      }
    }
  });

  return user;
}
