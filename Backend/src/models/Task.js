import { Model } from "sequelize"


const loadModel = (sequelize, DataTypes) => {
    class Task extends Model {

        static associate(models) {
            
        }
    }
}

export default loadModel