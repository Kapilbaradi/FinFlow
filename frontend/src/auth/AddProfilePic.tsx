import { useState, useRef, ChangeEvent } from "react";

import AuthWrapper from "./AuthWrapper";

function AddProfilePic() {
  const [previewImage, setPreviewImage] = useState<string>(
    `https://res.cloudinary.com/djppjdulx/image/upload/v1747556794/defaultUser_bvigjn.png`
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const triggerHandleUserImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      const imageFileReader = new FileReader();
      imageFileReader.onloadend = () => {
        setPreviewImage(imageFileReader.result as string);
      };
      imageFileReader.readAsDataURL(image);
    }
  };
  return (
    <AuthWrapper
      header="Add Your Profile Pic"
      description="Add your image"
      buttonText="Create Account"
    >
      <div className="basis-1/2 justify-end gap-2 flex flex-col justify-center items-center">
        <div className="mb-3">
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden mx-auto">
            <img
              src={previewImage}
              alt="User defaulf image"
              className="rounded-full block max-w-full cursor-pointer"
              onClick={triggerHandleUserImage}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleImageChange}
            name="profilePic"
          />
        </div>
      </div>
    </AuthWrapper>
  );
}

export default AddProfilePic;
