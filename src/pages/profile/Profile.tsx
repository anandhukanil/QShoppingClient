import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormComponent, { IProps } from "../../components/FormComponent";
import { addressFields, profileFields } from "../../const/fields";
import { IAddress, IState, IUser, NotificationTypes, Types } from "../../types";
import styles from "../login/styles.module.css";
import "../login/styles.css";
import { updateUser } from "../../apis/users";
import LoadingComponent from "../../components/LoadingComponent";
import { address, profile } from "../../assets";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const Profile: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useSelector((state: IState) => state.users);
  const dispatch = useDispatch();

  const toggleForm = () => {
    setActive((prevState) => !prevState);
  };

  const onProfileUpdate = useCallback((values: Record<string, string>) => {
    setLoading(true);
    const userData = updateUser({...values, email: currentUser?.email} as IUser);
    dispatch({
      type: Types.SET_CURRENT_USER,
      payload: {...userData, hash: ""}
    });
    dispatch({
      type: Types.SET_NOTIFICATION,
      payload: { type: NotificationTypes.Success, message: "Profile Updated!" }
    });
    setLoading(false);
  }, [currentUser]);

  const onAddressUpdate = useCallback((values: Record<string, string>) => {
    setLoading(true);
    const userData = updateUser({...currentUser, address: values as unknown as IAddress } as IUser);
    dispatch({
      type: Types.SET_CURRENT_USER,
      payload: {...userData, hash: ""}
    });
    dispatch({
      type: Types.SET_NOTIFICATION,
      payload: { type: NotificationTypes.Success, message: "Address Updated!" }
    });
    setLoading(false);
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className={styles.section}>
        <LoadingComponent />
      </div>
    );
  }
  
  return (
    <div className={styles.section}>
      <div className={`${styles.container} ${active ? styles.active : ""}`}>
        <div className={`${styles.user} ${styles.signinBx}`}>
          <div className={styles.imgBx}>
            <img src={profile} alt="Profile" />
          </div>
          <div className={styles.formBx + " loginWrapper"}>
            <div className="login-form">
              <div className="login-form-inner">
                <div className="logo">
                  <button onClick={toggleForm} className="left" >
                    <FaArrowLeft />
                    Go to address
                  </button>
                </div>
                <FormComponent
                  title="Profile"
                  description="Welcome to your profile"
                  submitButtonText="Save"
                  fields={profileFields}
                  values={currentUser as unknown as IProps["values"]}
                  onSubmit={onProfileUpdate}
                  disableSubmit={loading}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.user} ${styles.signupBx}`}>
          <div className={styles.formBx + " loginWrapper"}>
            <div className="login-form">
              <div className="login-form-inner">
                <div className="logo">
                  <button onClick={toggleForm} className="right" >
                      Go to profile
                    <FaArrowRight />
                  </button>
                </div>
                <FormComponent
                  title="Address"
                  description="Add an address for shipping"
                  submitButtonText="Save"
                  fields={addressFields}
                  values={currentUser?.address as IProps["values"]}
                  onSubmit={onAddressUpdate}
                  disableSubmit={loading}
                />
              </div>
            </div>
          </div>
          <div className={styles.imgBx}>
            <img src={address} alt="Address" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;