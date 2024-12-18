module.exports = (sequelize, DataTypes) => {
  const itineraryItem = sequelize.define(
    "itineraryItem",
    {
      itineraryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: "itinerary",
          key: "id",
        },
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { 
      timestamps: true, 
    }
  );

  itineraryItem.associate = (models) => {
    itineraryItem.belongsTo(models.itinerary, { foreignKey: "itineraryId" });
  };

  return itineraryItem;
};
