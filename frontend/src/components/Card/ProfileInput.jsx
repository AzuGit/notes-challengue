import React from "react";
import { getInitials } from "../../utils/helper";

function ProfileInput({ userInfo, onLogout }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 items-center justify-center rounded-full text-slate-950 font-me bg-slate-100 flex">
        {getInitials(userInfo?.fullname)}
      </div>
      <div>
        <p className="text-sm font-medium">Angel</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileInput;
