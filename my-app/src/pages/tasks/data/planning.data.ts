// src/pages/tasks/data/planning.data.ts

export interface PlanningLine {
  id: number; // Thêm ID để làm keyExpr cho DataGrid
  pri: number;
  line: string;
  lineType: 'MSL' | 'CSL' | 'BTP';
  schedule: {
    [date: string]: string; // Lưu tên Style-Buy tại ngày đó
  };
  // Option: Để tô màu dải, tui thêm mapping màu sắc cho Style
  styleColors?: { [styleName: string]: string };
}

export const planningDates: string[] = [
  '2026-05-01', '2026-05-02', '2026-05-03', '2026-05-04', '2026-05-05',
  '2026-05-06', '2026-05-07', '2026-05-08', '2026-05-09', '2026-05-10',
  '2026-05-11', '2026-05-12'
];

export const planningLines: PlanningLine[] = [
  {
    id: 1,
    pri: 1,
    line: 'EE01',
    lineType: 'MSL',
    schedule: {
      '2026-05-01': 'Style1-Buy-TP/DUP/BTP',
      '2026-05-02': 'Style1-Buy-TP/DUP/BTP',
      '2026-05-03': 'Style1-Buy-TP/DUP/BTP',
      '2026-05-04': 'Style2-Buy-TP/URG',
      '2026-05-05': 'Style2-Buy-TP/URG',
      '2026-05-06': 'Style2-Buy-TP/URG',
      '2026-05-07': 'Style2-Buy-TP/URG',
    }
  },
  {
    id: 2,
    pri: 2,
    line: 'EE02',
    lineType: 'CSL',
    schedule: {
      '2026-05-03': 'Style4-Buy-DUP',
      '2026-05-04': 'Style4-Buy-DUP',
      '2026-05-05': 'Style4-Buy-DUP',
    }
  },
  {
    id: 3,
    pri: 3,
    line: 'EE03',
    lineType: 'MSL',
    schedule: {
      '2026-05-01': 'Style5-Buy-PRO',
      '2026-05-02': 'Style5-Buy-PRO',
      '2026-05-08': 'Style6-Buy-NEW',
      '2026-05-09': 'Style6-Buy-NEW',
    }
  },
  {
    id: 4,
    pri: 4,
    line: 'EE04',
    lineType: 'CSL',
    schedule: {}
  },
  {
    id: 5,
    pri: 5,
    line: 'EE05',
    lineType: 'MSL',
    schedule: {
      '2026-05-05': 'Lấy thong tin ME uu tien',
      '2026-05-06': 'Lấy thong tin ME uu tien',
    }
  },
  {
    id: 6,
    pri: 6,
    line: 'L01',
    lineType: 'BTP',
    schedule: {
      '2026-05-01': 'Style7-Buy-URG',
      '2026-05-02': 'Style7-Buy-URG',
      '2026-05-03': 'Style7-Buy-URG',
    }
  },
  {
    id: 7,
    pri: 7,
    line: 'L02',
    lineType: 'CSL',
    schedule: {}
  },
  {
    id: 8,
    pri: 8,
    line: 'EE19',
    lineType: 'MSL',
    schedule: {
      '2026-05-01': 'Style5-Buy-PRO',
      '2026-05-02': 'Style5-Buy-PRO',
      '2026-05-08': 'Style6-Buy-NEW',
      '2026-05-09': 'Style6-Buy-NEW',
    }
  },
];

// Helper để lấy màu cho dải Timeline (Ông có thể dùng trong cellRender)
export const getStyleColor = (styleName: string) => {
  if (!styleName) return 'transparent';
  if (styleName.includes('Style1')) return '#92D050'; // Xanh lá
  if (styleName.includes('Style2')) return '#00B0F0'; // Xanh dương
  if (styleName.includes('Style4')) return '#FFC000'; // Vàng cam
  if (styleName.includes('ME')) return '#FFFF00';     // Vàng tươi
  return '#D9D9D9'; // Xám mặc định
};