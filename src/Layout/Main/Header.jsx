import logo from "../../assets/randomProfile2.jpg";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";
import { Link } from "react-router-dom";

const Header = () => {

  const { data: userData, isLoading, refetch, isError } = useFetchAdminProfileQuery();

  const tempImg = userData?.data?.image?.startsWith("http") ? userData?.data?.image : `${import.meta.env.VITE_BASE_URL}${userData?.data?.image}`;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-secondary">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5 justify-end">
      <Link to="/profile" className="flex gap-2 items-center justify-center">
        <img
          style={{
            clipPath: "circle()",
            width: 45,
            height: 45,
          }}
          src={userData?.data?.image ? tempImg : logo}
          alt="profile"
          className="clip"
        />
        <span className="flex pr-2 flex-col text-white">
          <span className="text-xl">{userData?.data?.fullName || "Admin"}</span>
        </span>
      </Link>
    </div>
  );
};

export default Header;
