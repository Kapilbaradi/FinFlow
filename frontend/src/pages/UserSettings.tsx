import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import clsx from "clsx";

const settingList = [
  {
    d: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
    setting: "Change Username",
  },
  {
    d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
    setting: "Change Email",
  },
  {
    d: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
    setting: "Change Password",
  },
  {
    d: "M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9",
    setting: "Logout",
  },
];

const UserSettings = () => {
  const navigate = useNavigate();

  //This function is used to navigate between user settings pages.
  const handleNavigation = (event: MouseEvent) => {
    //grabing the child element i.e <p>
    const childElement = event.currentTarget.children[1];
    // getting the id of the element which is used to navigate between user settings. The id is same as the url
    const navigateElement = childElement.id;
    navigate(`${navigateElement}`);
  };

  return (
    <div>
      <div className="p-4 w-[225px] h-[225px] rounded-full overflow-hidden mx-auto relative">
        <img
          src="https://res.cloudinary.com/djppjdulx/image/upload/v1747556794/defaultUser_bvigjn.png"
          alt="User defaulf image"
          className="rounded-full block max-w-full cursor-pointer"
        />
        <div className="bg-[#636AE8FF] p-2 rounded-full cursor-pointer absolute z-3 bottom-7 end-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-[15px] h-[15px] stroke-white stroke-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
      <div className="text-lg text-center">Username</div>
      <div className="my-4 p-4">
        {settingList.map((setting, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "border-b-1 border-gray-400 p-4 flex items-center cursor-pointer",
                index === 0 ? "border-t" : "border-t-0"
              )}
              onClick={handleNavigation}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={setting.d}
                  />
                </svg>
              </div>
              <p
                className="px-2"
                id={`${setting.setting.replace(/\s+/g, "-").toLowerCase()}`} // replacing all the white space present in the text to - and changing the text in lower case.
              >
                {setting.setting}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSettings;
