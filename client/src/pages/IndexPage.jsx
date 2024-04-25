import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage(){
const [places,setPlaces] = useState([]);
const [showBackToTop, setShowBackToTop] = useState(false);
useEffect(() => {
  axios.get('/places').then(response => {
    setPlaces(response.data);
  });
  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    setShowBackToTop(scrollY > windowHeight / 2 && scrollY < documentHeight - windowHeight / 2);
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

    return(
      <div>
      <div className="flex justify-center items-center py-5">
        <img className="flex"src="/hero.png" alt="" />
        <h1 className="text-4xl font-semi-bold text-gray-700 mb-5">Find stays to make memories</h1>
      </div>
        <div className="mt-5 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {places.length > 0 && places.map(place =>(
            <Link to={'/place/'+place._id}>
             <div className="bg-gray-500 mb-2 rounded-2xl flex">
             {place.photos?.[0] &&(
                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos?.[0]}/>
             )}
             </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1">
                 <span className="font-bold">€{place.price}</span> per night
                </div>
            </Link>
          ))} 
        </div>
        {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-400  text-white px-4 py-2 rounded-3xl"
        >
          Back to Top
        </button>
      )}
    </div>
  );
}