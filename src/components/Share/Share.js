import "./Share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BACKEND = process.env.REACT_APP_BACKEND_URL;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      newPost.img = file.name; // Use the original file name
      try {
        await axios.post(BACKEND+"/upload", data);
      } catch (err) {
        console.log(err);
      }
      try {
        await axios.post(BACKEND+"/post", newPost);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="share">
      <div className="shareTop">
        <img
          className="shareProfileImg"
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/default.jpeg"
          }
          alt="shareImg"
        />
        <input
          placeholder={"How u doin " + user.username + " ?"}
          className="shareInput"
          ref={desc}
        />
      </div>
      <hr className="shareHr" />
      {file && (
        <div className="shareImgContainer">
          <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
          <CancelIcon className="shareCancelImg" onClick={()=>setFile(null)}/>
        </div>
      )}
      <form className="shareBottom" onSubmit={submitHandler}>
        <label htmlFor="file" className="shareOptions">
          <div className="shareOption">
            <PermMediaIcon htmlColor="red" className="shareIcon" />
            <span className="shareOptionText">Photo or Video</span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="shareOption">
            <LabelIcon htmlColor="blue" className="shareIcon" />
            <span className="shareOptionText">Tag</span>
          </div>
          <div className="shareOption">
            <RoomIcon htmlColor="green" className="shareIcon" />
            <span className="shareOptionText">Location</span>
          </div>
          <div className="shareOption">
            <EmojiEmotionsIcon htmlColor="gold" className="shareIcon" />
            <span className="shareOptionText">Feelings</span>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </label>
      </form>
    </div>
  );
}
