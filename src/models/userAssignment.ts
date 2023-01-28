'use strict';
import { Model } from "sequelize"

interface UserAssigmentAttrs {
  UserId: string,
  GroupId: string
}
module.exports = (sequelize: any, DataTypes: any) => {
  class UserAssignment extends Model<UserAssigmentAttrs>
  implements UserAssigmentAttrs {
    UserId!: string;
    GroupId!: string;

    static associate(models: any) {
      // define association here
    }
  }
  UserAssignment.init({
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    GroupId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Groups',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserAssignment',
  });
  return UserAssignment;
};
