import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormComponent, { IProps } from "../../components/FormComponent";
import { profileFields } from "../../const/fields";
import { IState, IUser, Types } from "../../types";
import styles from "../login/styles.module.css";
import "../login/styles.css";
import { updateUser } from "../../apis/users";


const Profile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useSelector((state: IState) => state.users);
  const dispatch = useDispatch();

  const onProfileUpdate = (values: Record<string, string>) => {
    setLoading(true);
    const userData = updateUser(values as unknown as IUser);
    dispatch({
      type: Types.SET_CURRENT_USER,
      payload: {...userData, hash: ""}
    });
    setLoading(false);
  };
  
  return (
    <div className={styles.section}>
      <div className={`${styles.container}`}>
        <div className={`${styles.user} ${styles.signinBx}`}>
          {/* <div className={styles.imgBx}>
            <img src={login} alt="" />
          </div> */}
          <div className={styles.formBx + " loginWrapper"}>
            <div className="login-form">
              <div className="login-form-inner">
                <FormComponent
                  title="Profile"
                  description="Welcome to your profile"
                  submitButtonText="Save"
                  fields={profileFields}
                  values={currentUser as IProps["values"]}
                  onSubmit={onProfileUpdate}
                  disableSubmit={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;