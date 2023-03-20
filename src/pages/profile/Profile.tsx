import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../types";

const Profile: React.FC<IProps> = () => {
  const { currentUser } = useSelector((state: IState) => state.users);
  
  return (
    <div>
      <pre>
        {JSON.stringify(currentUser, undefined, 4)}
      </pre>
    </div>
  );
};

export default Profile;

export interface IProps {}