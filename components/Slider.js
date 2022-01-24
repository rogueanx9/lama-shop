import { useState } from "react";
import { sliderItems } from "../data";
import { isHovered } from "../utilities/isHovered";

function Slider() {
  const [hoveredLeft, togglerHoverLeft] = isHovered();
  const [hoveredRight, togglerHoverRight] = isHovered();
  const [slideIdx, setSlideIdx] = useState(0);

  const handleClick = (dir) => {
    if (dir == "left") {
      setSlideIdx(slideIdx > 0 ? slideIdx - 1 : sliderItems.length - 1);
    } else {
      setSlideIdx(slideIdx < sliderItems.length - 1 ? slideIdx + 1 : 0);
    }
  };

  return (
    <div className="slider">
      <div
        className="arrow arrow--left"
        onMouseEnter={togglerHoverLeft}
        onMouseLeave={togglerHoverLeft}
        onClick={() => handleClick("left")}
      >
        <i className={`bi bi-caret-left${hoveredLeft ? "-fill" : ""}`}></i>
      </div>

      <div
        style={{ transform: `translate(-${slideIdx * 100}vw)` }}
        className="wrapper"
      >
        {sliderItems.map((item, idx) => {
          return (
            <div
              key={item.id}
              style={{ backgroundColor: `#${item.bg}` }}
              className="slide"
            >
              <div className="imgCont">
                <img src={item.img} alt="" />
              </div>
              <div className="infoCont">
                <h1 className="title">{item.title}</h1>
                <p className="desc">{item.desc}</p>
                <button className="button">SHOP NOW</button>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="arrow arrow--right"
        onMouseEnter={togglerHoverRight}
        onMouseLeave={togglerHoverRight}
        onClick={() => handleClick("right")}
      >
        <i className={`bi bi-caret-right${hoveredRight ? "-fill" : ""}`}></i>
      </div>
    </div>
  );
}

export default Slider;
