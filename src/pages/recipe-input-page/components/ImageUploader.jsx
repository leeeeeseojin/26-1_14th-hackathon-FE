import "./ImageUploader.css";

import upload from "../../../assets/icon/upload.png";


const ImageUploader = ({ onChange }) => {
  return (
    <label className="image-uploader">
      <div className="image-uploader__icon">
        <img  src={upload} alt="이미지 업로드"/>
      </div>

      <p className="image-uploader__title">
        이미지 업로드
      </p>

      <p className="image-uploader__description">
        PDF, JPG 파일을 업로드할 수 있어요.
      </p>

      <span className="image-uploader__button">
        파일 선택
      </span>

      <input
        className="image-uploader__input"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onChange}
      />
    </label>
  );
};

export default ImageUploader;