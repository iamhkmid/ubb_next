import Image from "next/image";
import React from "react"
import { ThemeCtx } from "../../../contexts/ThemeCtx";
import { FacebookCircularProgress } from "../../Loading/LoadingWrapper";
import * as El from "./BannerUploader.styled"
import { BannerUploaderProps } from "./BannerUploader.types";

const BannerPreview: React.FC<BannerUploaderProps> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [preview, setPreview] = React.useState<string | undefined>(props.preview);
  const [file, setFile] = React.useState<string | null>(null);
  const [error, setError] = React.useState<boolean | undefined>(false);
  const [herlperText, setHerlperText] = React.useState<string | undefined>("")

  React.useEffect(() => {
    setHerlperText(props.herlperText)
  }, [props.herlperText])

  React.useEffect(() => {
    setError(props.error)
  }, [props.error])


  const onClickClear = () => {
    setFile(null)
    const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
   
    const inputEvent = new Event('input', { bubbles: true });
    inputRef.current?.dispatchEvent(inputEvent);
    props.onChange!("")
    setPreview(undefined);
  }

  return (
    <El.Main className="FileUploader-root" error={!!error} width={props.width!}>
      {(file || preview ) && (
        <El.ImagePreview>
          <div>
          {file ? <Image src={file} alt="preview" fill style={{ objectFit: "contain" }} /> : null}
          {preview ? <Image src={preview} alt="preview" fill style={{ objectFit: "contain" }} /> : null}
          <El.CloseIcon onClick={onClickClear}><XIcon /></El.CloseIcon>
          </div>
        </El.ImagePreview>
      )}
    </El.Main>
  );
};

BannerPreview.defaultProps = {
  id: "file-upload",
  accept: ["image/jpeg", "image/png"],
  maxSize: 1000000,
  onChange: () => { },
  error: false,
  herlperText: "",
  loading: false,
  loadingPercent: 0
};

export default BannerPreview;

const XIcon = () => {
  return (
    <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M1.08325 1.08331L6.91659 6.91665M6.91659 1.08331L1.08325 6.91665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg >
  )
}
