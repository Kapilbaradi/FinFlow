const ImageComponent = () => {
  return (
    <>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 cursor-pointer stroke-gray-700 sm:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </div>
      <div className="hidden sm:block w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/djppjdulx/image/upload/v1747556794/defaultUser_bvigjn.png"
          alt="User defaulf image"
          className="rounded-full block max-w-full cursor-pointer"
        />
      </div>
    </>
  );
};

export default ImageComponent;
