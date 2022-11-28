import styled from "styled-components";
import logo from "../images/logo.svg";
import facebookIcon from "../images/icon-facebook.svg";
import twitterIcon from "../images/icon-twitter.svg";
import pinterestIcon from "../images/icon-pinterest.svg";
import instagramIcon from "../images/icon-instagram.svg";
import bgBoostDesktop from "../images/bg-boost-desktop.svg";
import bgBoostMobile from "../images/bg-boost-mobile.svg";

export default function Footer() {
  return (
    <FooterWrapper
      bgBoostDesktopUrl={bgBoostDesktop}
      bgBoostMobileUrl={bgBoostMobile}
    >
      <div className="footer-1-wrapper">
        <div className="footer-1">
          <p>Boost your links today</p>
          <button>Get Started</button>
        </div>
      </div>
      <div className="footer-2-wrapper">
        <div className="footer-2">
          <div className="footer-2-item">
            <img src={logo} alt="" />
          </div>
          <div className="footer-2-item">
            <ul>
              <p>Features</p>
              <li>Link shortening</li>
              <li>Branded links</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div className="footer-2-item">
            <ul>
              <p>Resources</p>
              <li>Blog</li>
              <li>Developers</li>
              <li>Support</li>
            </ul>
          </div>
          <div className="footer-2-item">
            <ul>
              <p>Company</p>
              <li>About</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="footer-2-item">
            <img className="footer-2-item-social" src={facebookIcon} alt="" />
            <img className="footer-2-item-social" src={twitterIcon} alt="" />
            <img className="footer-2-item-social" src={pinterestIcon} alt="" />
            <img className="footer-2-item-social" src={instagramIcon} alt="" />
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  .footer-1-wrapper {
    background-image: ${({ bgBoostDesktopUrl }) =>
      `url("${bgBoostDesktopUrl}")`};
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: var(--dark-violet);
    .footer-1 {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      padding: 40px 0;
      p {
        margin-top: 0;
        color: white;
        font-size: 30px;
        font-weight: 700;
      }
      button {
        cursor: pointer;
        padding: 13px 30px 10px 30px;
        background-color: var(--cyan);
        border: none;
        color: white;
        border-radius: 20px;
        font-weight: 700;
        font-size: 16px;
      }
    }
  }
  .footer-2-wrapper {
    background-color: var(--footer-2-background);
    .footer-2 {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: flex-start;
      justify-content: space-evenly;
      padding: 50px;
      .footer-2-item {
        text-align: left;
        width: 100%;
        &:nth-child(1) {
          margin-right: 130px;
        }
        img {
          filter: brightness(0) invert(1);
        }
        .footer-2-item-social {
          padding: 10px;
        }
        ul {
          padding-left: 0;
          list-style: none;
          margin: 0;
          p {
            font-size: 15px;
            margin-top: 0;
            font-weight: 600;
            color: white;
          }
          li {
            font-size: 14px;
            color: var(--title-1);
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  @media (max-width: 375px) {
    .footer-1-wrapper {
      background-image: ${({ bgBoostMobileUrl }) =>
        `url("${bgBoostMobileUrl}")`};
      .footer-1 {
        text-align: center;
        padding: 40px 15px;
        p {
          font-size: 25px;
        }
        button {
          width: max-content;
        }
      }
    }
    .footer-2-wrapper {
      .footer-2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        .footer-2-item {
          text-align: center;
          &:nth-child(1) {
            margin-right: 0;
          }
          ul {
            li,
            p {
              text-align: center;
            }
          }
        }
      }
    }
  }
`;
