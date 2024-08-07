import { useNavigate } from "react-router-dom"

export const UsersContainer: React.FC<any> = ({users:any}) => {

    const navigate = useNavigate()

    return(
        <div>
            <button onClick={()=>navigate("/cars")}>See Your Cars</button>
            <h3>Welcome Admin! Here's where I'd put my Users</h3>
            <h4>(IF I HAD ANY)</h4>
        </div>
    )

}