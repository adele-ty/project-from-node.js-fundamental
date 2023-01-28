'use strict'
import {
  Model
} from 'sequelize'

interface UserAttributes {
  id: string,
  email: string,
  password: string,
  age: number,
  login: string,
  isDeleted: boolean
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> 
  implements UserAttributes{
    id!: string;
    email!: string;
    password!: string;
    age!: number;
    login!: string;
    isDeleted!: boolean

    static associate (models: any) {
      User.belongsToMany(models.Group, { through: 'UserAssignments' })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
