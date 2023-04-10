import React, { useCallback, useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";


const Profile: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useSelector((state: IState) => state.users);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.type === "address") {
      setActive(true);
    } else if (location?.state?.type === "profile") {
      setActive(false);
    }
  }, [location?.state]);

  const toggleForm = () => {
    setActive((prevState) => !prevState);
  };

  const onProfileUpdate = useCallback(async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const response = await updateUser(values as unknown as IUser, currentUser?.id as string);
      dispatch({
        type: Types.SET_CURRENT_USER,
        payload: response.data
      });
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Success, message: "Profile Updated!" }
      });
    } catch (error) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Failed To Update Profile!" }
      });
    }
    setLoading(false);
  }, [currentUser]);

  const onAddressUpdate = useCallback(async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const response = await updateUser(
      { address: values as unknown as IAddress } as IUser,
      currentUser?.id as string
      );
      dispatch({
        type: Types.SET_CURRENT_USER,
        payload: response.data
      });
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Success, message: "Address Updated!" }
      });
    } catch (error) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Failed To Update Address!" }
      });
    }
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