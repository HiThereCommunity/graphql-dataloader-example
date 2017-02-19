// @flow

export default (sequelize: Object, DataTypes: Object): Object => {
  const friend = sequelize.define('friend', {},
  {
    classMethods: {
      associate: (models) => {
        friend.belongsTo(models.user, {
          foreignKey: {
            name: "from_id",
            allowNull: false,
            targetKey: "id"
          }
        });

        friend.belongsTo(models.user, {
          foreignKey: {
            name: "to_id",
            allowNull: false,
            targetKey: "id"
          }
        });
      }
    }
  });

  return friend;
}
