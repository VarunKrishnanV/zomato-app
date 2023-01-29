// we have created this file to simplify the importing multiple models again and again in different files

// we dont want to include index.js at the end as the file name is index and the server automatically look for index file by default

import { FoodModel } from "./food";
import { ImageModel } from "./image";
import { MenuModel } from "./menu";
import { OrderModel } from "./order";
import { RestaurantModel } from "./restaurant";
import { ReviewModel } from "./review";
import { UserModel } from "./user";

export {
    FoodModel,
    ImageModel,
    MenuModel,
    OrderModel,
    RestaurantModel,
    ReviewModel,
    UserModel,
};
