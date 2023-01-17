import jimp from "jimp";

export const changeStr = (str: string) =>
  str.replace(/([^a-z0-9 ]+)/gi, "-").replace(/\s/g, "-");

type TSaveFile = { file: string; dir: string; name: string, limit: number }

export const saveFile = async ({ file, dir, name, limit }: TSaveFile) => {
  if (!["data:image/png", "data:image/jpeg"].includes(file.split(';')[0])) throw new Error(JSON.stringify({ statusCode: "400", message: "File type not valid" }))
  const bufferFile = Buffer.from(file.split("base64,")[1], "base64");
  if (bufferFile.byteLength > limit) throw new Error(JSON.stringify({ statusCode: "400", message: `Max file size ${limit / 1024}` }))
  const extension = file.split(';')[0].split('/')[1]
  const fileName = `${process.cwd()}${dir}/${changeStr(name)}.${extension}`
  jimp.read(bufferFile, (err: any, res: any) => {
    if (err) throw new Error(err);
    res.quality(5).write(fileName);
  })
  return { pathFile: `${dir.split("/public")[1]}/${changeStr(name)}.${extension}` };
};