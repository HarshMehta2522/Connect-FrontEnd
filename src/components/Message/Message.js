import "./Message.css"
import {format} from "timeago.js"
export default function Message({message,own}) {
  return (
    <div className={own?"message own":"message"}>
        <div className="messageTop">
            <img className="messageImg" src="https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?cs=srgb&dl=pexels-ali-pazani-2787341.jpg&fm=jpg" alt="" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">
            {format(message.createdAt)}
        </div>
    </div>
  )
}
