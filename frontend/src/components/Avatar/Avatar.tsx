import defaultAvatar from "../../assets/avatar-default.png";
import {countValidator} from "../../utils/avatarNotificationsValidator";
import {useEffect, useState} from "react";

type Props = {
  notifications: number
}

const calcOffset = (notifications: number): number => {
  const len = String(countValidator(notifications)).length;
  return len == 1 ? 8 : 8 + Math.ceil(String(countValidator(notifications)).length * 6);
}


const Avatar = ({notifications}: Props) => {
  const [offset, setOffset] = useState<number>(() => calcOffset(notifications));
  const [url, setUrl] = useState("");
  useEffect(() => {

    const getUrl = async () => {
      return "https://img1.goodfon.ru/wallpaper/nbig/a/69/kartinka-3d-dikaya-koshka.jpg"
    }
    getUrl().then(val => setUrl(val));
  }, [])
  useEffect(() => {
    setOffset(calcOffset(notifications))
  }, [notifications])
  return (
    <div className={"relative h-[40px] w-[40px] bg-white rounded-full cursor-pointer"}>
      <img src={url ? url : defaultAvatar} alt="User logo"
           className="w-full h-full rounded-full border-white border-2"/>
      <span
        className={"absolute top-[2px] block rounded-full text-white bg-red-500 text-sm pr-[5px] pl-[5px]"}
        style={{right: `-${offset}px`}}
      >{countValidator(notifications)}</span>
    </div>
  )
}

export default Avatar;