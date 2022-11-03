const ErrorFallBack = () => {
  return (
    <div className="error-fall-back">
      <div className="main">
        <div className="container">
          <img src={ContentBackGround} alt="" className="container-background" />
          <div className="content">
            <div id="title">Some error has occured, we are investigating.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallBack;
