import React from 'react';
import DataGrid, { Column, Scrolling, Selection } from 'devextreme-react/data-grid';
import { planningLines } from '../data/planning.data';

export function PlanningTable({ onLineSelectionChange }: any) {
  
  // Hàm render dải màu cho Timeline
  const renderTimelineCell = (cellData: any, dayIndex: number) => {
    const schedule = cellData.data.schedules?.find(
      (s: any) => dayIndex >= s.startDay && dayIndex <= s.endDay
    );

    if (!schedule) return null;

    // Chỉ hiển thị text ở ô đầu tiên của dải màu
    const isFirstCell = dayIndex === schedule.startDay;

    

    return (
      <div style={{
        backgroundColor: schedule.color,
        color: '#000',
        height: '100%',
        margin: '-8px -10px', // Tràn ra khít ô
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '5px',
        fontSize: '11px',
        fontWeight: 500,
        borderRight: dayIndex === schedule.endDay ? 'none' : '1px solid rgba(0,0,0,0.1)'
      }}>
        {isFirstCell ? schedule.style : ''}
      </div>
    );
  };

  return (
    <div className="grid-container planning-table">

      <DataGrid
        dataSource={planningLines}
        showBorders
        showColumnLines={true}
        showRowLines={true}
        height={300}
        columnAutoWidth={false}
        onSelectionChanged={(e) => onLineSelectionChange(e.selectedRowsData)}
      >
        <Selection mode="multiple" showCheckBoxesMode="always" />
        <Scrolling mode="standard" />

        {/* NHÓM CỘT CỐ ĐỊNH BÊN TRÁI */}
        <Column dataField="PRI Line" caption="PRI Line" width={100} alignment="center" fixed />
        <Column dataField="line" caption="LINE" width={100} fixed />
        <Column dataField="lineType" caption="Line Type" width={120} fixed />

        {/* SINH TỰ ĐỘNG 10 CỘT NGÀY (date1 -> date10) */}
        {[...Array(10)].map((_, i) => (
          <Column
            key={i}
            caption={`date${i + 1}`}
            width={100}
            cellRender={(d) => renderTimelineCell(d, i + 1)}
            alignment="center"
          />
        ))}
      </DataGrid>
    </div>
  );
}