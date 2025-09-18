import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { ThemeContext } from '../context';

function Dashboard() {

  let navigate = useNavigate();

  let { username } = useContext(ThemeContext)

  useEffect(() => {
    !username && navigate('/')
  }, [username])

  return (
    <>
      {!username || username == null && <div>please login first</div>}
      {username && <div>welcome {username}</div>}
    </>
  )
}

export default Dashboard