import { useEffect,useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

const ScrollTopButtom = () => {
    const [isVisible, setIsVisible] = useState(false);  
    useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
    function scrollToTop(){
        return window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible&&(
        <button
          onClick={scrollToTop}
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 animate-bounce"
        >
          <HiArrowUp className="size-6" />
        </button>
      )}
    </div>
  )
}

export default ScrollTopButtom
