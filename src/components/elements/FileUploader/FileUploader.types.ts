export type FileUploaderProps = {
  id?: string;
  maxSize?: number;
  accept?: string[];
  onChange?: (value: string | ArrayBuffer | null) => void;
  error?: boolean;
  herlperText?: string;
  loading?: boolean;
  loadingPercent?: number;
  width?: string;
  preview?: string;
}