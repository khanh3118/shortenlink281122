import styled from "styled-components";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";

export default function Header() {
  const [isExpand, setIsExpand] = useState(false);

  useEffect(() => {
    function closeNavBar(e) {
      if (e.target.tagName !== "svg" && e.target.tagName !== "path") {
        setIsExpand(false);
      }
    }
    document.body.addEventListener("click", closeNavBar);
    return () => document.body.removeEventListener("click", closeNavBar);
  }, []);
  return (
    <HeaderWrapper isExpand={isExpand}>
      <div className="container">
        <img src={logo} alt="" />
        <FontAwesomeIcon
          onClick={() => setIsExpand((pre) => !pre)}
          size="xl"
          className="navbar-icon"
          icon={solid("bars")}
        />
        <ul className="navbar">
          <li>Features</li>
          <li>Pricing</li>
          <li>Resources</li>
          <li>Login</li>
          <li>Sign Up</li>
        </ul>
      </div>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    img {
      height: min-content;
    }
    .navbar-icon {
      display: none;
    }
    .navbar {
      flex-grow: 1;
      list-style: none;
      display: flex;
      align-items: center;
      li {
        color: var(--grayish-violet);
        padding: 8px 10px;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          color: var(--very-dark-violet);
        }
        &:nth-child(4) {
          margin-left: auto;
        }
        &:nth-child(5) {
          color: white;
          padding: 6px 15px;
          background-color: var(--cyan);
          border-radius: 25px;
        }
      }
    }
  }
  @media (max-width: 375px) {
    padding: 15px;
    .container {
      .navbar-icon {
        cursor: pointer;
        display: block;
        margin-left: auto;
        color: var(--grayish-violet);
      }
      .navbar {
        z-index: 999;
        position: fixed;
        display: flex;
        flex-direction: column;
        left: 50%;
        transform: translateX(-50%);
        top: ${({ isExpand }) => (isExpand ? "50px" : "-50%")};
        transition: all 0.7s;
        background-color: var(--very-dark-blue);
        padding: 30px;
        box-sizing: border-box;
        width: calc(100% - 30px);
        border-radius: 6px;
        li {
          color: white;
          font-weight: 700;
          text-align: center;
          width: 100%;
          padding: 15px 10px;
          &:nth-child(3) {
            border-bottom: 1px solid var(--title-1);
          }
          &:nth-child(4) {
            margin-left: 0;
          }
          &:nth-child(5) {
            padding: 10px 15px;
          }
        }
      }
    }
  }
`;
