import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    //initial div always have height of screen to create scrolling effects
    <div className="bg-black h-screen overflow-hidden">
      <main className="">
        <Sidebar/>
        {/* Center */}
        {/* <div>player here</div> */}
      </main>
    </div>
  );
}
