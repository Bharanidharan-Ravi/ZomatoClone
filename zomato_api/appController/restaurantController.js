const { response, request } = require("express");
const restaurantModel = require ("../model/restaurantModel");
const MenuItemsModel = require("../model/menuItemModel");

module.exports.getRestaurantByLocationId = async (request,response) =>{
    let {loc_id} = request.params;
    try {
        let filter = {location_id: loc_id};
        let projection = {
            name: 1,
            city: 1,
            image: 1,
            locality: 1,
            location_id: 1,
            city_id: 1,
        };
        let restaurantList = await restaurantModel.find(filter, projection);
        let sendData = {
            status: restaurantList.length === 0 ? false : true,
            restaurantList,
            count: restaurantList.length,
          };
          response.status(200).send(sendData);
        } catch (error) {
          let errorObj = { status: false, error };
          response.status(500).send(errorObj);
        }
};

module.exports.getRestaurantDetailsByRestaurantId = async (request, response) => {
    let { id } = request.params;
    try {
      let restaurant = await restaurantModel.findById(id);
      let sendData = {
        status: restaurant.length === 0 ? false : true,
        restaurant,
        count: restaurant.length,
      };
      response.status(200).send(sendData);
    } catch (error) {
      let errorObj = { status: false, error };
      response.status(500).send(errorObj);
    }
  };

  module.exports.getMenuItemsByRestaurantId = async (request, response) => {
    let { r_id } = request.params;
    try {
      let MenuItemList = await MenuItemsModel.find({ restaurantId: r_id });
      let sendData = {
        status: MenuItemList.length === 0 ? false : true,
        MenuItemList,
        count: MenuItemList.length,
      };
      response.status(200).send(sendData);
    } catch (error) {
      let errorObj = { status: false, error };
      response.status(500).send(errorObj);
    }
  };