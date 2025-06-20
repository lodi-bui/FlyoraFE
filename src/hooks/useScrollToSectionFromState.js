import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToSectionFromState = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);
};

export default useScrollToSectionFromState;