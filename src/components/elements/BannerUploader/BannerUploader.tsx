import Image from "next/image";
import React from "react"
import { ThemeCtx } from "../../../contexts/ThemeCtx";
import { FacebookCircularProgress } from "../../Loading/LoadingWrapper";
import * as El from "./BannerUploader.styled"
import { BannerUploaderProps } from "./BannerUploader.types";

const BannerUploader: React.FC<BannerUploaderProps> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState<string | null>(null);
  const [error, setError] = React.useState<boolean | undefined>(false);
  const [herlperText, setHerlperText] = React.useState<string | undefined>("")

  React.useEffect(() => {
    setHerlperText(props.herlperText)
  }, [props.herlperText])

  React.useEffect(() => {
    setError(props.error)
  }, [props.error])


  type TConverBase64 = (prop: File) => Promise<string | ArrayBuffer | null>
  const convertBase64: TConverBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => { resolve(fileReader.result); };
      fileReader.onerror = (error) => { reject(error); };
    });
  };

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const fileChange = async (file: File) => {
    setError(false)
    setHerlperText("")
    if (file?.size > props.maxSize!) {
      setHerlperText("Upload failed, your file to large!")
      setError(true)
    }
    else {
      const newFile = await convertBase64(file)
      setFile(URL.createObjectURL(file))
      props.onChange!(newFile)
    }
  }

  const handleDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      fileChange(e.dataTransfer.files[0])
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      fileChange(e.target.files[0])
    }
  };

  const accept = props.accept!.join(",")
  const dataTypes = props.accept!.map((val) => val.split("/")[1].toLocaleUpperCase()).join(", ")
  const maxSize = () => {
    if (props.maxSize! >= 1000000000) return `${props.maxSize! / 1000000000} Gb`
    if (props.maxSize! >= 1000000) return `${props.maxSize! / 1000000} Mb`
    if (props.maxSize! >= 1000) return `${props.maxSize! / 1000} Kb`
    if (props.maxSize! >= 1) return `${props.maxSize! / 1} b`
  }

  const onClickClear = () => {
    setFile(null)
    const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeInputValueSetter?.call(inputRef.current, "");
    const inputEvent = new Event('input', { bubbles: true });
    inputRef.current?.dispatchEvent(inputEvent);
  }

  return (
    <El.Main className="FileUploader-root" onDragEnter={handleDrag} error={!!error} width={props.width!}>
      <input ref={inputRef} id={props.id} type="file" accept={accept} onChange={onChange} />
      <div className="button-wrapper">
        {props.loading && (
          <FacebookCircularProgress size={50} thickness={5} />
        )}
        {!props.loading && (
          <>
            <p className="info">{herlperText || "Choose a file or drag it here"}</p>
            <label htmlFor={props.id} className="button">Browse files</label>
          </>
        )}
      </div>
      <div className="file-info">
        <div><p>Maximum file size : <span>{maxSize()}</span></p></div>
        <div><p>Format : <span>{dataTypes}</span></p></div>
      </div>
      {dragActive && <div className="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
      {file && (
        <El.ImagePreview>
          <div><Image src={file} alt="preview" fill style={{ objectFit: "contain" }} />
          <El.CloseIcon onClick={onClickClear}><XIcon /></El.CloseIcon></div>
        </El.ImagePreview>
      )}
    </El.Main>
  );
};

BannerUploader.defaultProps = {
  id: "file-upload",
  accept: ["image/jpeg", "image/png"],
  maxSize: 1000000,
  onChange: () => { },
  error: false,
  herlperText: "",
  loading: false,
  loadingPercent: 0
};

export default BannerUploader;

const XIcon = () => {
  return (
    <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M1.08325 1.08331L6.91659 6.91665M6.91659 1.08331L1.08325 6.91665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg >
  )
}
