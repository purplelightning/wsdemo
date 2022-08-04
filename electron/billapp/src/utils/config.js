import path from 'path'
const __dirname = path.resolve();

const tableHeader = [
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

export default {
  // 开发
  uploadDir: path.join(__dirname, './upload/'),
  outputDir: path.join(__dirname, './output/'),
  // 生产
  // uploadDir: path.join(__dirname, '../upload/'),
  // outputDir: path.join(__dirname, '../output/'),
  tableHeader
}