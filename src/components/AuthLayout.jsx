import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


export default function Protected({children,authentication=true}) {
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
    const [loader,setLoader] = useState(true)

    useEffect(()=>{

        // if(authStatus === true){
        //     navigate("/login")
        // }else if(authStatus === false){
        //     navigate("/")
        // }

        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,authentication,navigate])


  return loader ? <h1>Loading...</h1> : <>{children}</>
}


