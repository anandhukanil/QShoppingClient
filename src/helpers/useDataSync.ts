import { useDispatch, useSelector } from "react-redux";
import { IState } from "../types";

const useDataSync = () => {
  const dispatch = useDispatch();
  const { currentUser, cartItems } = useSelector((state: IState) => state.users);


};

export default useDataSync;