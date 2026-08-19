import './NoticeBox.css';

const NoticeBox = ({ children }) => {
  return (
    <div className="notice-box">
      {children}
    </div>
  );
};

export default NoticeBox;