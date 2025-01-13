import { UserContext } from "@/utils/UserContext";
import { useContext } from "react";

function Home() {
  
  const { userInfo } = useContext(UserContext);

  return (
    <div className='bg-gray-100 text-center mt-32'>
      HOME, WELCOME @{userInfo.username}!
    </div>
  );
}

export default Home;
