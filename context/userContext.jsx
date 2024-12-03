import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)

    // useEffect(() => {
    //     if(!user) {
    //         axios.get('/profile').then(({data}) => {
    //             console.log(data)
    //             setUser(data)
    //         })
    //     }
    // }, [])
    useEffect(() => {
        if (!user) {
            // axios.get('/auth/profile', {withCredentials: true} )
            axios.get('/auth/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }, {withCredentials: true})
                .then(({ data }) => {
                    console.log('Fetched User:', data);
                    setUser(data); 
                })
                .catch((error) => {
                    console.error('Profile fetch error:', error.message);
                    setUser(null); // Fallback to null if the request fails
                });
        }
    }, []);
    
    
    return(
        <UserContext.Provider value={{user, setUser, selectedAddress, setSelectedAddress, }}>
            {children}
        </UserContext.Provider>
    )
}