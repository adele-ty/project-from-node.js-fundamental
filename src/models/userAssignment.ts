'use strict';
import { Model } from "sequelize"

interface UserAssigmentAttrs {
  UserId: string,
  GroupId: string,
  id: number
}
module.exports = (sequelize: any, DataTypes: any) => {
  class UserAssignment extends Model<UserAssigmentAttrs>
  implements UserAssigmentAttrs {
    id!: number
    UserId!: string;
    GroupId!: string;

    static associate(models: any) {
      // define association here
    }
  }
  UserAssignment.init({
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    GroupId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: false,
      references: {
        model: 'Groups',
        key: 'id'
      },
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'UserAssignment',
  });
  return UserAssignment;
};
