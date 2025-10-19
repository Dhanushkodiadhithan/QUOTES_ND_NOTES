import React from "react";

const Loading: React.FC = () => {
  return (
    <>
      <div className="loader">
        <span>&lt;</span>
        <span>LOADING</span>
        <span>/&gt;</span>
      </div>

      <style>
        {`
          .loader {
            font-size: 2em;
            font-weight: 900;
            height: 100vh;
            width: 100vw;
            justify-content: center;
            align-items: center;
            display: flex;
            background-color: #f3f4f6;
            gap: 0.2em;
          }
          .loader > * {
            color: black;
          }
          .loader span {
            display: inline-flex;
          }
          .loader span:nth-child(2) {
            letter-spacing: -1em;
            overflow: hidden;
            animation: reveal 1500ms cubic-bezier(0.645, 0.045, 0.355, 1) infinite alternate;
          }
          @keyframes reveal {
            0%, 100% {
              opacity: 0.5;
              letter-spacing: -1em;
            }
            50% {
              opacity: 1;
              letter-spacing: 0em;
            }
          }
        `}
      </style>
    </>
  );
};

export default Loading;
