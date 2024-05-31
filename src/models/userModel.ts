import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  surname: string;
  firstname: string;
  email: string;
  phoneno: string;
  username: string;
  password: string;
  user_type: string;
  status: string;
  otp: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public surname!: string;
  public firstname!: string;
  public email!: string;
  public phoneno!: string;
  public username!: string;
  public password!: string;
  public user_type!: string;
  public status!: string;
  public otp!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    surname: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    firstname: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    phoneno: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    username: {
      type: new DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(),
      allowNull: false,
      unique: true,
    },
    user_type: {
      type: new DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "bronze",
    },
    status: {
      type: new DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "active",
    },
    otp: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
