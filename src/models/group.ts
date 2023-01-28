'use strict'
import { Model } from 'sequelize'
import { Group as GroupAttributes, Permission } from '../entity/group'

module.exports = (sequelize: any, DataTypes: any) => {
  class Group extends Model<GroupAttributes>
  implements GroupAttributes{
    id!: string;
    name!: string;
    permissions!: Array<Permission>;

    static associate (models: any) {
      Group.belongsToMany(models.User, { through: 'UserAssignments' })
    }
  }
  Group.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group'
  })
  return Group
}
