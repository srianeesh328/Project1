import axios from "axios"
import { useEffect, useState } from "react"
import { Car } from "./Car"
import { CarInterface } from "../../interfaces/CarInterface"
import "./CarContainer.css"

export const CarContainer: React.FC = () => {

    //We could have stored a base URL here for cleaner requesting
    //const baseUrl = "http://localhost:8080/cars" 

    //we'll store state that consists of an Array of CarInterface objects
    const [cars, setCars] = useState<CarInterface[]>([]) //start with empty array

    //I want to get all pokemon when the component renders, so we'll use useEffect
    useEffect(() => {
        getAllCars()
    }) //this triggers on component load and state change

    //GET request to server to get all pokemon
    const getAllCars = async () => {

        //our GET request 
        //TODO: send withCredentials to confirm the user is logged in)
        const response = await axios.get("http://localhost:8080/cars")

        //populate the car state  
        setCars(response.data)

        console.log(response.data)

    }

    return(
        <div className="collection-container">

            {/* using map(), for every car that belongs to the logged in user... 
            Display one car component, and a button to delete it*/}
            {cars.map((car, index) => 
                <div>
                    <Car {...car}></Car>
                    <button>Delete</button>
                </div>
           )}

            {/*If you need to render multiple elements in map(), they need to be in a <div> */}

        </div>
    )
}