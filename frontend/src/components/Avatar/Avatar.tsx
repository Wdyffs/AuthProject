import defaultAvatar from "../../assets/avatar-default.png";
import {countValidator} from "../../utils/avatarNotificationsValidator";
import {MouseEventHandler, useEffect, useRef, useState} from "react";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {fetchImage} from "../../api/fetchImage";
import {useQuery} from "@tanstack/react-query";

type Props = {
  notifications: number
}

enum EField {
  URL,
  FILE
}

interface IInputInput {
  url: string;
  picture: any;
}

const calcOffset = (notifications: number): number => {
  const len = String(countValidator(notifications)).length;
  return len == 1 ? 8 : 8 + Math.ceil(String(countValidator(notifications)).length * 6);
}

const Avatar = ({notifications}: Props) => {
  const [offset, setOffset] = useState<number>(() => calcOffset(notifications));
  useEffect(() => {
    setOffset(calcOffset(notifications))
  }, [notifications]);

  const [openedModal, setOpenedModal] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isFetchErr, setIsFetchErr] = useState<boolean>(false);
  const [fileErr, setFileErr] = useState<boolean>(false);
  const [submitedUrl, setSubmitedUrl] = useState<string | null>("https://img1.goodfon.ru/wallpaper/nbig/a/69/kartinka-3d-dikaya-koshka.jpg")
  const [isDisabled, setDisabled] = useState<EField.URL | EField.FILE | null>(null);

  const {register, handleSubmit, formState: {errors, isValid}, reset, resetField, control} = useForm<IInputInput>();
  const avatarRef = useRef<null | HTMLImageElement>(null);
  const avatarModal = useRef<null | HTMLDivElement>(null);

  const {isLoading, isError, status, isSuccess, isStale, isInitialLoading, data, error, refetch} = useQuery({
    queryKey: ['image', submitedUrl],
    queryFn: () => {
      setIsFetchErr(false);
      console.log("Fetching started")
      return fetchImage(submitedUrl)
    },
    onError: (err) => {
      setIsFetchErr(true);
    },
    onSuccess: (data) => {
      setIsFetchErr(false);
      setImgSrc(data);
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 3000,
  });

  useEffect(() => {

  }, [data])


  const imageSubmit: SubmitHandler<IInputInput> = (inputData) => {
    console.log(inputData)
    if (isValid && !fileErr) {
      if (!inputData.url) {
        let fileReader = new FileReader();
        fileReader.onload = function (ev) {
          setImgSrc(ev.target.result as string);
        }
        fileReader.readAsDataURL(inputData.picture[0])
      } else {
        // setSubmitedUrl(inputData.url);
        setImgSrc(inputData.url)
      }
    }
  };

  const avatarClick: MouseEventHandler = (e) => {
    setOpenedModal(!openedModal);
    reset();
  }
  return (
    <div className={"relative h-[40px] w-[40px] bg-white rounded-full"}
         ref={avatarModal}>
      <img
        src={imgSrc ? imgSrc : defaultAvatar}
        alt="User logo"
        ref={avatarRef}
        onClick={(e) => avatarClick(e)}
        className="w-full h-full rounded-full border-white border-2 cursor-pointer"/>
      <span
        className={"absolute top-[2px] block rounded-full text-white bg-red-500 text-sm pr-[5px] pl-[5px] cursor-default"}
        style={{right: `-${offset}px`}}
      >{countValidator(notifications)}</span>
      {
        openedModal &&
          <form className={"absolute left-[-100px] top-[48px] p-4 border-white z-50 bg-white text-black"}
                onSubmit={handleSubmit(imageSubmit)}
          >
              <legend className={"text-center text-bold mb-4 text-custom-blue text-xl"}>Enter image url or select a file
              </legend>
              <label htmlFor="avatarModal" style={isDisabled === EField.URL ? {color: "gray"} : {}}>Choose image</label>
              <div className={"relative"}>
                  <input
                    {...register("url")}
                    type="text"
                    name="url"
                    id="avatarModal"
                    autoComplete="off"
                    className={"p-2 outline-black border-black border-2 w-full disabled:border-gray-400"}
                    onChange={(e) => {
                      if (e.target.value) {
                        setDisabled(EField.FILE);
                      } else {
                        setDisabled(null)
                      }
                    }}
                    disabled={isDisabled === EField.URL}
                  />
                {
                  errors.url &&
                    <p className={"absolute text-red-500 text-xs top-[-15px] right-[5px]"}>{errors.url?.message}</p>
                }
              </div>
              <div className={"relative mt-6"}>
                  <input
                    {...register("picture")}
                    id="picture"
                    type="file"
                    className={"cursor-pointer inline-block"}
                    onChange={(e) => {
                      if (e.target.files.length) {
                        setDisabled(EField.URL);
                        resetField("url");
                        const file: File = e.target?.files[0];
                        if (!file.type.includes("image")) {
                          setFileErr(true)
                        } else setFileErr(false)
                      } else {
                        setDisabled(null)
                        setFileErr(false)
                      }
                    }}
                    accept="image/*"
                    disabled={isDisabled === EField.FILE}
                  />
                {
                  fileErr &&
                    <p className={"absolute text-red-500 text-xs top-[-18px] left-0"}>Select image</p>
                }
              </div>

              <div className={"flex items-center gap-2 mt-2"}>
                  <button className={"pl-2 pr-2 bg-black text-white"}
                          type="submit">
                      Submit
                  </button>
                {
                  isError || isFetchErr
                    ? <div className={"text-red-500"}>{isFetchErr ? "Invalid source" : error}</div>
                    : isLoading
                      ?
                      (<div>
                        <div role="status" className={"text-black"}>
                          <svg aria-hidden="true"
                               className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                               viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"/>
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"/>
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>)
                      : isSuccess && isStale
                        ? ""
                        : <div className={"text-green-700"}>Success &#10004;</div>

                }
              </div>
          </form>
      }
    </div>
  )
}
export default Avatar;
