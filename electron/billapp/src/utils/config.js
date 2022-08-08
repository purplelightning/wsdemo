import path from 'path'
const __dirname = path.resolve();

export const tableHeader = [
  "姓名",
  "行号(必输)",
  "发票种类代码",
  "发票代码",
  "发票号码",
  "开票日期(格式YYYY/MM/DD)",
  "校验码后六位",
  "购方税号（我公司税号）",
  "班组",
];

export const getPicOptions = (outputDir, uploadPath) => {
  return {
    format: "jpeg",
    scale: 2048,
    out_dir: outputDir,
    out_prefix: path.basename(uploadPath, path.extname(uploadPath)),
    page: null,
  }
}

  export const uploadDir = path.join(__dirname, './upload/')
  export const outputDir = path.join(__dirname, './output/')