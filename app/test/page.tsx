"use client";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const carouselSettings = {
  dots: true,
  infinite: true,
  arrows: true,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CarouselComponent = () => {
  return (
    <div className='w-screen h-screen'>
      <div className="carousel-container w-full h-[300px] px-10 bg-[#77767b]">
        <Slider {...carouselSettings}>
          <div className="h-[300px] flex justify-center items-center">
            <img
              src="https://tkd8ihnk8y.ufs.sh/f/SZ9GMeiaP9HCsVvJMP3n5oua8HZp7xcC12WYGi4vtArlfkbO"
              alt="Image 1"
              className="h-[300px] object-cover mx-auto"
            />
          </div>
          <div className="h-[300px] flex justify-center items-center">
            <img
              src="https://tkd8ihnk8y.ufs.sh/f/SZ9GMeiaP9HCBDWIViKtNfzEYKZQD5ijMhTn109kb63USpCR"
              alt="Image 2"
              className="h-[300px] object-cover mx-auto"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default CarouselComponent;
