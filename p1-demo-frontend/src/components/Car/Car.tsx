import { CarInterface } from "../../interfaces/CarInterface"
import "./Car.css"

export const Car: React.FC<CarInterface> = (car:CarInterface) => {


    return(
        <div className="car-container">
                <h3>{car.make}</h3>
                <h3>{car.model}</h3>
        </div>
    )

}