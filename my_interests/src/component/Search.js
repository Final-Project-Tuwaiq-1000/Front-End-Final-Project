import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import "./Search.css"

function Search(){
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/category`)
        .then(response=>{
            setCategories(response.data)
        })
        .catch(err=>{console.log(err.response);})
    },[])

    const SearchTopic=()=>{
        navigate(`/Topic/${search}`)
    }
    return(
        <>
        <div className="logInPage">
            <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <form method="POST" id="signup-form" class="signup-form">
                        <h2 class="">Search</h2>
                        <div class="form-group ">
                        <select id="cars" className="option" onChange={(e)=>setSearch(e.target.value)}>
                            <option value="">Choose Topic</option>
                            {categories.map(e=>{
                                return(
                                <option value={e.id}> {e.category} </option>
                                )
                            })}
                            
                        </select>
                        </div>
                        <div class="form-group">
                            <input type="button" class="form-submit" value="Search" onClick={SearchTopic}/>
                        </div>
                    </form>
                </div>
            </div>
        </section>

            </div>
        </>
    )
}

export default Search