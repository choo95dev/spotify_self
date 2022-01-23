import { getSession, useSession } from "next-auth/react";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    //initial div always have height of screen to create scrolling effects
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar/>
        <Center/>
      </main>
              {/* <div>player here</div> */}
    </div>
  );
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return{
    props:{
      session
    }
  };
}

