"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER, // int 타입으로 설정
        primaryKey: true, // 주요 키로 설정
        autoIncrement: true // 자동 증가 설정
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Users"
    }
  );
  return Users;
};
