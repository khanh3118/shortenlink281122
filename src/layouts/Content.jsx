import styled from "styled-components";
import illustrationWorking from "../images/illustration-working.svg";
import bgShortenDesktop from "../images/bg-shorten-desktop.svg";
import bgShortenMobile from "../images/bg-shorten-mobile.svg";
import brandRecognition from "../images/icon-brand-recognition.svg";
import detailedRecords from "../images/icon-detailed-records.svg";
import fullyCustomizable from "../images/icon-fully-customizable.svg";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Content() {
  Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj));
  };
  Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
  };
  const [oldUrl, setOldUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shortLinks, setShortLinks] = useState([]);

  async function hanleSubmit() {
    if (oldUrl === "") {
      setErrorMessage("Please add a link");
    } else {
      try {
        const res = await axios.get(
          `https://api.shrtco.de/v2/shorten?url=${oldUrl}`
        );
        const newUrl = res.data.result.short_link;
        setShortLinks((pre) => {
          pre.push({
            oldUrl,
            newUrl,
            is_copy: false,
          });
          localStorage.setObj("shortlinksdata", shortLinks);
          return [...pre];
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  useEffect(() => {
    if (oldUrl !== "") {
      setErrorMessage("");
    }
  }, [oldUrl]);

  useEffect(() => {
    let data = localStorage.getObj("shortlinksdata");
    if (data) {
      setShortLinks(data);
    }
    return () => {
      setShortLinks((pre) => {
        return [
          ...pre.map((item) => {
            return {
              ...item,
              is_copy: false,
            };
          }),
        ];
      });
    };
  }, []);

  function hanleCopy(e, index) {
    e.target.classList.add("active");
    let item = e.target.closest("div");
    let shortenUrl = item.querySelector(".shortedlink").innerText;
    navigator.clipboard.writeText(shortenUrl);
    setShortLinks((pre) => {
      pre[index].is_copy = true;
      return [...pre];
    });
  }
  return (
    <ContentWrapper
      isError={errorMessage !== ""}
      bgShortenDesktopUrl={bgShortenDesktop}
      bgShortenMobileUrl={bgShortenMobile}
    >
      <div className="content-1">
        <div className="container">
          <div className="content-1-left">
            <p>More than just shorter links</p>
            <span>
              Build your brand's recognition and get detailed insights on how
              your links are performing.
            </span>
            <button>Get Started</button>
          </div>
          <div className="content-1-right">
            <img src={illustrationWorking} alt="" />
          </div>
        </div>
      </div>
      <div className="content-2">
        <div className="container">
          <div className="content-2-form">
            <div className="content-2-form-input">
              <input
                onChange={(e) => setOldUrl(e.target.value.trim())}
                value={oldUrl}
                placeholder="Shorten a link here..."
              />
              <p className="content-2-error">{errorMessage}</p>
            </div>
            <button onClick={() => hanleSubmit()}>Shorten It!</button>
          </div>
          <div className="content-2-list">
            {shortLinks.map((item, index) => {
              return (
                <div key={item.oldUrl + index} className="content-2-list-item">
                  <span className="rawlink">{item.oldUrl}</span>
                  <span className="shortedlink">{item.newUrl}</span>
                  <button onClick={(e) => hanleCopy(e, index)}>
                    {item.is_copy ? "Copied!" : "Copy"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="content-3">
        <div className="container">
          <div className="content-3-title">
            <p>Advanced statistics</p>
            <span>
              Track how your links are performing across the web with our
              advanced statistics dashboard
            </span>
          </div>
          <div className="content-3-options">
            <div className="content-3-options-item">
              <div className="content-3-options-item-logo">
                <img src={brandRecognition} alt="" />
              </div>
              <p>Brand recognition</p>
              <span>
                Boost your brand recognition with each click. generic links
                don't mean a thing. branded links help instil confidence in your
                content.
              </span>
            </div>
            <div className="content-3-options-item-connect"></div>
            <div className="content-3-options-item">
              <div className="content-3-options-item-logo">
                <img src={detailedRecords} alt="" />
              </div>
              <p>Detailed Records</p>
              <span>
                Gain insights into who is clicking your links. Knowing when and
                where people engage with your content helps inform better
                decisions.
              </span>
            </div>
            <div className="content-3-options-item-connect"></div>
            <div className="content-3-options-item">
              <div className="content-3-options-item-logo">
                <img src={fullyCustomizable} alt="" />
              </div>
              <p>Fully Customizable</p>
              <span>
                Improve brand awareness and content discoverability through
                customizable links, supercharging audience engagement.
              </span>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  .content-1 {
    .container {
      display: flex;
      padding-bottom: 100px;
      padding-top: 60px;
      .content-1-left {
        display: flex;
        flex-direction: column;
        p {
          color: var(--dark-violet);
          font-weight: 700;
          font-size: 60px;
          margin-bottom: 0px;
        }
        span {
          max-width: 440px;
          font-weight: 400;
          color: var(--grayish-violet);
          margin-bottom: 30px;
        }
        button {
          background-color: var(--cyan);
          border: none;
          border-radius: 20px;
          color: white;
          padding: 12px 26px;
          width: max-content;
          font-weight: 700;
          font-size: 15px;
        }
      }
      .content-1-right {
        img {
          width: 100%;
        }
      }
    }
  }
  .content-2 {
    background-color: var(--background-1);
    .container {
      transform: translateY(-60px);
      flex-direction: column;
      .content-2-form {
        display: flex;
        flex-wrap: wrap;
        padding: 50px 40px;
        border-radius: 7px;
        margin-bottom: 15px;
        background-image: ${({ bgShortenDesktopUrl }) =>
          `url("${bgShortenDesktopUrl}")`};
        background-size: 100%;
        background-repeat: no-repeat;
        background-color: var(--dark-violet);
        .content-2-form-input {
          flex-grow: 1;
          position: relative;
          input {
            padding: 14px 0 13px 20px;
            border: ${({ isError }) =>
              isError
                ? `
              2px solid var(--red)
            `
                : `none`};
            border-radius: 8px;
            width: 100%;
            box-sizing: border-box;
            &::placeholder {
              transform: translateY(2px);
              color: ${({ isError }) =>
                isError ? "var(--red)" : "var(--grayish-violet)"};
              font-size: 16px;
              font-weight: 700;
            }
          }
          .content-2-error {
            position: absolute;
            font-size: 13px;
            color: var(--red);
            width: 100%;
            font-style: italic;
          }
        }
        button {
          margin-left: 15px;
          width: max-content;
          padding: 13px 17px;
          background-color: var(--cyan);
          border: none;
          border-radius: 5px;
          color: white;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
        }
      }
      .content-2-list {
        display: flex;
        flex-direction: column;
        .content-2-list-item {
          border-radius: 5px;
          padding: 15px;
          display: flex;
          background-color: white;
          align-items: center;
          margin-bottom: 10px;
          .rawlink {
            color: var(--dark-violet);
          }
          .shortedlink {
            color: var(--cyan);
            margin-left: auto;
          }
          button {
            cursor: pointer;
            padding: 7px 20px;
            color: white;
            border-radius: 5px;
            background-color: var(--cyan);
            font-weight: 700;
            font-size: 14px;
            border: none;
            margin-left: 15px;
            &:hover {
              opacity: 0.7;
            }
          }
          button.active {
            background-color: var(--dark-violet);
          }
        }
      }
    }
  }
  .content-3 {
    padding-top: 50px;
    padding-bottom: 120px;
    background-color: var(--background-1);
    .container {
      .content-3-title {
        text-align: center;
        margin-bottom: 100px;
        p {
          font-size: 40px;
          font-weight: 700;
          margin: 0;
          color: var(--dark-violet);
        }
        span {
          display: inline-block;
          color: var(--title-1);
          max-width: 530px;
          color: var(--grayish-violet);
        }
      }
      .content-3-options {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        .content-3-options-item-connect {
          width: 120px;
          height: 10px;
          background-color: var(--cyan);
        }
        .content-3-options-item {
          position: relative;
          background-color: white;
          padding: 45px 20px 20px 20px;
          border-radius: 4px;
          &:nth-child(1) {
            transform: translateY(-20px);
          }
          &:nth-child(3) {
            transform: translateY(25px);
          }
          &:nth-child(5) {
            transform: translateY(65px);
          }
          p {
            font-weight: 700;
            font-size: 20px;
            color: var(--dark-violet);
          }
          span {
            font-size: 16px;
            color: var(--grayish-violet);
          }
          .content-3-options-item-logo {
            position: absolute;
            top: 0;
            transform: translateY(-50%);
            border-radius: 50%;
            background-color: var(--dark-violet);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 75px;
            height: 75px;
          }
        }
      }
    }
  }
  @media (max-width: 375px) {
    .content-1 {
      .container {
        flex-direction: column;
        .content-1-left {
          order: 2;
          align-items: center;
          text-align: center;
          p {
            font-weight: 800;
            font-size: 40px;
          }
          span {
            padding: 0 30px;
          }
          button {
            width: max-content;
          }
        }
        .content-1-right {
          order: 1;
          margin-left: 25px;
          overflow: hidden;
          img {
            width: 130%;
          }
        }
      }
    }
    .content-2 {
      padding: 0 15px;
      .container {
        .content-2-form {
          padding: 20px;
          background-image: ${({ bgShortenMobileUrl }) =>
            `url("${bgShortenMobileUrl}")`};
          background-position: 77px -58px;
          .content-2-form-input {
            .content-2-error {
              position: unset;
            }
          }
          button {
            width: 100%;
            margin-left: 0;
          }
        }
        .content-2-list {
          .content-2-list-item {
            display: flex;
            flex-wrap: wrap;
            padding: 0 0 15px 0;
            .rawlink,
            .shortedlink {
              font-size: 16px;
            }
            .rawlink {
              font-weight: 500;
              padding: 10px 15px;
              width: 100%;
              border-bottom: 1px solid var(--gray);
            }
            .shortedlink {
              padding: 10px 15px;
              margin-left: 0;
              width: 100%;
            }
            button {
              width: 100%;
              margin-left: 0;
              margin: 0 15px;
              padding: 10px;
            }
          }
        }
      }
    }
    .content-3 {
      padding: 0 15px 0 15px;
      .container {
        .content-3-title {
          padding: 0 20px;
          p {
            font-size: 25px;
            margin-bottom: 10px;
          }
          span {
            font-size: 16px;
          }
        }
        .content-3-options {
          flex-wrap: wrap;
          flex-direction: column;
          .content-3-options-item-connect {
            transform: rotate(90deg) translateX(-50px);
            height: 8px;
          }
          .content-3-options-item {
            z-index: 998;
            align-items: center;
            display: flex;
            margin-bottom: 70px;
            flex-direction: column;
            text-align: center;
            span {
              padding: 0 12px;
              font-size: 15px;
            }
            &:nth-child(1),
            &:nth-child(3),
            &:nth-child(5) {
              transform: none;
            }
            &:nth-child(5) {
              margin-bottom: 60px;
            }
          }
        }
      }
    }
  }
`;
