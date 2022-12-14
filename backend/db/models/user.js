'use strict';



const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');





module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // returns object safe for use in a JWT
    toSafeObject() {
      const { id, username, email } = this; // -> User instance
      return { id, username, email }
    };

    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    static async login ({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          //lets you login with either email or username
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, firstName, lastName, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        hashedPassword
      });


      return await User.scope('currentUser').findByPk(user.id);
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    };
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Spot, {
        through: models.Booking,
        foreignKey: "userId",
        otherKey: "spotId",
        onDelete: "CASCADE",
        hooks: true
      });

      User.belongsToMany(models.Spot, {
        through: models.Review,
        foreignKey: "userId",
        otherKey: "spotId",
        onDelete: "CASCADE",
        hooks: true

      });

      User.hasMany(models.Booking,{
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });

      User.hasMany(models.Review, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true

      });

      User.hasMany(models.Spot, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        hooks: true
      });

    }

  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,256],
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 30] }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 30] }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: {exclude: ["hashedPassword", "createdAt", "updatedAt"]}
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
