import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const WeeklyReport = sequelize.define(
  "WeeklyReport",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    week_start: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    completion_rate: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    top_failure_reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    recommendations: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "weekly_reports",
    timestamps: false
  }
);
