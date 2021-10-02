module.exports = (sequelize, Sequelize) => {
  const Url = sequelize.define("url", {
    longUrl: {
      type: Sequelize.STRING,
    },
    alias: {
      type: Sequelize.STRING,
    },
  });

  return Url;
};
