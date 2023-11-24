"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      models.Comments.belongsTo(models.Users, {
        foreignKey: "user_id",
        targetKey: "id"
      });
      models.Comments.belongsTo(models.Contents, {
        foreignKey: "contents_id",
        targetKey: "id"
      });
    }
  }
  Comments.init(
    {
      contents_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      comments: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Comments"
    }
  );
  return Comments;
};
