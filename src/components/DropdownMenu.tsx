import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IMenuItem } from "../types";
import "./dropDown.css";

const DropdownMenu: React.FC<IProps> = (props) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };
  
  return (
    <div
      className='dropdown'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='dropdown-header'>
        {props.labelComponent ? <props.labelComponent /> : props.label}
        {!props.hideChevronIcon && <FaChevronRight className={`icon ${isOpen && "open"}`} />}
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {props.menuItems?.map((item) => (
          item.element
            ? <item.element key={item.path} />
            : ( 
              <div
                key={item.path}
                className="dropdown-item"
                onClick={item.onClick}
              >
                <Link to={item.path}>
                  {item.icon && <item.icon />}
                  {item.label}
                </Link>
              </div>
            )
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;

export interface IProps {
  label: string;
  menuItems: IMenuItem[];
  labelComponent?: React.FC;
  hideChevronIcon?: boolean;
}