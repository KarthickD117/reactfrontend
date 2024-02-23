import { useState, useEffect } from "react";
import { axiosEvent } from "../axiosEvent";

const useAxios =(url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const axiosData = async () => {
            try{
                const resp = await axiosEvent.get(url)
                setData(resp.data)
            }
            catch (error){
                setError(error)
            }
            finally{
                setLoading(false)
            }
        }
        axiosData()
    },[url])
    return {data, error,loading}
}
export default useAxios;