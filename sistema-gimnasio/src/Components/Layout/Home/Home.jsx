import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext';

const Home = () => {
const { user } = useContext(UserContext);
  return (
    <div>{user?.email}</div>
  )
}

export default Home